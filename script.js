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
    let commentIndex = books[bookIndex].comments.length - 1;
    commentIndex >= 0;
    commentIndex--
  ) {
    userCommentsRef.innerHTML += getUserCommentsTemplate(
      bookIndex,
      commentIndex
    );
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
  dataToStorage(newBookComments, bookIndex);
  renderLikeBtn(bookIndex);
  renderBookLikes(bookIndex);
}

function addBookComment(bookIndex) {
  let userRef = document.getElementById(bookIndex + "inputUser");
  let commentRef = document.getElementById(bookIndex + "inputComment");
  let userValue = userRef.value;
  let commentValue = commentRef.value;

  if (userValue != "" && commentValue != "") {
    let commentObj = { name: `"${userValue}"`, comment: `"${commentValue}"` };
    newBookComments.push(commentObj);
    books[bookIndex].comments.push(commentObj);
    dataToStorage(newBookComments, bookIndex);
    renderBookComments(bookIndex);
    userRef.value = "";
    commentRef.value = "";
  }
}

function dataToStorage(newBookComments, bookIndex) {
  let likesNum = JSON.stringify(books[bookIndex].likes);
  let commentString = JSON.stringify(newBookComments);
  let likedBoolean = JSON.stringify(books[bookIndex].liked)
  localStorage.setItem(`${bookIndex}comments`, commentString);
  localStorage.setItem(`${bookIndex}likes`, likesNum);
  localStorage.setItem(`${bookIndex}liked`, likedBoolean);

}

function dataFromStorage(bookIndex) {
  let commentString = localStorage.getItem(`${bookIndex}comments`);
  let likesString = localStorage.getItem(`${bookIndex}likes`);
  let likedBoolean = localStorage.getItem(`${bookIndex}liked`);
  let commentData = JSON.parse(commentString);
  let likesData = JSON.parse(likesString);
  let likedData = JSON.parse(likedBoolean);

  if (commentData != null) {
    for (
      let storageIndex = 0;
      storageIndex < commentData.length;
      storageIndex++
    ) {
      books[bookIndex].comments.push(commentData[storageIndex]);
    }
    books[bookIndex].likes = likesData;
    books[bookIndex].liked = likedData;
  }
}
