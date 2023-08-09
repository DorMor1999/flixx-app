const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: 'ce6dfbc3cf462594d189f2dff528ba8d',
    apiUrl: 'https://api.themoviedb.org/3/',
  },
};

function createCardMovie(data) {
  //creating the card div
  const div = document.createElement('div');
  div.classList.add('card');

  //creating img
  const img = document.createElement('img');
  img.classList.add('card-img-top');
  img.alt = data.title;
  if (data.poster_path) {
    img.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  } else {
    img.src = 'images/no-image.jpg';
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
  return div;
}

//display 20 most popular movies
async function displayPopularMovies() {
  const data = await fetchAPIData('movie/popular');
  const movies = data.results;
  movies.forEach((movie) => {
    const div = createCardMovie(movie);
    // adding the div to the list
    document.querySelector('#popular-movies').appendChild(div);
  });
}

function createCardShow(data) {
  //creating the card div
  const div = document.createElement('div');
  div.classList.add('card');

  //creating img
  const img = document.createElement('img');
  img.classList.add('card-img-top');
  img.alt = data.name;
  if (data.poster_path) {
    img.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  } else {
    img.src = 'images/no-image.jpg';
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
  return div;
}

//display 20 most popular tv shows
async function displayPopularShows() {
  const data = await fetchAPIData('tv/popular');
  const shows = data.results;
  shows.forEach((show) => {
    const div = createCardShow(show);
    // adding the div to the list
    document.querySelector('#popular-shows').appendChild(div);
  });
}

function createCardMovieDitails(data) {
  //create a div
  const div = document.createElement('div');

  //creating img
  const img = document.createElement('img');
  img.classList.add('card-img-top');
  img.alt = data.title;
  if (data.poster_path) {
    img.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  } else {
    img.src = 'images/no-image.jpg';
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
      <a href="${
        data.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
        data.budget
      )}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
        data.revenue
      )}</li>
      <li><span class="text-secondary">Runtime:</span> ${
        data.runtime
      } minutes</li>
      <li><span class="text-secondary">Status:</span> ${data.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
        ${data.production_companies
          .map((company) => `<span>${company.name}</span>`)
          .join(', ')}
    </div>
  </div>
    `;
  return div;
}

//display movies details
async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchAPIData(`movie/${movieId}`);

  //overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = createCardMovieDitails(movie);

  document.querySelector('#movie-details').appendChild(div);
}

function createCardShowDitails(data) {
  //create a div
  const div = document.createElement('div');

  //creating img
  const img = document.createElement('img');
  img.classList.add('card-img-top');
  img.alt = data.name;
  if (data.poster_path) {
    img.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  } else {
    img.src = 'images/no-image.jpg';
  }

  div.innerHTML = `
    <div class="details-top">
    <div>
      ${img.outerHTML}
    </div>
    <div>
      <h2>${data.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${data.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Last Air Date: ${data.last_air_date}</p>
      <p>
        ${data.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${data.genres.map((gener) => `<li>${gener.name}</li>`).join('')}
      </ul>
      <a href="${
        data.homepage
      }" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number Of Episodes:</span> ${
        data.number_of_episodes
      }</li>
      <li><span class="text-secondary">Last Episode To Air:</span> ${
        data.last_episode_to_air.name
      }</li>
      <li><span class="text-secondary">Status:</span> ${data.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
        ${data.production_companies
          .map((company) => `<span>${company.name}</span>`)
          .join(', ')}
    </div>
  </div>
    `;
  return div;
}

//display movies details
async function displayShowDetails() {
  const showId = window.location.search.split('=')[1];

  const show = await fetchAPIData(`tv/${showId}`);

  //overlay for background image
  displayBackgroundImage('tv', show.backdrop_path);

  const div = createCardShowDitails(show);

  document.querySelector('#show-details').appendChild(div);
}

//display backdrop on details pages
function displayBackgroundImage(type, backgroundPath) {
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

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

//search movies/shows
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    //make request and display result
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results found', 'error');
      return;
    }

    displaytSearchResults(results);

    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Please enter a search term', 'error');
  }
}

function displaytSearchResults(results) {
  // clear previous results
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  results.forEach((result) => {
    let div;
    if (global.search.type === 'movie') {
      div = createCardMovie(result);
    } else {
      div = createCardShow(result);
    }

    document.querySelector('#search-results-heading').innerHTML = `
      <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>
    `;

    // adding the div to the list
    document.querySelector('#search-results').appendChild(div);
  });

  dispayPagination();
}

// dispay pagination for search
function dispayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;
  document.querySelector('#pagination').appendChild(div);

  //disable prev
  const prevBtn = document.querySelector('#prev');
  if (global.search.page === 1) {
    prevBtn.disabled = true;
  }

  //disable next
  const nextBtn = document.querySelector('#next');
  if (global.search.page === global.search.totalPages) {
    nextBtn.disabled = true;
  }

  //next page
  nextBtn.addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaytSearchResults(results);
  });

  //prev page
  prevBtn.addEventListener('click', async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaytSearchResults(results);
  });
}

//display slider movies
async function displaySlider() {
  const response = await fetchAPIData('movie/now_playing');
  const results = response.results;

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        </a>
        <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
        </h4>
        `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

//fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&?language=en-US`
  );
  const data = await response.json();

  hideSpinner();

  return data;
}

//make request to search
async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&?language=en-US&query=${global.search.term}&page=${global.search.page}`
  );
  const data = await response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

//Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

//show alert
function showAlert(message, className) {
  const alert = document.createElement('div');
  alert.classList.add('alert', className);
  alert.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alert);

  setTimeout(() => alert.remove(), 3000);
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Init app
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displaySlider();
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      search();
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
