// Function to prevent specific key combinations
function preventShortcuts(e) {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'v')) {
        e.preventDefault();
        alert(`Action disabled: ${e.key === 'c' ? 'Copy (Ctrl+C)' : 'Paste (Ctrl+V)'}`);
    }
}

// Add event listeners for keydown and keyup events
document.addEventListener('keydown', preventShortcuts);
document.addEventListener('keyup', preventShortcuts);


document.addEventListener('copy', function (e) {
    e.preventDefault();
    alert('Copying is disabled on this page.');
});

document.addEventListener('cut', function (e) {
    e.preventDefault();
    alert('Cutting is disabled on this page.');
});

document.addEventListener('paste', function (e) {
    e.preventDefault();
    alert('Pasting is disabled on this page.');
});

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    alert('Right-click is disabled on this page.');
});
// Function to detect if the developer tools are open
function isDevToolsOpen() {
    const threshold = 160; // Change this value to adjust the threshold
    const devtools = window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;
    return devtools;
}

// Function to display alternative content
function displayAlternativeContent() {
    const content = '<script>const htmlContent = \'<div><p>Hello World</p></div>\'; document.body.innerHTML = htmlContent;<\/script>';
    document.body.innerHTML = content;
}

// Periodically check if the developer tools are open
setInterval(function () {
    if (isDevToolsOpen()) {
        displayAlternativeContent();
    }
    const sensitiveContent = document.createElement('div');
    sensitiveContent.innerHTML = `
    
    
    
`;
    document.getElementById('content').appendChild(sensitiveContent);
}, 100); // Check every second






//  DARk TOGGLE THEME 

// Function to toggle dark theme and change logo
function showTheme() {
    const body = document.body;
    body.classList.toggle('dark');

    // Toggle dark theme on other elements with class 'darkable'
    const elementsToToggle = document.querySelectorAll('.darkable');
    elementsToToggle.forEach(function (element) {
        element.classList.toggle('dark');
    });

    // Change navbar logo based on the theme
    const navLogo = document.getElementById('nav-logo');
    if (navLogo) {
        if (body.classList.contains('dark')) {
            navLogo.src = '../Images/darkshortlogo.png';
        } else {
            navLogo.src = '../Images/logo4-removebg-preview.png';
        }
    }

    const footerLogo = document.getElementById('footerlogo');
    if (footerLogo) {
        if (body.classList.contains('dark')) {
            footerLogo.src = '../Images/darkshortlogo.png';
        } else {
            footerLogo.src = '../Images/logo3-removebg-preview.png';
        }
    }

    // Change the theme icon
    const themeIcon = document.getElementById('theme-icon');
    if (body.classList.contains('dark')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}
