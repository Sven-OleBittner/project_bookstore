let newBookComments = [];

function renderBooks() {
  let allBooksRef = document.getElementById("allBooks");
  allBooksRef.innerHTML = "";

  for (let bookIndex = 0; bookIndex < books.length; bookIndex++) {
    dataFromStorage(bookIndex);
    let bookPrice = books[bookIndex].price
      .toFixed(2)
      .replace(".", ",")
      .concat("€");
    allBooksRef.innerHTML += getBookTemplate(bookIndex, bookPrice);
    renderLikeBtn(bookIndex);
    renderBookComments(bookIndex);
  }
}

function renderBookComments(bookIndex) {
  let userCommentsRef = document.getElementById(bookIndex + "userComments");
  userCommentsRef.innerHTML = "";

  for (
    let commentIndex = books[bookIndex].comments.length - 1;commentIndex >= 0;commentIndex--) {
    userCommentsRef.innerHTML += getUserCommentsTemplate(bookIndex,commentIndex);
  }
}

function renderBookLikes(bookIndex) {
  let bookLikesRef = document.getElementById(`${bookIndex}bookLikes`);
  bookLikesRef.innerHTML = "";
  bookLikesRef.innerHTML = `${books[bookIndex].likes}`;
}

function renderLikeBtn(bookIndex) {
  let likeUnlike = document.getElementById(`${bookIndex}likeBtn`);

  if (books[bookIndex].liked === false) {
    likeUnlike.src = "./assets/icons/liebe.png";
  } else {
    likeUnlike.src = "./assets/icons/herz.png";
  }
}

function changeLikeBtn(bookIndex) {
  let likeUnlike = document.getElementById(`${bookIndex}likeBtn`);

  if (books[bookIndex].liked === false) {
    likeUnlike.src = "./assets/icons/herz.png";
    books[bookIndex].likes++;
    books[bookIndex].liked = true;
  } else if (books[bookIndex].liked === true) {
    likeUnlike.src = "./assets/icons/liebe.png";
    books[bookIndex].likes--;
    books[bookIndex].liked = false;
  }
  dataToStorage(bookIndex);
  renderLikeBtn(bookIndex);
  renderBookLikes(bookIndex);
}

function addBookComment(bookIndex) {
  let userValue = document.getElementById(bookIndex + "inputUser").value;
  let commentValue = document.getElementById(bookIndex + "inputComment").value;

  if (userValue != "" && commentValue != "") {
    let commentObj = { name: `"${userValue}"`, comment: `"${commentValue}"` };
    books[bookIndex].comments.push(commentObj);
    renderBookComments(bookIndex);
    dataToStorage(bookIndex);
    document.getElementById(bookIndex + "inputUser").value = "";
    document.getElementById(bookIndex + "inputComment").value = "";
  }
}

function dataToStorage(bookIndex) {
  localStorage.setItem(`${bookIndex}comments`,JSON.stringify(books[bookIndex].comments));
  localStorage.setItem(`${bookIndex}likes`,JSON.stringify(books[bookIndex].likes));
  localStorage.setItem(`${bookIndex}liked`,JSON.stringify(books[bookIndex].liked));
}

function dataFromStorage(bookIndex) {
  let commentData = JSON.parse(localStorage.getItem(`${bookIndex}comments`));
  let likesData = JSON.parse(localStorage.getItem(`${bookIndex}likes`));
  let likedData = JSON.parse(localStorage.getItem(`${bookIndex}liked`));
  if (commentData != null) {
    books[bookIndex].comments = commentData;
    books[bookIndex].likes = likesData;
    books[bookIndex].liked = likedData;
  }
}
