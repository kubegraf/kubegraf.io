// Theme Switcher for KubeGraf Documentation
// Define setTheme on window immediately so onclick handlers can use it
(function() {
  // Check for saved theme preference or default to dark
  const getTheme = () => {
    const saved = localStorage.getItem('kubegraf-theme');
    if (saved) return saved;

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return 'dark';
  };

  // Update footer theme buttons
  const updateFooterThemeButtons = (theme) => {
    const lightBtn = document.getElementById('theme-light-btn');
    const darkBtn = document.getElementById('theme-dark-btn');
    
    if (lightBtn && darkBtn) {
      if (theme === 'light') {
        lightBtn.classList.add('active');
        darkBtn.classList.remove('active');
      } else {
        darkBtn.classList.add('active');
        lightBtn.classList.remove('active');
      }
    }
  };

  // Update logo based on theme
  const updateLogo = (theme) => {
    const lightLogo = '/assets/logos/binary-matrix/logo-transparent-light.svg';
    const darkLogo = '/assets/logos/binary-matrix/logo-transparent-dark.svg';
    const navLightLogo = '/favicon.svg';
    const navDarkLogo = '/assets/logos/binary-matrix/logo-binary-matrix-cyan.svg';

    // Update navbar and sidebar logos
    const navLogoImages = document.querySelectorAll('.docs-navbar-logo-icon, .sidebar-logo-icon');
    navLogoImages.forEach(img => {
      img.src = theme === 'light' ? navLightLogo : navDarkLogo;
    });

    // Update footer logo (matches landing page Footer.tsx)
    const footerLogo = document.getElementById('footer-logo-img');
    if (footerLogo) {
      footerLogo.src = theme === 'light' ? lightLogo : darkLogo;
    }
  };

  // Apply theme
  const applyTheme = (theme) => {
    if (!document.documentElement) return; // Safety check

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kubegraf-theme', theme);

    // Update toggle button icon if it exists
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      const icon = toggleBtn.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
    }

    // Update footer theme buttons
    updateFooterThemeButtons(theme);

    // Update logo based on theme
    updateLogo(theme);
  };

  // Set theme (for footer buttons) - must be on window for onclick handlers
  // Define this immediately so it's available when buttons are clicked
  window.setTheme = function(theme) {
    applyTheme(theme);
  };

  // Initialize theme on page load
  const initTheme = () => {
    const theme = getTheme();
    applyTheme(theme);
    
    // Also attach event listeners to buttons as fallback (in addition to onclick)
    const lightBtn = document.getElementById('theme-light-btn');
    const darkBtn = document.getElementById('theme-dark-btn');
    
    if (lightBtn) {
      // Remove existing listeners to avoid duplicates
      const newLightBtn = lightBtn.cloneNode(true);
      lightBtn.parentNode.replaceChild(newLightBtn, lightBtn);
      newLightBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.setTheme('light');
      });
    }
    
    if (darkBtn) {
      // Remove existing listeners to avoid duplicates
      const newDarkBtn = darkBtn.cloneNode(true);
      darkBtn.parentNode.replaceChild(newDarkBtn, darkBtn);
      newDarkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.setTheme('dark');
      });
    }
  };

  // Toggle theme
  window.toggleTheme = function() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  };

  // Collapsible Sidebar Sections
  const initCollapsibleSidebar = () => {
    const sections = document.querySelectorAll('.sidebar-section');

    // Load saved expanded states (default is collapsed)
    const savedStates = JSON.parse(localStorage.getItem('kubegraf-sidebar-expanded') || '{}');

    sections.forEach((section, index) => {
      const h3 = section.querySelector('h3');
      if (!h3) return;

      const sectionKey = h3.textContent.trim();
      const hasActiveLink = section.querySelector('a.active');

      // Default to collapsed, unless:
      // 1. User has explicitly expanded it (saved in localStorage)
      // 2. Section contains the active page link
      if (!savedStates[sectionKey] && !hasActiveLink) {
        section.classList.add('collapsed');
      }

      // Add click handler
      h3.addEventListener('click', () => {
        section.classList.toggle('collapsed');

        // Save expanded state (inverted - we track what's expanded)
        const states = JSON.parse(localStorage.getItem('kubegraf-sidebar-expanded') || '{}');
        if (!section.classList.contains('collapsed')) {
          states[sectionKey] = true;
        } else {
          delete states[sectionKey];
        }
        localStorage.setItem('kubegraf-sidebar-expanded', JSON.stringify(states));
      });
    });
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      initCollapsibleSidebar();
    });
  } else {
    // DOM already loaded, run immediately
    initTheme();
    initCollapsibleSidebar();
  }
})();
