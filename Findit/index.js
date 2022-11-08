import reddit from "./redditapi";

const searchFrom = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//form event
searchFrom.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = searchInput.value;
    const sortBY = document.querySelector('input[name="sortby"]:checked').value;
    const searchLimit = document.getElementById('limit').value;

    if(searchTerm === ''){
        showMessage('Please add a search term', 'alert-danger');
    }

    //clear input
    searchInput.value = '';

    //search reddit
    reddit.search(searchTerm, searchLimit, sortBY )
        .then(result => {
            let output = '<div class="card-columns">';
            //loop through posts
            result.forEach(post => {
                const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
                
                output += `
                    <div class="card">
                        <img src="${image}" class="card-img-top" alt="Card image-cap">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${truncateText(post.selftext, 100)}</p>
                            <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
                            <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                            <span class="badge badge-dark">Score: ${post.score}</span>
                        </div>
                    </div>
                `;
            })
            output += '</div>';
            //display post
            document.getElementById('results').innerHTML = output;
        })
})

//show message
const showMessage = (message, className) => {
    //create a div
    const div = document.createElement('div');
    //attach class to div
    div.className = `alert ${className}`;
    //attcah text to div
    div.appendChild(document.createTextNode(message));
    //get parent and after elements
    const searchContainer = document.getElementById('search-container');
    const search = document.getElementById('search');
    //attach div before search
    searchContainer.insertBefore(div, search);

    //remove message after 3ml
    setTimeout(() => document.querySelector('.alert').remove(),3000);
}

//truncate text
const truncateText = (text, limit) => {
    const shortened = text.indexOf(' ', limit);

    if(shortened == -1) return text;

    return text.substring(0, shortened); 
}