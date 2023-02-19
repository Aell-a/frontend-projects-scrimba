let watchlistedLocalStorage = JSON.parse(localStorage.getItem("Watchlist"))

if(watchlistedLocalStorage == []) {
    localStorage.removeItem("Watchlist")
} else {
    renderMovies(watchlistedLocalStorage)
}

function renderMovies(moviesArray) {
        let movieHtml = ""
        for (movie of moviesArray) {
            movieHtml += `
            <div class="movie-box">
                    <a href=${"https://www.imdb.com/title/" + movie.id}>
                        <img src=${movie.poster} class="movie-poster" />
                    </a>
                    <div class="movie-details">
                        <div class="title">
                            <h4 class="lol">${movie.title}</h4><img src="./image/star.png" /><p>${movie.rating}</p>
                        </div>
                        <div class="info">
                            <p>${movie.duration}</p>
                            <p>${movie.genre}</p>
                            <div id=${movie.id} class="watchlist-btn">
                                <img src="./image/remove.png"/>
                                <a>Remove</a>
                            </div>
                        </div>
                        <div class="plot">
                            <p>${movie.plot}</p>
                        </div>
                    </div>
                </div>
            `
        }
        document.getElementById("main").innerHTML = movieHtml
        for (movie of moviesArray) {
            const watchlistBtn = document.getElementById(movie.id)
            watchlistBtn.addEventListener("click", () => {
                removeFromWatchlist(watchlistBtn.id)
            })
        }
}

function removeFromWatchlist(id) {
    watchlistedLocalStorage = watchlistedLocalStorage.filter((movie) => {
        return movie.id !== id 
    })
    localStorage.setItem("Watchlist", JSON.stringify(watchlistedLocalStorage))
    if(watchlistedLocalStorage !== []) {
        renderMovies(watchlistedLocalStorage)
    } else {
        localStorage.removeItem("Watchlist")
    }
}

/* function renderNoContent() {
    document.getElementById("main").innerHTML = `
        <div id="content" class="no-content">
            <h3 class="no-content-text">Your watchlist is looking a little empty...</h3>
            <a href="./index.html" class="no-content-link">
                <img src="./image/plus.png" />
                <p>Let's add some movies!</p>
            </a>
        </div>
    `
} */