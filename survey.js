'use strict';

function formSubmit() {
    $('.feedback-form').on('click', '#send', event => {
        event.preventDefault();
        $('.feedback-form-container').addClass('hidden');
        $('.results-container').removeClass('hidden');
        console.log('formSubmit ran')
    })
}

$(formSubmit());