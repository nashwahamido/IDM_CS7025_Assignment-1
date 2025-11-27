// Dark/Light Mode Toggle Script
(function() {
    const themeCheckbox = document.getElementById('theme-checkbox');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeCheckbox.checked = true;
    }
    
    // Toggle theme on checkbox change
    themeCheckbox.addEventListener('change', function() {
        body.classList.toggle('light-mode');
        
        // Save preference
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
})();