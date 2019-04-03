const API_KEY = 'put here your API key';
var books_container = document.querySelector('#books');

var books = [];

const getBook = async e => {
  e.preventDefault();

  const titleInput = document.querySelector('#title').value;
  books_container.innerHTML = '';
  books = [];
  try {
    const api_call = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${titleInput}&maxResults=30&key=${API_KEY}`
    );

    const data = await api_call.json();

    if (titleInput) {
      data.items.forEach((element, i) => {
        books.push({
          image: data.items[i].volumeInfo.imageLinks.thumbnail,
          title: data.items[i].volumeInfo.title,
          description: data.items[i].volumeInfo.description,
        });
      });

      console.log(books);

      books.forEach((element, i) => {
        if (books[i].description == undefined) {
          var html = `<div class="book_element"><p><img src="${
            books[i].image
          }"</img></p><p class="highlight">${
            books[i].title
          }</p><p class="desc"><span class="highlight">Description:</span> No Description</p></div>`;
        } else {
          var html = `<div class="book_element"><p><img src="${
            books[i].image
          }"</img></p><p class="highlight">${
            books[i].title
          }</p><p class="desc"><span class="highlight">Description:</span> ${books[
            i
          ].description.substr(0, 100)}</p></div>`;
        }

        books_container.innerHTML += html;
      });
    }
  } catch (error) {
    console.log(error);
    alert(
      'Try diffrent title, propably this one is not available in database yet. :C'
    );
  }

  document.getElementById('title').value = '';
};

const form = document
  .querySelector('#form')
  .addEventListener('submit', getBook);
