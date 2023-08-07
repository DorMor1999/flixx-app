const global = {
    currentPage: window.location.pathname
};

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
            console.log('home');
            break;
        case "/shows.html":
            console.log("shows");
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
