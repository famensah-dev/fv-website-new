document.addEventListener('DOMContentLoaded', function () {   
  const currentUrl = window.location.href;  
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('nav a');
  const navMenuLinks = document.querySelectorAll('#nav-menu a');

  navLinks.forEach(el => el.addEventListener('click', scrollToSection));
  navMenuLinks.forEach(el => el.addEventListener('click', scrollToSection));

  function scrollToSection(event){
    closeNavMenu();
    smoothScroll(event);
  }

  // function smoothScroll(event){
  //   event.preventDefault();
  //   const targetId = event.currentTarget.getAttribute('href');
  //   window.scrollTo({
  //     top: targetId === '#home' ? 0 : document.querySelector(targetId).offsetTop,
  //     behavior: "smooth"
  //   })
  // }

    function smoothScroll(event){
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const targetPosition = targetElement.offsetTop;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      let start = null;
      const duration = 800;

      window.requestAnimationFrame(step);

      function step(timestamp){
        if(!start) start = timestamp;
        const progress = timestamp - start;
        const value = distance*(progress/duration) + startPosition
        window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
        if(progress < duration)window.requestAnimationFrame(step)
      }
    }

    // function easeInOutQuad(x) {
    //   return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    // }

    function easeInOutQuad(t, b, c, d) {
      t /= d/2;
      if(t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    }


    // const navbarToggler = document.getElementById('nav-menu-icon');
    // const navbarMenu = document.getElementById('nav-menu');
    // let isMenuOpen = false;

    // navbarToggler.addEventListener('click', navbarTogglerClick);
    // function navbarTogglerClick(){
    //   isMenuOpen = !isMenuOpen;
    //   navbarToggler.innerHTML = isMenuOpen ? `<i class="uil uil-arrow-right"></i>` :`<i class="uil uil-bars"></i>`
    //   navbarToggler.classList.toggle('open');
    //   // navbarMenu.classList.toggle('open');
    // }

    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('#nav-menu');
    let menuOpen = false;
    
    menuBtn.addEventListener('click', function(){
      if(!menuOpen){
        menuBtn.classList.add('open')
        navMenu.classList.add('open')
        menuOpen = true;
      }else{
        menuBtn.classList.remove('open')
        navMenu.classList.remove('open')
        menuOpen = false;
      }
    })

    function closeNavMenu(){
      if(navMenu.classList.contains('open'))
      {
        menuBtn.classList.remove('open')
        navMenu.classList.remove('open')
        menuOpen = false;
      }
    }
  

    const topnavBtn = document.querySelector('#topnav-menu-icon');
    const topnavMenu = document.querySelector('.alt-topnav');
    let topnavMenuOpen = false;
    
    topnavBtn.addEventListener('click', function(){
      if(!topnavMenuOpen){
        topnavBtn.classList.add('open')
        topnavMenu.classList.add('open')
        topnavMenuOpen = true;
      }else{
        topnavBtn.classList.remove('open');
        topnavMenu.classList.remove('open')
        topnavMenuOpen = false;
      }
    })


    window.addEventListener('scroll', function () {
      if (window.scrollY > navbar.offsetHeight) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
    });

    // Loop through each link and check if it matches the current URL
    navLinks.forEach(function(link) {
        if (link.href === currentUrl) {
            // Add the 'active' class to the matching link
            link.classList.add('active');
        }else{
          link.classList.remove('active')
        }
    });

  });
  