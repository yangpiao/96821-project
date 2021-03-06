// ===== page snippets/:id =====
(function(host, $) {
  var $popover = $('#comment-popover'),
    $codebox = $('#codebox'),
    $lines = $codebox.find('.linenums li'),
    $closebtn =$('#close-cmt'),
    $cancel = $('#cancel-cmt'),
    $delBtn = $('#delete-snippet'),

    $cmtlist = $popover.find('.comments-inner ol'),
    $cmtbd = $cmtlist.parent(),
    $cmtTip = $('#comment-tip'),
    $cmtCancel = $('#cancel-cmt'),
    $cmtSubmit = $('#submit-cmt'),
    $cmtError = $('#comment-error'),
    $cmtInput = $('#comment-input'),
    $cmtUserId = $('#comment-userid'),

    _user = gEarlGreyUser || {},
    _comments = null,
    _$currLine = null,
    _currLineNum = 0,

    // CMT_GET = 'comments.json',
    // CMT_CREATE = 'comments/create.json',
    // CMT_DELETE = 'comments/destroy.json',
    CMT_GET = gEarlGreyData.CMT_GET || '',
    CMT_CREATE = gEarlGreyData.CMT_CREATE || '',
    CMT_DELETE = gEarlGreyData.CMT_DELETE || '',
    LOGIN_MSG = 'You need to log in before adding a comment.',
    NOCMT_MSG = 'No comments on this line right now.',

    _buildComment = function(cmt) {
      // TODO
      var user = cmt.user;
      var img = 'http://gravatar.com/avatar/' + user.avatar + '?s=32';
      var result = '<li class="comment clearfix" data-id="' + cmt.id + '">' +
        '<div class="comment-head pull-left"><img src="' + img +
        '" alt=""></div><div class="comment-body">' +
        '<p class="comment-author"><strong>' + 
        (user.name || '[Unknown User]') +
        '</strong>:</p><p>' + cmt.content + '</p></div></li>';
      return result;
    },

    _buildComments = function(line) {
      if (line < 0) {
        return '';
      }
      var result = '', comments = _comments[line], i, len;
      if (!comments || comments.length == 0) {
        return '';
      }
      for (i = 0, len = comments.length; i < len; i++) {
        result += _buildComment(comments[i]);
      }
      return result;
    };

  $codebox.delegate('.linenums li', 'click', function(e) {
    var linenum = $lines.index(this) + 1,
      $this = $(this), pos = $this.position(), html;
    // if (_$currLine) {
    //   _$currLine.removeClass('selected');
    // }
    _$currLine = $this;
    _currLineNum = linenum;
    // _$currLine.addClass('selected');
    html = _buildComments(linenum);
    if (!html) {
      // no comments
      $cmtbd.hide();
      $cmtTip.html(NOCMT_MSG).show();
    } else {
      $cmtTip.hide();
      $cmtbd.show();
    }
    $cmtlist.html(html);
    $cmtInput.val('');
    $cmtInput.removeClass('error');
    $cmtError.text('');
    $popover.css('top', pos.top - 40);
    // $popover.show();
    $popover.fadeIn(200);
    return false;
  });

  $closebtn.click(function(e) {
    $popover.hide();
    return false;
  });
  $cancel.click(function(e) {
    $popover.hide();
    return false;
  });

  // post a comment
  $cmtSubmit.click(function(e) {
    if (!_validate_cmt()) {
      return false;
    }
    var params, cmt = $cmtInput.val();
    params = {
      comment: {
        user_id: $cmtUserId.val(),
        content: cmt,
        linenum: _currLineNum
      }
    };
    $.ajax({
      url: CMT_CREATE,
      type: 'POST',
      data: params,
      beforeSend: function(xhr) {
        var token = $('meta[name="csrf-token"]').attr('content');
        if (token) xhr.setRequestHeader('X-CSRF-Token', token);
      },
      success: function(data) {
        $cmtInput.val('');
        var html = _buildComment(data), $newnode,
          cmts = _comments[data.linenum];
        if (!cmts || cmts.length == 0) {
          cmts = _comments[data.linenum] = [];
        }
        cmts.push(data);
        if (html) {
          $newnode = $(html).css('display', 'none');
          $cmtlist.append($newnode);
          $cmtTip.hide();
          $cmtbd.show();
          $newnode.slideDown(200);
          _$currLine.addClass('has_comments');
        }
      }
    });
    return false;
  });

  $delBtn.click(function(e) {
    // TODO:
    if (confirm('Are you sure?')) {
      $.ajax({
        url: CMT_DELETE,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function(xhr) {
          var token = $('meta[name="csrf-token"]').attr('content');
          if (token) xhr.setRequestHeader('X-CSRF-Token', token);
          xhr.setRequestHeader('X-Http-Method-Override', 'DELETE');
        },
        success: function(data) {
          if (data && data.redirect_url) {
            host.location.replace(data.redirect_url);
          }
        }
      });
    }
    return false;
  });

  // validations
  function _validate_cmt() {
    var v = $.trim($cmtInput.val());
    if (v.length == 0) {
      $cmtInput.addClass('error');
      $cmtError.text('Comment cannot be empty');
      return false;
    } else if (v.length > 5000) {
      $cmtInput.addClass('error');
      $cmtError.text('Comment cannot be over 5000 characters');
      return false;
    } else {
      $cmtInput.removeClass('error');
      $cmtError.text('');
      return true;
    }
  }
  $cmtInput.on('blur', function(e) {
    _validate_cmt();
  });

  // init
  $.ajax({
    url: CMT_GET,
    type: 'GET',
    success: function(data) {
      _comments = {};
      var i = 0, len = data.length, item, ln;
      for (; i < len; i++) {
        item = data[i];
        ln = item.linenum;
        if (!_comments[ln]) {
          _comments[ln] = [];
        }
        _comments[ln].push(item);
      }
      for (ln in _comments) {
        $lines[ln - 1] && $($lines[ln - 1]).addClass('has_comments');
      }
    },
    error: function() {
      _comments = {};
      // $dlgbd.html('<p class="alert alert-error">An error has occurred ' +
      //   'while loading the comments.</p>');
    }
  });
})(window, jQuery);

