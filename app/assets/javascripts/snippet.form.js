// ===== page snippets/new =====
(function(host, $) {
  var $filetypes = $('.form-filetype'),
    $moreTxt = $('.more-btn em'),
    $more = $moreTxt.parent(),
    $hiddenFiletype = $('#snippet_filetype'),

    $sname = $('#snippet_name'),
    $sdesc = $('#snippet_desc'),
    $scode = $('#snippet_content'),
    $snameError = $('#name-error'),
    $sdescError = $('#desc-error'),
    $scodeError = $('#code-error'),

    _$currBtn = null,
    _initBtns = function() {
      if (_$currBtn) {
        _$currBtn.removeClass('btn-inverse');
      }
      $moreTxt.html('More ');
    };

  $filetypes.delegate('.type', 'click', function(e) {
    _initBtns();
    this.className += ' btn-inverse';
    _$currBtn = $(this);
    $hiddenFiletype.val(_$currBtn.data('value'));
    e.preventDefault();
  });
  $filetypes.delegate('.type-more', 'click', function(e) {
    _initBtns();
    $moreTxt.html(this.innerHTML + ' ');
    $more.addClass('btn-inverse');
    _$currBtn = $more;
    $hiddenFiletype.val($(this).data('value'));
    e.preventDefault();
  });

  // validations
  function _validate_name() {
    var v = $.trim($sname.val());
    if (v.length == 0) {
      $sname.addClass('error');
      $snameError.text('Name cannot be empty');
      return false;
    } else if (v.length > 50) {
      $sname.addClass('error');
      $snameError.text('Name cannot be over 50 characters');
      return false;
    } else {
      $sname.removeClass('error');
      $snameError.text('');
      return true;
    }
  }
  function _validate_desc() {
    var v = $.trim($sdesc.val());
    if (v.length == 0) {
      $sdesc.addClass('error');
      $sdescError.text('Description cannot be empty');
      return false;
    } else if (v.length > 50) {
      $sdesc.addClass('error');
      $sdescError.text('Description cannot be over 10000 characters');
      return false;
    } else {
      $sdesc.removeClass('error');
      $sdescError.text('');
      return true;
    }
  }
  function _validate_code() {
    var v = $.trim($scode.val());
    if (v.length == 0) {
      $scode.addClass('error');
      $scodeError.text('Code cannot be empty');
      return false;
    } else if (v.length > 50) {
      $scode.addClass('error');
      $scodeError.text('Code cannot be over 10000000 characters');
      return false;
    } else {
      $scode.removeClass('error');
      $scodeError.text('');
      return true;
    }
  }
  $sname.on('blur', function(e) {
    _validate_name();
  });
  $sdesc.on('blur', function(e) {
    _validate_desc();
  });
  $scode.on('blur', function(e) {
    _validate_code();
  });

  $('#submit-btn').on('click', function(e) {
    var r = _validate_name();
    r = _validate_desc() && r;
    r = _validate_code() && r;
    if (!r) {
      e.preventDefault();
    }
  });

  // init
  // _initBtns();
  var ft = $hiddenFiletype.val();
  if (ft <= 0 || ft > 8) {
    _$currBtn = $('#default-type');
    _$currBtn.addClass('btn-inverse');
    ft = 0;
  } else if (ft < 5) {
    _$currBtn = $filetypes.find('.type:eq(' + ft + ')');
    _$currBtn.addClass('btn-inverse');
  } else {
    _$currBtn = $more;
    _$currBtn.addClass('btn-inverse');
    var $menuitem = $filetypes.find('.type-more:eq(' + (ft - 5) + ')');
    $moreTxt.html($menuitem.html() + ' ');
  }
  $hiddenFiletype.val(ft);
})(window, jQuery);

