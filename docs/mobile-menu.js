// Mobile menu functionality for docs pages
(function() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }

  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-sidebar-overlay');
    
    if (!mobileMenuBtn || !sidebar || !overlay) {
      return; // Elements not found, skip
    }
    
    function toggleMobileMenu() {
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('active');
    }
    
    function closeMobileMenu() {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking on a sidebar link (mobile only)
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 900) {
          setTimeout(closeMobileMenu, 100);
        }
      });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
        closeMobileMenu();
      }
    });
  }
})();



