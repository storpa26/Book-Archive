
// --- these two function will show how many results are found --- 

const results = () => {
    loadSpinner('block');
    const getElement = document.getElementById('input-field');
    const userInput = getElement.value;
    const url = `https://openlibrary.org/search.json?q=${userInput}`
    fetch(url)
        .then(res => res.json())
        .then(data => showResultCount(data))

}

const showResultCount = count => {
    const resultCount = document.createElement('p');
    resultCount.classList.add('text-center');
    resultCount.classList.add('py-1');
    resultCount.innerText = `showing ${count.docs.length} of (${count.numFound} results)`;
    const searchResult = document.getElementById('total-result-container');
    searchResult.textContent = '';
    searchResult.appendChild(resultCount);
}

// ---------- done --------- 


// fetching again to show the book info

const getInput = () => {
    const getElement = document.getElementById('input-field');
    const userInput = getElement.value;
    const url = `https://openlibrary.org/search.json?q=${userInput}`
    fetch(url)
        .then(res => res.json())
        .then(data => showBook(data.docs))
}

//function to display the search results

const showBook = data => {
    // two error messages
    const getUserInput = document.getElementById('input-field');

    if (data.length == 0 && getUserInput.value != '') {
        alert('No results found');
        loadSpinner('none');
    } else if (getUserInput.value == '') {
        alert("Please enter a valid keyword");
    }
    // -------- error message done -----------

    //setting the location of default img in a variable
    const noImg = `images/no_image.jpeg`;
    const getElement = document.getElementById('book-container');
    getElement.textContent = '';
    data.forEach(book => {
        //setting the book cover urls in a variable
        const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 pt-3 m-1 bg-light border rounded">
        <div class="bg-dark mx-auto border rounded">
            <img class="img-fluid p-1" src="${(book.cover_i ? imgUrl : noImg)}" class="card-img-top" height='280' width='180' alt="...">
            </div>

            <div class="card-body bg-white mt-3 pt-0" >
            <hr>

                <h3 class="fw-bold">${book.title}</h3>
                <h5>Author : ${book.author_name}</h5>
                <p>Publisher : ${book.publisher.slice(0, 5)}</p>
                <p>Published : ${book.first_publish_year}</p>
            </div>
            </div>
        `
        getElement.appendChild(div);

    });
    loadSpinner('none');

}
// --------- done ------------ 


// spinner 
const loadSpinner = displayStyle => {
    const getElement = document.getElementById('spinner');
    getElement.style.display = displayStyle;
}

