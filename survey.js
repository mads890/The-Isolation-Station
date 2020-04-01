'use strict';

function formSubmit() {
    $('.feedback-form').on('click', 'button', event => {
        event.preventDefault();
        $('feedback-form').reset();
        $('.feedback-form-container').addClass('hidden');
        $('.results-container').removeClass('hidden');
        console.log('formSubmit ran')
    })
}

function retakeSurvey() {
    $('.results-container').submit(event => {
        event.preventDefault();
        $('.results-container').addClass('hidden');
        $('.feedback-form-container').removeClass('hidden');
        console.log('retakeSurvey ran')
    })
}

$(formSubmit());
$(retakeSurvey());