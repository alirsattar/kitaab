
console.log('JS FILE SUCCESSFULLY LINKED');

// TEST FUNCTION TO SEE IF GOOGLE BOOKS / GOODREADS APIS ARE WORKING

$('#get-book').click(function(){

  event.preventDefault();

  var searchTerms = document.getElementById('searchInput');

  var searchTermsEdited = searchTerms.value.replace(/\s/g, "+");

  var url = `https://www.googleapis.com/books/v1/volumes?q=${searchTermsEdited}&maxResults=40&orderBy:relevance`;

  console.log(url);
  $('.container').empty();

  axios.get(`${url}`)
    .then((theBooks)=>{
      console.log(theBooks);
      for (let i=0; i < theBooks.data.items.length; i++){
        if(theBooks.data.items[i].volumeInfo.imageLinks.thumbnail && theBooks.data.items[i].volumeInfo.authors && theBooks.data.items[i].volumeInfo.description){
  
          const bookDescription = theBooks.data.items[i].volumeInfo.description;

          const bookCard = `
          
            <div class="card">
            <img class="card-img" src="${theBooks.data.items[i].volumeInfo.imageLinks.thumbnail}">
            <h2 class="card-title">${theBooks.data.items[i].volumeInfo.title}</h2>
            <p><b>Author: </b><span class="card-author">${theBooks.data.items[i].volumeInfo.authors[0]}</span></p>
            <p><b>Pages: </b><span class="card-pagecount">${theBooks.data.items[i].volumeInfo.pageCount}</span></p>
            <p><b>Description: </b><span class="card-description">${bookDescription.substring(0,300)}</span>...</p>
            <button class="select-book">CHOOSE THIS BOOK</button>
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

$(document).on('click','.select-book',function(e){

  e.preventDefault();

  function turnCollectionToArray(htmlCollection) {
    var arr = [].slice.call(htmlCollection);
    return arr;
  }

  const thisBook = e.currentTarget.parentElement;
  
  turnCollectionToArray(thisBook);

  // WORKING CONSOLE.LOGS TO ACCESS INFO INSIDE THE CARDS
  
  // console.log(thisBook);
  // console.log( $(thisBook).find('.card-img')[0].src );
  // console.log( $(thisBook).find('.card-title')[0].innerHTML );
  // console.log($(thisBook).find('.card-author')[0].innerHTML);

  console.log($(thisBook).find('.card-pagecount')[0].innerHTML);


  
  // <input id="bookAuthor"type="hidden" name="bookAuthor" value="">
  
  // <input id="bookPagecount"type="hidden" name="bookPagecount" value="">
  
  // <input id="bookDescription"type="hidden" name="bookDescription" value="">
  
  
  // SETTING THE 'THUMBNAIL URL' HIDDEN INPUT TO THIS VALUE FROM THE API RESPONSE LIST
  $('#bookThumbnail').val(            $(thisBook).find('.card-img')[0].src );

  // SETTING THE 'TITLE' HIDDEN INPUT TO THIS VALUE FORM THE API RESPONSE LIST
  $('#bookTitle').val(                $(thisBook).find('.card-title')[0].innerHTML );

  // SETTING THE 'AUTHOR' HIDDEN INPUT TO THIS VALUE FORM THE API RESPONSE LIST
  $('#bookAuthor').val(               $(thisBook).find('.card-author')[0].innerHTML );

  // SETTING THE 'PAGECOUNT' HIDDEN INPUT TO THIS VALUE FORM THE API RESPONSE LIST
  $('#bookPagecount').val(            $(thisBook).find('.card-pagecount')[0].innerHTML );

  // SETTING THE 'DESCRIPTION' HIDDEN INPUT TO THIS VALUE FORM THE API RESPONSE LIST
  $('#bookDescription').val(          $(thisBook).find('.card-description')[0].innerHTML );

  return false;

});