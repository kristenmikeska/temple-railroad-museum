document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('nav');
    var navLinks = document.querySelector('.nav-links');
    if (!nav || !navLinks) return;

    // Inject hamburger button
    var toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '&#9776;';
    nav.appendChild(toggle);

    toggle.addEventListener('click', function () {
        var open = navLinks.classList.toggle('open');
        toggle.innerHTML = open ? '&#10005;' : '&#9776;';
        toggle.setAttribute('aria-expanded', String(open));
    });

    // Tap a dropdown parent on mobile to expand it
    document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 1100) {
                e.preventDefault();
                var parent = this.closest('.has-dropdown');
                // Close siblings
                document.querySelectorAll('.has-dropdown.open').forEach(function (el) {
                    if (el !== parent) el.classList.remove('open');
                });
                parent.classList.toggle('open');
            }
        });
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            toggle.innerHTML = '&#9776;';
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Reset on resize back to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 1100) {
            navLinks.classList.remove('open');
            toggle.innerHTML = '&#9776;';
            toggle.setAttribute('aria-expanded', 'false');
            document.querySelectorAll('.has-dropdown.open').forEach(function (el) {
                el.classList.remove('open');
            });
        }
    });
});
