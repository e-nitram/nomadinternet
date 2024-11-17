document.addEventListener("DOMContentLoaded", () => {

  // Add .scrolled class to header if page is scrolled
  (() => {
    function headerScrolled() {
      const header = document.querySelector(".header");
      if (!header) return;
      console.log('scrolled!!!!!!')
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    headerScrolled();
    document.addEventListener("scroll", headerScrolled);
  })();

  // Back to top button
  (() => {
    const btn = document.querySelector(".back-to-top");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        800
      );
    });
  })();

  // Awesome Section - Animations on scroll
  (() => {
    const sections = document.querySelectorAll(".awesome-section");
    sections.forEach((section) => {
      new Waypoint({
        element: section,
        handler: function (_) {
          const content = section.querySelector(".awesome-section__content");
          if (content) {
            content.classList.add("in-view");
          }
        },
        offset: "75%",
      });
    });
  })();

  // Specifications
  (() => {
    const specifications = document.querySelector(
      ".shopify-section.specifications"
    );
    if (!specifications) return;

    const hashURL = window.location.hash.replace("#", "");

    const navList = specifications.querySelectorAll(".specifications__nav li");
    const specList = specifications.querySelectorAll(".specification");

    if (navList.length < 1 || specList < 1) return;

    function clearActive() {
      navList.forEach((item) => item.classList.remove("active"));
      specList.forEach((item) => item.classList.remove("active"));
    }

    function setActive(id) {
      if (id < 1 || id > navList.length)
        return console.error("Specification ID Error!");

      clearActive();

      navList[id - 1].classList.add("active");
      specList[id - 1].classList.add("active");
    }

    function setActiveByHash(hash) {
      const navItem = specifications.querySelector(
        `.specifications__nav li[data-id="${hash}"]`
      );
      const specItem = specifications.querySelector(
        `.specification[data-id="${hash}"]`
      );

      if (!navItem || !specItem) return;

      clearActive();

      navItem.classList.add("active");
      specItem.classList.add("active");
    }

    function getNavItemID(item) {
      return [...navList].indexOf(item) + 1;
    }

    if (hashURL) setActiveByHash(hashURL);
    else setActive(1);

    navList.forEach((li) => {
      li.addEventListener("click", (e) => {
        setActive(getNavItemID(e.currentTarget));
      });
    });
  })();

  // First Screen Parallax
  (() => {
    const bg = document.querySelector(
      ".plan-first-screen .plan-first-screen__bg"
    );
    if (!bg) return;

    function parallax() {
      bg.style.transform = `translateY(${window.scrollY * 0.2}px)`;
    }

    parallax();

    window.addEventListener("scroll", parallax);
  })();

  // Collapsible blocks
  // attrs:
  // <div data-collapse="... View more" data-collapse-height="300"></div>
  (() => {
    const blocks = document.querySelectorAll('[data-collapse]')

    blocks.forEach(block => {
      let height = parseInt(block.getAttribute('data-collapse-height'))
      height = height ? height : 0
      let moreText = block.getAttribute('data-collapse')

      block.style.overflow = 'hidden'
      block.style.height = height + 'px'
      block.style.transition = 'all 0.6s ease'

      const after = document.createElement('span')
      after.classList.add('collapse-view-more')
      after.innerHTML = moreText
      after.style.cursor = 'pointer'
      after.style.userSelect = 'none'
      after.style.display = 'block'
      after.style.marginTop = '1em'

      $(block).after(after)

      after.addEventListener('click', e => {
        e.preventDefault()
        $(block).css('height', block.scrollHeight + 'px')
        block.classList.add('expanded')
        after.remove()
      })
    })
  })();
});
