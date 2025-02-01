function getBookTemplate(bookIndex, bookPrice) {
    return `                <div class="book top_bottom_padding">
          <h2 class="book_name top_bottom_padding">
            ${books[bookIndex].name}
          </h2>
          <div class="book_icon_container">
            <img src="./assets/icons/buch.png" alt="Book" class="book_icon" />
          </div>
          <div class="book_details">
            <div class="price_like">
              <div class="price">${bookPrice}</div>
              <div class="like" onclick="changeLikeBtn(${bookIndex})">
                <span id="${bookIndex}bookLikes">${books[bookIndex].likes}</span>
                <img
                  id="${bookIndex}likeBtn"
                  class="icon icon_btn"
                  src=""
                  alt="heart"
                />
              </div>
            </div>
            <table>
              <tr>
                <td>Author</td>
                <td>: ${books[bookIndex].author}</td>
              </tr>
              <tr>
                <td>Erscheinungsjahr</td>
                <td>: ${books[bookIndex].publishedYear}</td>
              </tr>
              <tr>
                <td>Genre</td>
                <td>: ${books[bookIndex].genre}</td>
              </tr>
            </table>
          </div>
          <div class="comments">
            <h3 class="comments_headline">Kommentare:</h3>
            <div class="user_comments" id="${bookIndex}userComments">
            </div>
          </div>
          <div class="comment_input">
            <input
              id="${bookIndex}inputUser"
              class="input_user"
              type="text"
              placeholder="Name"
            />
            <input
              id="${bookIndex}inputComment"
              class="input_comment"
              type="text"
              placeholder="Kommentar..."
            />
            <img
              onclick="addBookComment(${bookIndex})"
              src="./assets/icons/mail-senden.png"
              alt="send"
              class="icon icon_btn"
            />
          </div>
        </div>

`
}

function getUserCommentsTemplate(bookIndex, commentIndex) {
  return `<table>
               <tr class="top_bottom_padding">
                  <td class="user">[${books[bookIndex].comments[commentIndex].name}]</td>
                  <td class="comment">: ${books[bookIndex].comments[commentIndex].comment}</td>
                </tr>
                 </table>`
}