'use strict';

function mobileNavToggle() {
    let navMenu = document.getElementById('js-menu');
    let navBarToggle = document.getElementById('js-navbar-toggle');

    navBarToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    })
}

$(mobileNavToggle());