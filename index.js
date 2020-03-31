'use strict';

function mobileNavToggle() {
    let navMenu = document.getElementById('jsMenu');
    let navBarToggle = document.getElementById('jsNavbarToggle');

    navBarToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    })
}

$(mobileNavToggle());