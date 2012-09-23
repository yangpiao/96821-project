(function(host, $) {
  var NOOP = function() {},
    $login = $('#u-login'),
    $signup = $('#u-signup'),
    $gravatar = $('#u-gravatar').tooltip(),
    $loginDlg = $('#loginDlg').modal({show: false}),
    $signupDlg = $('#signupDlg').modal({show: false}),
    $loginBtn = $('#user-login'),
    $signupBtn = $('#user-signup'),
    $loginForm = $loginBtn.parent().parent(),
    $signupForm = $signupBtn.parent().parent(),
    LOGIN_URL = $loginForm.attr('action'),
    SIGNUP_URL = $signupForm.attr('action'),

    $lEmail = $('#user_email'),
    $lPass = $('#user_password'),
    $lRemember = $('#user_remember_me'),
    $lEmailErr = $('#login-email-err'),
    $lPassErr = $('#login-pass-err'),

    $sName = $('#user_name'),
    $sEmail = $('#user_email_s'),
    $sPass = $('#user_password_s'),
    $sPassCfm = $('#user_password_confirmation'),
    $sNameErr = $('#signup-name-err'),
    $sEmailErr = $('#signup-email-err'),
    $sPassErr = $('#signup-pass-err'),
    $sPassCfmErr = $('#signup-pass-c-err'),

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
  });
  $dlgs.on('click', function(e) {
    var ret;
    if (_dlg.onok) {
      ret = _dlg.onok(e);
    }
    if (_dlg.onok !== false) {
      _dlg.hide();
    }
    e.preventDefault();
  });

  // ===== login / signup =====
  var _lh = 0, _sh = 0;
  $loginDlg.on('show', function(e) {
    $lEmail.val('');
    $lPass.val('');
    $lRemember[0].checked = true;
    $lEmailErr.text('');
    $lPassErr.text('');
  });
  $login.on('click', function(e) {
    $loginDlg.modal('show');
    host.setTimeout(function() {
      $lEmail.focus();
    }, 500);
    if (!_lh) {
      _lh = $loginDlg.height();
      $loginDlg.css('margin-top', 0 - _lh / 2);
    }
    e.preventDefault();
  });
  $signup.on('click', function(e) {
    $signupDlg.modal('show');
    host.setTimeout(function() {
      $sName.focus();
    }, 500);
    if (!_sh) {
      _sh = $signupDlg.height();
      $signupDlg.css('margin-top', 0 - _sh / 2);
    }
    e.preventDefault();
  });
  // login
  $loginBtn.on('click', function(e) {
    var r = 0;
    if ($lRemember[0].checked) {
      r = 1;
    }
    $.ajax({
      url: LOGIN_URL + '.json',
      type: 'POST',
      dataType: 'json',
      data: {
        user: {
          email: $.trim($lEmail.val()),
          password: $lPass.val(),
          remember_me: r
        }
      },
      success: function(data) {
        // console.log(data);
        // TODO: js render
        host.location.reload();
      },
      error: function(xhr, status, error) {
        var ret = $.parseJSON(xhr.responseText),
          txt = '(Email cannot be empty)';
        return;
        if ($.trim($lEmail.val()) !== '') {
          txt = '(' + (ret.error || 'An error has occurred') + ')';
        }
        $lEmailErr.text(txt);
      }
    });
    e.preventDefault();
  });
  // sign up
  $signupBtn.on('click', function(e) {
    $.ajax({
      url: SIGNUP_URL + '.json',
      type: 'POST',
      data: {
        user: {
          name: $.trim($sName.val()),
          email: $.trim($sEmail.val()),
          password: $sPass.val(),
          password_confirmation: $sPassCfm.val()
        }
      },
      success: function(data) {
        // console.log(data);
        // TODO: js render
        host.location.reload();
      },
      error: function(xhr, status, error) {
        var ret = $.parseJSON(xhr.responseText),
          errors = ret && ret.errors || {}, txt;
        $sNameErr.text(errors.name && errors.name[0] || '');
        $sEmailErr.text(errors.email && errors.email[0] || '');
        $sPassErr.text(errors.password && errors.password[0] || '');
        $sPassCfmErr.text(errors.password_confirmation &&
          errors.password_confirmation[0] || '');
      }
    });
    e.preventDefault();
  });

  host.gEarlGreyCommon = {
    dlg: _dlg
  };
})(window, jQuery);

