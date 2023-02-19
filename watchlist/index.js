// api-key = e97385ca

const searchBtn = document.getElementById("search-btn")
const searchBox = document.getElementById("searchbox")
const searchForm = document.getElementById("search-form")

const watchlistLocalStorage = JSON.parse(localStorage.getItem("Watchlist"))

if(watchlistLocalStorage){
    watchlisted = watchlistLocalStorage
} else {
    watchlisted = []
}

async function searchMovie(title) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=e97385ca&s=${title}`)
    const data = await res.json()
    if(!data.Search) {
        renderNotFound()
    } else {
        const movies = data.Search.length > 5 ? data.Search.slice(0,5) : data.Search
        const ids = movies.map((movie) => {
        return movie.imdbID
        })
        const moviesArray = []
        for(let i=0; i<ids.length; i++) {
            const res = await fetch(`https://www.omdbapi.com/?apikey=e97385ca&i=${ids[i]}`)
            const data = await res.json()
            const movie = {
                id: data.imdbID,
                title: data.Title,
                poster: data.Poster,
                rating: data.Ratings[0].Value.slice(0,3),
                duration: data.Runtime,
                genre: data.Genre.split(",", 3),
                plot: data.Plot
            }
            moviesArray.push(movie)
        }
        renderMovies(moviesArray)
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const searchData = new FormData(searchForm)
    const key = searchData.get('searchbox')
    searchForm.reset()
    searchMovie(key)
})

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
                            <img src="./image/plus.png"/>
                            <a>Watchlist</a>
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
            addToWatchList(watchlistBtn.id)
            watchlistBtn.innerHTML = ""
        })
    }
}

function renderNotFound() {
    document.getElementById("main").innerHTML = `
        <div class="not-found">
            <p>Unable to find what you're looking for. Please try another search.</p>
        </div>
    `
}

async function addToWatchList(id) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=e97385ca&i=${id}`)
    const data = await res.json()
    const movie = {
        id: data.imdbID,
        title: data.Title,
        poster: data.Poster,
        rating: data.Ratings[0].Value.slice(0,3),
        duration: data.Runtime,
        genre: data.Genre.split(",", 3),
        plot: data.Plot
    }
    watchlisted.push(movie)
    localStorage.setItem("Watchlist", JSON.stringify(watchlisted))
}