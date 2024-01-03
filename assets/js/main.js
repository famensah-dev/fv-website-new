document.addEventListener('DOMContentLoaded', function () {   
    var navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function () {
      if (window.scrollY > navbar.offsetHeight) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
    });

    // Get the current page URL
    var currentUrl = window.location.href;

    // Get all navigation links
    var navLinks = document.querySelectorAll('nav a');

    // Loop through each link and check if it matches the current URL
    navLinks.forEach(function(link) {
        if (link.href === currentUrl) {
            // Add the 'active' class to the matching link
            link.classList.add('active');
        }
    });
  });
  