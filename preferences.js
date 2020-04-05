'use strict';

function showError(err) {
    $('.error').removeClass('hidden');
    $('.error').append(`<h2>Something went wrong...</h2><br/><p>${err.message}</p>`)
}

function showDogImage(responseJson) {
    $('#animal-image').empty();
    if (responseJson.status == 'success') {
        $('#animal-image').append(`<img src=${responseJson.message} alt="a very good boy!" class="animalimage">`)
    }
    else {
        $('#animal-image').append(`<h2>OH NO!</h2><br/><p>There was a problem with your request, specifically: ${responseJson.message}. Try again later, or <a href="https://www.ecosia.org/images?q=cute+dog+pictures" target="_blank">click here</a> to see some very good boys!.</p>`)
    }
}

function showCatImage(responseJson) {
    $('#animal-image').empty();
    $('#animal-image').append(`<img src=${responseJson.file} alt="a very cute kitty!" class="animal-image">`);
}

function noEntry(media) {
    $('#media-recommendation').empty();
    if (media == 'book') {
        $('#media-recommendation').append('<h2>Since you did not enter a genre...</h2><p>My favorite book is The Republic of Thieves! Read it <a href="https://readanybook.com/ebook/the-republic-of-thieves-565249">here</a>!</p>');
    }
    else if (media == 'show') {
        $('#media-recommendation').append('<h2>Since you did not enter a genre...</h2><p>My favorite show is Adventure Time! Watch it on Netflix!</p><p>Or, check out my favorite independent animator\'s newest pilot <a href="https://www.youtube.com/watch?v=Zlmswo0S0e0">here</a>!</p>');
    }    
}

function showBookRecommendation(responseJson) {
    console.log(responseJson)
    $('#media-recommendation').empty();
    let numWorks = responseJson.works.length - 1
    let randomWork = Math.floor((Math.random() * numWorks))
    $('#media-recommendation').append(`<h2>${responseJson.works[randomWork].title}</h2><p>Written by ${responseJson.works[randomWork].authors[0].name}</p><p>Read it <a href="https://openlibrary.org/search?q=${responseJson.works[randomWork].title}&mode=everything">here</a>!</p>`);
}

function showShowRecommendation(responseJson) {
    $('#media-recommendation').empty();
    console.log(responseJson);
    let numWorks = responseJson.results.length - 1
    let randomWork = Math.floor((Math.random() * numWorks))
    $('#media-recommendation').append(`<h2>${responseJson.results[randomWork].title}</h2><img src="${responseJson.results[randomWork].image_url}"><p>More info and videos available <a href="${responseJson.results[randomWork].url}">here</a>!`);
}

function showRecipe(responseJson) {
    $('#food-recommendation').empty();
    $('#food-recommendation').append(`<h2>${responseJson.meals[0].strMeal}</h2><img src="${responseJson.meals[0].strMealThumb}"><p>Find the video tutorial <a href="${responseJson.meals[0].strYoutube}">here</a>!</p>`);
}

function noRecipe() {
    $('#food-recommendation').empty();
    $('#food-recommendation').append('<p>Fine. You don\'t want a recipe?</p><br/><iframe src="https://giphy.com/embed/5D44HsQatBVvO" width="480" height="271" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/angry-mad-hungry-5D44HsQatBVvO">via GIPHY</a></p>');
}

function showJoke(responseJson) {
    $('#joke-container').empty();
    $('#joke-container').append(`<h2>Here is a joke for you!</h2><p>${responseJson.setup}</p><p>${responseJson.delivery}</p>`);
}

function noJoke() {
    $('#joke-container').empty();
    $('#joke-container').append('<p>Seriously? Who doesn\'t like jokes??</p><iframe src="https://giphy.com/embed/12fWLm0gSY8kJa" width="480" height="320" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/robert-downey-jr-iron-man-jon-favreau-12fWLm0gSY8kJa">via GIPHY</a></p>');
}

function getResults(animal, mediaType, mediaGenre, recipe, joke) {
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
    if (mediaGenre == '') {
        noEntry(mediaType);
    }
    else if (mediaType == 'book') {
        const url = 'http://openlibrary.org/subjects/' + mediaGenre + '.json'
        fetch(url)
        .then(response => {
        if (response.status == 200) {
            return response.json();
        }
        else {
            throw new Error(response.message);
        }
        })
        .then(responseJson => showBookRecommendation(responseJson))
        .catch(err => showError(err))
    }
    else if (mediaType == 'show') {
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
            throw new Error(response.message);
        }
        })
        .then(responseJson => showJoke(responseJson))
        .catch(err => showError(err))
    }
    else if (joke == 'no') {
        noJoke();
    }
    
}

function formSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        $('.preferences-form-container').addClass('hidden');
        $('.results-container').addClass('hidden');
        $('.error-container').empty().addClass('hidden');
        let animalPref = $('input[name="animal"]:checked').val();
        let mediaPref = $('input[name="consumable-media"]:checked').val();
        let mediaGenre = $('#genre').val().toLowerCase().replace(' ', '+');
        let recipePref = $('input[name="food"]:checked').val();
        let jokePref = $('input[name="joke"]:checked').val();
        getResults(animalPref, mediaPref, mediaGenre, recipePref, jokePref);
    });
}

$(formSubmit());