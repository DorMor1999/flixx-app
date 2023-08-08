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
    img.alt = data.name;
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

function createCardMovieDitails(data){
    //create a div
    const div = document.createElement('div');
    console.log(data);

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

    div.innerHTML = `
    <div class="details-top">
    <div>
      ${img.outerHTML}
    </div>
    <div>
      <h2>${data.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${data.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${data.release_date}</p>
      <p>
        ${data.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${data.genres.map((gener) => `<li>${gener.name}</li>`).join('')}
      </ul>
      <a href="${data.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(data.budget)}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(data.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${data.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${data.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
        ${data.production_companies.map((company) => `<span>${company.name}</span>`).join(", ")}
    </div>
  </div>
    `;
    return div;
}

//display backdrop on details pages
function displayBackgroundImage(type, backgroundPath){
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.2';


    if(type === 'movie'){
        document.querySelector('#movie-details').appendChild(overlayDiv);
    }
    else{
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}

//display movies details
async function displayMovieDetails(){
    const movieId = window.location.search.split('=')[1];

    const movie = await fetchAPIData(`movie/${movieId}`);

    //overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path);

    const div = createCardMovieDitails(movie);

    document.querySelector('#movie-details').appendChild(div);
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

function addCommasToNumber(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            displayMovieDetails();
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
