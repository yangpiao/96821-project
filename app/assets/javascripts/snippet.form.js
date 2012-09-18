// ===== page snippets/new =====
(function(host, $) {
  var $filetypes = $('.form-filetype'),
    $moreTxt = $('.more-btn em'),
    $more = $moreTxt.parent(),
    $hiddenFiletype = $('#snippet_filetype'),

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
    return false;
  });
  $filetypes.delegate('.type-more', 'click', function(e) {
    _initBtns();
    $moreTxt.html(this.innerHTML + ' ');
    $more.addClass('btn-inverse');
    _$currBtn = $more;
    $hiddenFiletype.val($(this).data('value'));
    return false;
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

