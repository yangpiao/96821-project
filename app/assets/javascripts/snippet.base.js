(function(host, $) {
  var NOOP = function() {},
    $dlg = $('#tipDlg').modal({show: false, keyboard: false}),
    $dlghd = $('#tipDlg-hd').html('Error'),
    $dlgbd = $('#tipDlg-bd'),
    $dlgc = $('#tipDlg-c'),
    $dlgs = $('#tipDlg-s'),
    $dlgclose = $dlg.find('.close'),

    _dlg = {
      show: function(params) {
        // $dlg.show(params);
        $dlg.modal('show');
      },
      hide: function(params) {
        // $dlg.hide(params);
        $dlg.modal('hide');
      },
      set: function(config) {
        if (typeof config !== 'object') {
          return false;
        }
        var hd = config.hd, bd = config.bd,
          onok = config.onok || null,
          oncancel = config.oncancel || null,
          hideClose = config.hideClose || false,
          hideOk = config.hideOk || false,
          hideCancel = config.hideCancel || false;
        if (hd !== undefined) {
          $dlghd.html(hd);
        }
        if (bd !== undefined) {
          $dlgbd.html(bd);
        }
        if (hideOk) {
          $dlgs.hide();
        } else {
          $dlgs.show();
        }
        if (hideCancel) {
          $dlgc.hide();
        } else {
          $dlgc.show();
        }
        if (hideClose) {
          $dlgclose.hide();
        } else {
          $dlgclose.show();
        }
        this.onok = onok;
        this.oncancel = oncancel;
      },
      onok: null,
      oncancel: null
    };

  $dlg.on('hidden', function(e) {
    _dlg.oncancel && _dlg.oncancel(e);
    console.log('hidden');
  });
  $dlgs.on('click', function(e) {
    var ret;
    if (_dlg.onok) {
      ret = _dlg.onok(e);
    }
    if (_dlg.onok !== false) {
      _dlg.hide();
    }
    console.log('ok');
    e.preventDefault();
  });

  host.gEarlGreyCommon = {
    dlg: _dlg
  };
})(window, jQuery);

