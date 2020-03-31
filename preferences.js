'use strict';

function showError(err) {
    $('.error').removeClass('hidden');
    $('.error').append(`<h2>Something went wrong...</h2><br/><p>${err.message}</p>`)
}

function showDogImage(responseJson) {
    $('#animal-image').empty();
    console.log(responseJson);
    console.log('showDogImage ran')
    if (responseJson.status == 'success') {
        $('#animal-image').append(`<img src=${responseJson.message} alt="a very good boy!" class="animalimage">`)
    }
    else {
        $('#animal-image').append(`<h2>OH NO!</h2><br/><p>There was a problem with your request, specifically: ${responseJson.message}. Try again later, or <a href="https://www.ecosia.org/images?q=cute+dog+pictures" target="_blank">click here</a> to see some very good boys!.</p>`)
    }
}

function showCatImage(responseJson) {
    $('#animal-image').empty();
    console.log(responseJson);
    console.log('showCatImage ran');
    $('#animal-image').append(`<img src=${responseJson.file} alt="a very cute kitty!" class="animal-image">`);
}

function showMediaRecommendation(responseJson) {
    $('#media-recommendation').empty();
    console.log(responseJson);
    console.log('showMediaRecommendation ran');
}

function showMusicRecommendation(responseJson) {
    $('#music-recommendation').empty();
    console.log(responseJson);
    console.log('showMusicRecommendation ran');
}

function getResults(animal, mediaType, mediaExample, music, academic) {
    $('.results-container').removeClass('hidden');
    //animal preference:
    if (animal == 'dog') {
        const url = 'https://dog.ceo/api/breeds/image/random';
        fetch(url)
        .then(response => response.json())
        .then(responseJson => showDogImage(responseJson))
        .catch(err => showError(err))
    }
    else if (animal == 'cat') {
        const url = 'https://aws.random.cat/meow'
        fetch(url)
        .then(response => {
        if (response.status == 200) {
            return response.json();
        }
        else {
            throw new Error(response.message);
        }
        })
        .then(responseJson => showCatImage(responseJson))
        .catch(err => showError(err))
    }
    //media preference:
    function formatParams(params) {
        let paramItems = Object.keys(params).map(key => `${key}=${params[key]}`)
        return paramItems.join('&')
    }

    let mediaParams = {
        k: '361408-TheIsola-1U4MPLIQ',
        q: mediaType + ':' + mediaExample
    }

    let mediaQuery = formatParams(mediaParams);
    const mediaURL = 'https://tastedive.com/api/similar?' + mediaQuery;

        fetch(mediaURL)
        .then(response => {
        if (response.status == 200) {
            return response.json();
        }
        else {
            throw new Error(response.message);
        }
        })
        .then(responseJson => showMediaRecommendation(responseJson))
        .catch(err => showError(err))
        //music preference:
        function formatParams(params) {
            let paramItems = Object.keys(params).map(key => `${key}=${params[key]}`)
            return paramItems.join('&')
        }
    
        let musicParams = {
            k: '361408-TheIsola-1U4MPLIQ',
            q: 'band:' + music
        }
    
        let musicQuery = formatParams(musicParams);
        const musicURL = 'https://tastedive.com/api/similar?' + musicQuery;
    
            fetch(musicURL)
            .then(response => {
            if (response.status == 200) {
                return response.json();
            }
            else {
                throw new Error(response.message);
            }
            })
            .then(responseJson => showMusicRecommendation(responseJson))
            .catch(err => showError(err))
        //academic preference:
console.log('getResults ran')
    
}

function formSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        $('.preferences-form-container').addClass('hidden');
        $('.results-container').addClass('hidden');
        $('.error-container').empty().addClass('hidden');
        let animalPref = $('input[name="animal"]:checked').val();
        let mediaPref = $('input[name="consumable-media"]:checked').val();
        console.log(mediaPref);
        let similarMedia = $('#similar').val().toLowerCase().replace(' ', '+');
        console.log(similarMedia)
        let musicPref = $('#music').val().toLowerCase().replace(' ', '+');
        let academicPref = $('#academic').val();
        getResults(animalPref, mediaPref, similarMedia, musicPref, academicPref);
    })
}

$(formSubmit());