function mobileNavToggle() {
    let navMenu = document.getElementById('jsMenu');
    let navBarToggle = document.getElememtById('jsNavbarToggle');

    navBarToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    })
}

$(mobileNavToggle());