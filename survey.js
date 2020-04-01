'use strict';

function formSubmit() {
    $('form').on('click', 'button', event => {
        event.preventDefault();
        $('feedback-form').reset();
        $('.feedback-form-container').addClass('hidden');
        $('.results-container').removeClass('hidden');
    })
}

function retakeSurvey() {
    $('.results-container').submit(event => {
        event.preventDefault();
        $('.results-container').addClass('hidden');
        $('.feedback-form-container').removeClass('hidden');
    })
}

$(formSubmit());
$(retakeSurvey());