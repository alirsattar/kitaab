
console.log('JS FILE SUCCESSFULLY LINKED');

// TEST FUNCTION TO SEE IF GOOGLE BOOKS / GOODREADS APIS ARE WORKING

$('#get-book').click(function(){

  var searchTerms = document.getElementById('searchInput');

  var searchTermsEdited = searchTerms.value.replace(/\s/g, "+");

  var url = `https://www.googleapis.com/books/v1/volumes?q=${searchTermsEdited}&maxResults=40&orderBy:relevance`;

  console.log(url);
  $('#books-container').empty();

  axios.get(`${url}`)
    .then((theBooks)=>{
      console.log(theBooks);
      for (let i=0; i < theBooks.data.items.length; i++){
        if(theBooks.data.items[i].volumeInfo.imageLinks.thumbnail && theBooks.data.items[i].volumeInfo.authors && theBooks.data.items[i].volumeInfo.description){
  
          const bookDescription = theBooks.data.items[i].volumeInfo.description;

          const bookCard = `
          
          <div class="card">
          <img src="${theBooks.data.items[i].volumeInfo.imageLinks.thumbnail}">
          <h2>${theBooks.data.items[i].volumeInfo.title}</h2>
          <h3 id="authors">${theBooks.data.items[i].volumeInfo.authors[0]}</h3>
          <p>Description: ${bookDescription.substring(0,300)}...</p>
          </div>
          `;

          // const newBook = `
          //   <div class="book-card">
          //   <p>#${i}
          //   <img src="${theBooks.data.items[i].volumeInfo.imageLinks.thumbnail}">
          //   <p><h1>Title:&nbsp&nbsp&nbsp${theBooks.data.items[i].volumeInfo.title}</h1>
          //   <p><h2 id="authors">Authors:&nbsp&nbsp&nbsp${theBooks.data.items[i].volumeInfo.authors[0]}</h2></p>
          //   <p>Description: ${theBooks.data.items[i].volumeInfo.description}</p>
          //   </div>
          //   `;
          $('.container').append(bookCard);
        }
      }
    });
});