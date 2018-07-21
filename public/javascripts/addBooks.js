
// TEST FUNCTION TO SEE IF GOOGLE BOOKS / GOODREADS APIS ARE WORKING

$('#get-book').click(function(){
  event.preventDefault();
  var searchTerms = document.getElementById('searchInput');
  var searchTermsEdited = searchTerms.value.replace(/\s/g, "+");
  var url = `https://www.googleapis.com/books/v1/volumes?q=${searchTermsEdited}&maxResults=40&orderBy:relevance`;
  $('.bookresults-container').empty();
  console.log(url);
  axios.get(`${url}`)
    .then((theBooks)=>{
      console.log(theBooks);
      for (let i=0; i < theBooks.data.items.length; i++){
        if (theBooks.data.items[i].volumeInfo.imageLinks && theBooks.data.items[i].volumeInfo.title && theBooks.data.items[i].volumeInfo.authors && theBooks.data.items[i].id && theBooks.data.items[i].volumeInfo.averageRating && theBooks.data.items[i].volumeInfo.pageCount && theBooks.data.items[i].volumeInfo.description){
          const bookDescription = theBooks.data.items[i].volumeInfo.description;
          const bookCard = `
            <div class="book-card">
            <img class="card-img" src="${theBooks.data.items[i].volumeInfo.imageLinks.thumbnail}">
            <h2 class="card-title">${theBooks.data.items[i].volumeInfo.title}</h2>
            <p><b>Author: </b><span class="card-author">${theBooks.data.items[i].volumeInfo.authors[0]}</span></p>
            <br><b>Book ID: </b><span class="card-bookID">${theBooks.data.items[i].id}</span>
            <br><b>Rating: </b><span class="card-rating">${theBooks.data.items[i].volumeInfo.averageRating}</span> out of 5
            <br><b>Pages: </b><span class="card-pagecount">${theBooks.data.items[i].volumeInfo.pageCount}</span>
            <p><b>Description: </b><span class="card-description">${bookDescription.substring(0,300)}</span>...</p>
            <button class="select-book">CHOOSE THIS BOOK</button>
            </div>
          `;
          $('.bookresults-container').append(bookCard);
        }
      }
    })
    .catch((err)=>{
      console.log(err);
    });
});
$(document).on('click','.select-book',function(e){
  function turnCollectionToArray(htmlCollection) {
    var arr = [].slice.call(htmlCollection);
    return arr;
  }
  
  const theButton = $(this);
  const thisBook = $(this).parent();
  turnCollectionToArray(thisBook);
 
  // WORKING CONSOLE.LOGS TO ACCESS INFO INSIDE THE CARDS
  // console.log(thisBook);
  // console.log( $(thisBook).find('.card-img')[0].src );
  // console.log( $(thisBook).find('.card-title')[0].innerHTML );
  // console.log($(thisBook).find('.card-author')[0].innerHTML);
  // console.log($(thisBook).find('.card-pagecount')[0].innerHTML);
  // console.log($(thisBook).find('.card-description')[0].innerHTML);

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
  // SETTING THE 'BOOKID' HIDDEN INPUT TO THIS VALUE FORM THE API RESPONSE LIST
  $('#bookID').val(                   $(thisBook).find('.card-bookID')[0].innerHTML );
  // SETTING THE 'BOOKRATING' HIDDEN INPUT TO THIS VALUE FORM THE API RESPONSE LIST
  $('#bookRating').val(               $(thisBook).find('.card-rating')[0].innerHTML );

  
  $('.btn-success').text('CHOOSE THIS BOOK');
  $('.btn-success').removeClass('btn-success');

  $(this).addClass('btn-success');
  $(this).text('BOOK SELECTED');

  return false;
});