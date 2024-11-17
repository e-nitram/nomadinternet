window.addEventListener("DOMContentLoaded", (event) => {
  const popupContent = document.querySelector('[js-popup-section]');
  const hide_popup = getCookie('popup_hide');

  if (popupContent) {
    if (hide_popup == '1') {
      popupContent.classList.remove('active');
    } else {
      popupContent.classList.add('active');
    }

    const closeBtn = popupContent.querySelector('[js-popup-section--close]');
    const contentBg = popupContent.querySelector('[js-popup-section--bg]');
    const submitBtn = popupContent.querySelector('[js-form-submit]');
    const hyperLink = popupContent.querySelector('.additional-link');

    if (hyperLink) {
      hyperLink.addEventListener('click', (e) => {
        e.preventDefault();

        popupContent.classList.remove('active');
        setCookie('popup_hide', '1');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        popupContent.classList.remove('active');
        setCookie('popup_hide', '1');
      });
    }

    if (contentBg) {
      contentBg.addEventListener('click', (e) => {
        e.preventDefault();
        popupContent.classList.remove('active');
        setCookie('popup_hide', '1');
      });
    }

    var $form = $('#contact_form');
    var url = 'https://script.google.com/macros/s/AKfycbyauVxDnvGG-R5aO45mSaHpynGqZ5rIQt2_Rhf354DwguD8KjQ5rnnbH925BJ-BwwL2dQ/exec'

    const input = popupContent.querySelector('[js-form-input]');
    const error = popupContent.querySelector('[js-form-error]');
    if (input) {
      input.addEventListener('input', (e) => {
        e.preventDefault();
        if (e.target.value == '') {
          error.classList.remove('hidden');
          error.innerHTML = 'Please input your email.';
        } else if (!ValidateEmail(input)) {
          error.classList.remove('hidden');
          error.innerHTML = 'Please enter valid email.';
        }
        error.classList.add('hidden');
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (input.value == '') {
          error.classList.remove('hidden');
          error.innerHTML = 'Please input your email.';
          return;
        }

        if (!ValidateEmail(input)) {
          error.classList.remove('hidden');
          error.innerHTML = 'Please enter valid email.';
          return;
        }

        error.classList.add('hidden');
        submitBtn.classList.add('disabled');

        popupContent.classList.remove('active');

        $.ajax({
          url: url,
          method: "GET",
          dataType: "json",
          data: $form.serialize(),
          success: function(html) {
            submitBtn.classList.remove('disabled');
            setCookie('popup_hide', '1');
            window.location.href = '/pages/plans'
          }
        });
      })
    }

  }

  function setCookie(name,value) {
    const day = 14; // one day
    var expires = "";
    if (day) {
        var date = new Date();
        date.setTime(date.getTime() + (day*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.value.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }
});