'use strict';

function showError(err) {
    $('.error').removeClass('hidden');
    $('.error').append(`<h2>Something went wrong...</h2><br/><p>${err.message}</p>`)
}

function showDogImage(responseJson) {
    $('#animal-image').empty();
    if (responseJson.status == 'success') {
        $('#animal-image').append(`<h3>Adorable!</h3>\n<img src=${responseJson.message} alt="a very good boy!" class="animal-image-result">`)
    }
    else {
        $('#animal-image').append(`<h3>OH NO!</h3>\n<p>There was a problem with your request, specifically: ${responseJson.message}. Try again later, or <a href="https://www.ecosia.org/images?q=cute+dog+pictures" target="_blank">click here</a> to see some very good boys!.</p>`)
    }
}

function showCatImage(responseJson) {
    $('#animal-image').empty();
    $('#animal-image').append(`<h3>Adorable!</h3>\n<img src=${responseJson.file} alt="a very cute kitty!" class="animal-image-result">`);
}

function noEntry() {
    $('#media-recommendation').empty();
    $('#media-recommendation').append('<h3>Surprise!</h3>\n<p>My favorite show is Adventure Time! Watch it on Netflix!</p><p>Or, check out my favorite independent animator\'s newest pilot <a href="https://www.youtube.com/watch?v=Zlmswo0S0e0" target="_blank">here</a>!</p>');
}

function showShowRecommendation(responseJson) {
    $('#media-recommendation').empty();
    let numWorks = responseJson.results.length - 1
    let randomWork = Math.floor((Math.random() * numWorks))
    $('#media-recommendation').append(`<h3>You should watch ${responseJson.results[randomWork].title}!</h3>\n<img src="${responseJson.results[randomWork].image_url}" alt="${responseJson.results[randomWork].title} promotional poster"><p>More info and videos available <a href="${responseJson.results[randomWork].url}" target="_blank">here</a>!`);
}

function showRecipe(responseJson) {
    $('#food-recommendation').empty();
    $('#food-recommendation').append(`<h3>${responseJson.meals[0].strMeal}</h3>\n<img src="${responseJson.meals[0].strMealThumb}" alt="A mouthwatering picture of ${responseJson.meals[0].strMeal}"><p>Find the video tutorial <a href="${responseJson.meals[0].strYoutube}" target="_blank">here</a>!</p>`);
}

function noRecipe() {
    $('#food-recommendation').empty();
    $('#food-recommendation').append('<h3>Fine. You don\'t want a recipe?</h3><br/><iframe src="https://giphy.com/embed/5D44HsQatBVvO" width="480" height="271" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/angry-mad-hungry-5D44HsQatBVvO">via GIPHY</a></p>');
}

function showJoke(responseJson) {
    $('#joke-container').empty();
    if (responseJson.setup == 'undefined') {
        $('#joke-container').append(`<h3>Here is a joke for you!</h3>\n<p>Why don\'t aliens eat clowns?</p><p>Because they taste funny!</p>`);
    }
    else {
        $('#joke-container').append(`<h3>Here is a joke for you!</h3>\n<p>${responseJson.setup}</p><p>${responseJson.delivery}</p>`);
    }
}

function noJoke() {
    $('#joke-container').empty();
    $('#joke-container').append('<h3>Seriously? Who doesn\'t like jokes??</h3>\n<iframe src="https://giphy.com/embed/12fWLm0gSY8kJa" width="480" height="320" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/robert-downey-jr-iron-man-jon-favreau-12fWLm0gSY8kJa">via GIPHY</a></p>');
}

function getResults(animal, mediaGenre, recipe, joke) {
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
    if (mediaGenre == 'surprise') {
        noEntry();
    }
   
    else {
        const url = 'https://api.jikan.moe/v3/search/anime?q=' + mediaGenre;
        fetch(url)
        .then(response => {
        if (response.status == 200) {
            return response.json();
        }
        else {
            throw new Error(response.message);
        }
        })
        .then(responseJson => showShowRecommendation(responseJson))
        .catch(err => showError(err))
    }

    //recipe:
    if (recipe == 'yes') {
        const url = 'https://www.themealdb.com/api/json/v1/1/random.php'
        fetch(url)
        .then(response => {
        if (response.status == 200) {
            return response.json();
        }
        else {
            throw new Error(response.message);
        }
        })
        .then(responseJson => showRecipe(responseJson))
        .catch(err => showError(err))
    }
    else if (recipe == 'no') {
        noRecipe();
    }
    //joke:
    if (joke == 'yes') {
        const url = 'https://sv443.net/jokeapi/v2/joke/Any'
        fetch(url)
        .then(response => {
        if (response.status == 200 || response.status == 201) {
            return response.json();
        }
        else {
            throw new Error(response);
        }
        })
        .then(responseJson => showJoke(responseJson))
        .catch(err => showError(err))
    }
    else if (joke == 'no') {
        noJoke();
    }
    
}

function showPage() {
    $('.loader').addClass('hidden');
    $('.results-container').removeClass('hidden');
}

function formSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        $('.preferences-form-container').addClass('hidden');
        $('.results-container').addClass('hidden');
        $('.error-container').empty().addClass('hidden');
        $('.loader').removeClass('hidden');
        let animalPref = $('input[name="animal"]:checked').val();
        let mediaGenre = $('#genre').val().toLowerCase().replace(' ', '+');
        let recipePref = $('input[name="food"]:checked').val();
        let jokePref = $('input[name="joke"]:checked').val();
        getResults(animalPref, mediaGenre, recipePref, jokePref);
        setTimeout(showPage, 4000);
    });
}

$(formSubmit());