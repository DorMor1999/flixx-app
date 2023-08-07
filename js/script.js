const global = {
    currentPage: window.location.pathname
};

function createCardMovie(data){
    //creating the card div
    const div = document.createElement('div');
    div.classList.add('card');

    //creating img
    const img = document.createElement('img');
    img.classList.add("card-img-top");
    img.alt = data.title;
    if(data.poster_path){
        img.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    }
    else{
        img.src = "images/no-image.jpg";
    }
    //fill the card with all the details
    div.innerHTML = `
        <a href="movie-details.html?id=${data.id}">
            ${img.outerHTML}
        </a>
        <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">
                <small class="text-muted">Release: ${data.release_date}</small>
            </p>
        </div>
    `;
    return div
}

//display 20 most popular movies
async function displayPopularMovies(){
    const data = await fetchAPIData("movie/popular");
    const movies = data.results;  
    movies.forEach((movie) => {
        const div = createCardMovie(movie);
        // adding the div to the list
        document.querySelector('#popular-movies').appendChild(div);
    })
}

function createCardShow(data){
    //creating the card div
    const div = document.createElement('div');
    div.classList.add('card');

    //creating img
    const img = document.createElement('img');
    img.classList.add("card-img-top");
    img.alt = data.title;
    if(data.poster_path){
        img.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    }
    else{
        img.src = "images/no-image.jpg";
    }
    //fill the card with all the details
    div.innerHTML = `
        <a href="tv-details.html?id=${data.id}">
            ${img.outerHTML}
        </a>
        <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">
                <small class="text-muted">Air Date: ${data.first_air_date}</small>
            </p>
        </div>
    `;
    return div
}

//display 20 most popular tv shows
async function displayPopularShows(){
    const data = await fetchAPIData("tv/popular");
    const shows = data.results;  
    shows.forEach((show) => {
        const div = createCardShow(show);
        // adding the div to the list
        document.querySelector('#popular-shows').appendChild(div);
    })
}

//fetch data from TMDB API
async function fetchAPIData(endpoint){
    const API_KEY = 'ce6dfbc3cf462594d189f2dff528ba8d';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();
    
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&?language=en-US`);
    const data = await response.json();

    hideSpinner();

    return data;
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

//Highlight active link
function highlightActiveLink(){
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active');
        }
    });
}  

// Init app
function init(){
    switch(global.currentPage) {
        case "/":
        case "/index.html":    
            displayPopularMovies();
            break;
        case "/shows.html":
            displayPopularShows();
            break;
        case "/movie-details.html":
            console.log("movie-details");
            break;
        case "/tv-details.html":
            console.log("tv-details");
            break;
        case "/search.html":
            console.log("search");
            break;        
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
