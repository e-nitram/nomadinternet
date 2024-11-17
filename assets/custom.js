$(document).ready(function() {
$("#main-navigation").show();  
function showRecoverPasswordForm() {
$('#RecoverPasswordForm').show();
$('#CustomerLoginForm').hide();
}

function hideRecoverPasswordForm() {
$('#RecoverPasswordForm').hide();
$('#CustomerLoginForm').show();
}

$('#RecoverPassword').on('click', function(evt) {
evt.preventDefault();
showRecoverPasswordForm();
});

$('#HideRecoverPasswordLink').on('click', function(evt) {
evt.preventDefault();
hideRecoverPasswordForm();
});

$('.live_chat').on('click', function(evt) {
// $('.zohohc-6d87225dab').trigger('click');
$zoho.salesiq.floatwindow.visible("show");
});

/*if(location.hash == '#livechat') {
$('.live_chat').trigger('click');
} else {
// Fragment doesn't exist
}*/

/*if (window.location.href.indexOf("livechat") > -1) {
    $('.zohohc-6d87225dab').trigger('click');
}  */


// Allow deep linking to recover password form
if (window.location.hash == '#recover') {
showRecoverPasswordForm();
}

if ($(".review-carousel").length > 1) {
  $(".review-carousel").owlCarousel({
    items: 1,
    loop: !0,
    margin: 0,
    dots: !0,
    nav: !0,
    autoplay: !0,
    responsive: {
        0: {
            nav: !1,
            autoHeight: !0
        },
        600: {
            nav: !0,
            autoHeight: !1
        }
    }
}), $(document).on("click", ".more-text__link", function() {
    $(this).parents(".answers-group").find(".more-text").toggle()
}), $(function() {
    $("#section_plan").length && $(window).scroll(function() {
        $(window).scrollTop() > $("#section_plan").offset().top - 100 ? $("#help_link").addClass("help-link-sticky") : $("#help_link").removeClass("help-link-sticky")
    })
});
}

$(".more").each(function() {
    var s = $(this).html();
    if (s.length > 400) {
        var e = s.substr(0, 400) + '<span class="moreellipses">...&nbsp;</span><span class="morecontent"><span>' + s.substr(399, s.length - 400) + '</span><a href="" class="morelink d-block">Show more</a></span>';
        $(this).html(e)
    }
}), $(".morelink").click(function() {
    return $(this).hasClass("less") ? ($(this).removeClass("less"), $(this).html("Show more")) : ($(this).addClass("less"), $(this).html("Show less")), $(this).parent().prev().toggle(), $(this).prev().toggle(), !1
}), $(document).on("click", '.privacy a[href^="#"]', function(s) {
    var e = $(this).attr("href"),
        t = $(e);
    if (0 !== t.length) {
        s.preventDefault();
        var n = t.offset().top;
        $("body, html").animate({
            scrollTop: n
        })
    }
})
if( $(window).width() <= 768 ) {
  
    $('.dropdown-toggle.nav-link').click(function(){
  
$('.dropdown-menu').toggleClass("shows");
    
    });

}


tosNavigation()
tosBackToTop()



});

function tosBackToTop() {
if( document.body.id !== 'terms-of-service' ) return;

$( '.back-to-top' ).on( 'click', function( e ) {
e.preventDefault()
$("body, html").animate({
  scrollTop: 0
}, 500)
})
}

function tosNavigation() {
// Bail if not on TOS page
if( document.body.id !== 'terms-of-service' ) return;

const policy = document.querySelector('.shopify-policy__body');


if( policy ) {
const headings = policy.querySelectorAll('h3');

Array.from(headings ?? []).forEach((heading, index) => {
    const sectionNumber = index + 1;
    
    heading.id = 'section-' + sectionNumber
})

}

}

const selectVariantByClickingImage = {
// Create variant images from productJson object
_createVariantImage: function (product) {
const variantImageObject = {};
product.variants.forEach((variant) => {
  if (
    typeof variant.featured_image !== 'undefined' &&
    variant.featured_image !== null
  ) {
    const variantImage = variant.featured_image.src
      .split('?')[0]
      .replace(/http(s)?:/, '');
    variantImageObject[variantImage] =
      variantImageObject[variantImage] || {};
    product.options.forEach((option, index) => {
      const optionValue = variant.options[index];
      const optionKey = `option-${index}`;
      if (
        typeof variantImageObject[variantImage][optionKey] === 'undefined'
      ) {
        variantImageObject[variantImage][optionKey] = optionValue;
      } else {
        const oldValue = variantImageObject[variantImage][optionKey];
        if (oldValue !== null && oldValue !== optionValue) {
          variantImageObject[variantImage][optionKey] = null;
        }
      }
    });
  }
});
return variantImageObject;
},
_updateVariant: function (event, id, product, variantImages) {
const arrImage = event.target.src
  .split('?')[0]
  .replace(/http(s)?:/, '')
  .split('.');
const strExtention = arrImage.pop();
const strRemaining = arrImage.pop().replace(/_[a-zA-Z0-9@]+$/, '');
const strNewImage = `${arrImage.join('.')}.${strRemaining}.${strExtention}`;
if (typeof variantImages[strNewImage] !== 'undefined') {
  product.variants.forEach((option, index) => {
    const optionValue = variantImages[strNewImage][`option-${index}`];
    if (optionValue !== null && optionValue !== undefined) {
      const selects = document.querySelectorAll('#'+ id + ' [class*=single-option-selector]');
      const options = selects[index].options;
      for (let option, n = 0; (option = options[n]); n += 1) {
        if (option.value === optionValue) {
          selects[index].selectedIndex = n;
          selects[index].dispatchEvent(new Event('change'));
          break;
        }
      }
    }
  });
}
},
_selectVariant: function() {
const productJson = document.querySelectorAll('[id^=ProductJson-');
if (productJson.length > 0) {
  productJson.forEach((product) => {
    const sectionId = product.id.replace("ProductJson-", "shopify-section-");
    const thumbnails = document.querySelectorAll('#'+ sectionId + ' img[src*="/products/"]');
    if (thumbnails.length > 1) {
      const productObject = JSON.parse(product.innerHTML);
      const variantImages = this._createVariantImage(productObject);
      // need to check variants > 1
      if (productObject.variants.length > 1) {
        thumbnails.forEach((thumbnail) => {
          thumbnail.addEventListener('click', (e) =>
            this._updateVariant(e, sectionId, productObject, variantImages),
          );
        });
      }
    }
  });
}
},
};
if (document.readyState !== 'loading') {
selectVariantByClickingImage._selectVariant();
} else {
document.addEventListener(
'DOMContentLoaded',
selectVariantByClickingImage._selectVariant(),
);
};
window.document.onkeydown = function(e) {
if (!e) {
e = event;
}
if (e.keyCode == 27) {
lightbox_close();
}
}

function lightbox_open() {
var lightBoxVideo = document.getElementById("VisaChipCardVideo");
window.scrollTo(0, 0);
document.getElementById('light').style.display = 'block';
document.getElementById('fade').style.display = 'block';
lightBoxVideo.play();
}

function lightbox_close() {
var lightBoxVideo = document.getElementById("VisaChipCardVideo");
document.getElementById('light').style.display = 'none';
document.getElementById('fade').style.display = 'none';
lightBoxVideo.pause();
}
function _loadFaqList( t ) {
            var $faqList = $( t ).find( '.faq-list' );

            $faqList.on('click', '.faq-list__item-question', function(e) {
                e.preventDefault();
                $(this).parent().toggleClass('is-expanded');
            });
}
    
$('.faq-list__item-question').click(function(e) {
e.preventDefault();
var notthis = $('.active').not(this);
notthis.find('.icon-minus').addClass('icon-plus').removeClass('icon-minus');
notthis.toggleClass('active').next('.faq-list__item-answer').slideToggle(300);
$(this).toggleClass('active').next().slideToggle("fast");
$(this).children('i').toggleClass('icon-plus icon-minus');
})

const icons = document.querySelectorAll('.video-and-text-section .icon-list .icon');
const popupContents = document.querySelectorAll('.video-and-text-section .customize-notify');
const uspItems = document.querySelectorAll('[js-usp-block-item]');
const uspPopupContents = document.querySelectorAll('.usp_block-popup.customize-notify');

if (window.innerWidth > 768) {
  icons.forEach(icon => {
    const index = icon.getAttribute('data-index');
  
    icon.addEventListener('mouseover', (e) => {
      popupContents.forEach(content => {
        const cIdx = content.getAttribute('data-index');
        if (cIdx == index) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
    });
  
    icon.addEventListener('mouseout', (e) => {
      popupContents.forEach(content => {
        const cIdx = content.getAttribute('data-index');
        if (cIdx == index) {
          content.classList.add('hidden');
        }
      });
    });
  });

  uspItems.forEach(item => {
    const index = item.getAttribute('data-index');

    item.addEventListener('mouseover', (e) => {
      uspPopupContents.forEach(content => {
        const cIdx = content.getAttribute('data-index');
        if (cIdx == index) {
          if (content.getAttribute('data-page') == 'beacon-one') {
            content.style.top = `${item.getBoundingClientRect().top - 180}px`;
          } else {
            content.style.top = `${item.getBoundingClientRect().top - 150}px`;
          }
          
          content.style.left = `${item.getBoundingClientRect().x + item.getBoundingClientRect().width / 2}px`;
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
    });

    item.addEventListener('mouseout', (e) => {
      uspPopupContents.forEach(content => {
        const cIdx = content.getAttribute('data-index');
        if (cIdx == index) {
          content.classList.add('hidden');
        }
      });
    });
  });
}


const titles = document.querySelectorAll('.image-and-video .video-list a.text-reset.text-left .slick-title');
titles.forEach(title => {
  const str = title.innerHTML;
  if (str.length > 70) {
    title.innerHTML = str.slice(0, 70) + ' ...';
  }
});


//getTiktokVideos();

  function getTiktokVideos() {
    var details = {
      'client_key': 'aw44cazrx55x37lh',
      'client_secret': '7oa5J3JPaMXlWuAS3ATSUL4X8w1e815D',
      'grant_type': 'client_credentials'
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log('formBody = ', formBody);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cache-Control", "no-cache");
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    const urlencoded = new URLSearchParams();
    urlencoded.append("client_key", "aw44cazrx55x37lh");
    urlencoded.append("client_secret", "7oa5J3JPaMXlWuAS3ATSUL4X8w1e815D");
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("https://open.tiktokapis.com/v2/oauth/token/", requestOptions).then(res => res.json()).then(response => {
      console.log('data = ', response.json());
    }).catch(e => {
      console.log('e = ', e);
    })

    fetch('http://npm-wh.nomadinternet.com/get_tiktok_video').then(res => {
      console.log('res = ', res);
    }).catch(error => {
      console.log('err = ', error);
    })
  }