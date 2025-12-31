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

  // Update footer theme button title
  const updateFooterThemeButton = (theme) => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      const nextTheme = theme === 'light' ? 'dark' : 'light';
      themeBtn.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
      themeBtn.setAttribute('title', `Switch to ${nextTheme} theme`);
    }
  };

  // Update logo based on theme - matches landing page Navbar.tsx and Footer.tsx
  const updateLogo = (theme) => {
    // Same logos as landing page (transparent versions)
    const lightLogo = '/assets/logos/binary-matrix/logo-transparent-light.svg';
    const darkLogo = '/assets/logos/binary-matrix/logo-transparent-dark.svg';

    // Update navbar logo (same as landing page Navbar.tsx)
    const navLogoImages = document.querySelectorAll('.docs-navbar-logo-icon, .sidebar-logo-icon');
    navLogoImages.forEach(img => {
      img.src = theme === 'light' ? lightLogo : darkLogo;
    });

    // Update footer logo (same as landing page Footer.tsx)
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

    // Update footer theme button
    updateFooterThemeButton(theme);

    // Update logo based on theme
    updateLogo(theme);
  };

  // Toggle theme (for footer button) - must be on window for onclick handler
  // Define this immediately so it's available when button is clicked
  window.toggleTheme = function() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  };

  // Initialize theme on page load
  const initTheme = () => {
    const theme = getTheme();
    applyTheme(theme);

    // The button already has onclick="toggleTheme()" in HTML, no need to clone
    // Just verify window.toggleTheme is available
    if (typeof window.toggleTheme === 'function') {
      console.log('Theme toggle initialized successfully');
    }
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
