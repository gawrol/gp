import { createBook, deleteBook } from './crudBook.js';

function blueprint(el, query=false) {
    // Create book li element
    let book = document.createElement('li');
    book.id = el.id;
    book.classList.add('list-group-item', 'list-group-item-action');
    // Div for reading books
    let readDiv = document.createElement('div');
    readDiv.id = 'read' + el.id;

        // Thumbnail 
        let image = document.createElement('IMG');
        let imageUrl = new String();
        if (query) {
            if (el.volumeInfo.imageLinks == undefined) {
            }
            else {
                image.src = el.volumeInfo.imageLinks.thumbnail;
                imageUrl = image.src;
            }
        } else {
            image.src = mediaUrl+el.volumeInfo.imageLinks.thumbnail;
        }
        image.alt = 'thumbnail';
        image.width = '100';
        image.classList.add('img-thumbnail', 'float-end');
        readDiv.appendChild(image);

        // Title text
        let textTitle = document.createElement('p');
        textTitle.id = 'p' + el.id;
        textTitle.innerHTML = el.volumeInfo.title;
        readDiv.appendChild(textTitle);
        // Authors dict
        let authors = new Array();
        let authorsComma = new String();
        if (el.volumeInfo.authors == undefined) {
            authorsComma = 'unknown';
        } else {
            const authorsL = el.volumeInfo.authors.length;
            if (authorsL > 0) {
                for (let i=0; i<authorsL; i++) {
                    authors[i] = el.volumeInfo.authors[i];
                    authorsComma += el.volumeInfo.authors[i];
                    if (i != authorsL-1) {
                        authorsComma += ', ';
                    }
                }
            }
        }
        
        let textAuthors = document.createElement('p');
        textAuthors.id = 'd' + el.id;
        textAuthors.innerHTML = authorsComma;
        readDiv.appendChild(textAuthors);

        let form = document.createElement('form');
        let button = document.createElement('button');
        button.type = 'button'
        // Button to add query book to local books
        if (query) {
            button.innerHTML = 'Add';
            button.classList.add('btn', 'btn-primary');
            const formData = new FormData();
            formData.append('id', el.id);
            formData.append('volumeInfo.title', el.volumeInfo.title);
            formData.append('volumeInfo.authors', JSON.stringify(authors));
            formData.append('volumeInfo.imageLinks.thumbUrl', imageUrl);
            button.addEventListener('click', function() {
                createBook(null, formData);
            })
        }
        // Button to delete local book
        if (!query) {
            button.innerHTML = 'Del';
            button.classList.add('btn', 'btn-danger', 'delete');
            const formData = new FormData();
            formData.append('id', el.id);
            button.addEventListener('click', function() {
                deleteBook(null, formData);
            })
        }
        form.appendChild(button);
        // readDiv.appendChild(button);
        readDiv.appendChild(form);

    // Add read div to book li
    book.appendChild(readDiv);

    return book;
}

export { blueprint };