const url = 'https://online-movie-database.p.rapidapi.com/v2/search-advance?country=US&language=en-US';
const options = {
    method: 'POST',
    headers: {
        'x-rapidapi-key': 'd8578f9e79mshef05f2bf9016405p13dce4jsnff019c72a86c',
        'x-rapidapi-host': 'online-movie-database.p.rapidapi.com',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        first: 10, // Limit the results to 10 movies
        sort: { sortBy: 'USER_RATING_COUNT', sortOrder: 'DESC' },
        allGenreIds: ['Action', 'Drama', 'Comedy'],
        releaseDateRange: { start: '2000-01-01', end: '2024-12-31' },
        aggregateRatingRange: { min: 7 },
        ratingsCountRange: { min: 10000 },
    }),
};

const movieList = document.getElementById('movieList');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

// Fetch movies and display them
async function fetchMovies() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data); // Log to understand response structure
        displayMovies(data.results); // Update to match actual response
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Display movies dynamically
function displayMovies(movies) {
    movieList.innerHTML = ''; // Clear previous results
    if (!movies || movies.length === 0) {
        movieList.innerHTML = '<p>No movies found.</p>';
        return;
    }

    movies.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.poster || 'placeholder.jpg'}" alt="${movie.title}">
            <div class="details">
                <h2>${movie.title || 'Untitled'}</h2>
                <p>Year: ${movie.year || 'N/A'}</p>
                <p>Rating: ${movie.rating || 'N/A'}</p>
            </div>
        `;
        movieList.appendChild(movieCard);
    });
}

// Search functionality
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        options.body = JSON.stringify({
            ...JSON.parse(options.body),
            searchQuery: query,
        });
        fetchMovies();
    }
});

// Fetch movies on page load
fetchMovies();