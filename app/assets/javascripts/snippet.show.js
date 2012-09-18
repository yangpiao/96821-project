// ===== page snippets/:id =====
(function(host, $) {
  // gSnippetID = host['gSnippetID'] || 0;
  var $popover = $('#comment-popover'),
    $codebox = $('#codebox'),
    $lines = $codebox.find('.linenums li'),
    $closebtn =$('#close-cmt'),
    $cancel = $('#cancel-cmt'),
    $delBtn = $('#delete-snippet'),
    // tipDlg
    $dlg = $('#tipDlg').modal({show: false}),
    $dlghd = $('#tipDlg-hd').html('Error'),
    $dlgbd = $('#tipDlg-bd'),
    $dlgc = $('#tipDlg-c'),
    $dlgs = $('#tipDlg-s'),

    $cmtlist = $popover.find('.comments-inner ol'),
    $cmtbd = $cmtlist.parent(),
    $cmtTip = $('#comment-tip'),
    $cmtInput = $('#comment-input'),
    $cmtCancel = $('#cancel-cmt'),
    $cmtSubmit = $('#submit-cmt'),

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
      // TODO: user info
      var result = '<li class="comment clearfix" data-id="' + cmt.id + '">' +
        '<div class="comment-head pull-left"><img src="' +
        'http://gravatar.com/avatar/' + '10786514059e95ba3b89cfe0e096f22c' +
        '?s=32" alt=""></div><div class="comment-body">' +
        '<p class="comment-author"><strong>' + 'Yang Piao' + '</strong>' +
        ':</p><p>' + cmt.content +
        '</p></div></li>';
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
    $popover.css('top', pos.top - 40);
    // $popover.show();
    $popover.fadeIn(200);
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
    var params, cmt = $cmtInput.val();
    params = {
      comment: {
        user_id: 1, // TODO: user id
        content: cmt,
        linenum: _currLineNum
      }
    };
    $.ajax({
      url: CMT_CREATE,
      type: 'POST',
      data: params,
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
      $dlgbd.html('<p class="alert alert-error">An error has occurred ' +
        'while loading the comments.</p>');
    }
  });
})(window, jQuery);

