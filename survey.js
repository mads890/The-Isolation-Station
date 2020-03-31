'use strict';

function formSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        $('.feedback-form-container').addClass('hidden');
        $('form').reset();
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