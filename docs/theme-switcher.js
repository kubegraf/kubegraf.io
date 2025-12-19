// Theme Switcher for KubeGraf Documentation
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

  // Apply theme
  const applyTheme = (theme) => {
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
  };

  // Initialize theme on page load
  const initTheme = () => {
    const theme = getTheme();
    applyTheme(theme);
  };

  // Toggle theme
  window.toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
