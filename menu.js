// Function to add to favorites (from original code)
function addToFavorites() {
  // Implement your favorite logic here (e.g., store in localStorage or send to server)
  alert("Đã thêm vào mục yêu thích của bạn!");
}

// Get the unique identifier for this recipe page (using document title)
const recipeId = document.title.replace(/\s/g, "_").toLowerCase(); // e.g., "Bánh Flan" -> "bánh_flan"

// Function to submit a comment and rating
function submitComment() {
  const rating = document.querySelector('input[name="rating"]:checked');
  const commentText = document.getElementById("commentText").value.trim();

  if (!rating) {
    alert("Vui lòng chọn số sao để đánh giá!");
    return;
  }

  if (commentText === "") {
    alert("Vui lòng nhập bình luận của bạn!");
    return;
  }

  const newComment = {
    rating: parseInt(rating.value),
    text: commentText,
    timestamp: new Date().toLocaleString("vi-VN"), // Format date for Vietnam
  };

  // Get existing comments for THIS recipe from localStorage or initialize empty array
  const comments =
    JSON.parse(localStorage.getItem(`comments_${recipeId}`)) || [];
  comments.push(newComment);
  localStorage.setItem(`comments_${recipeId}`, JSON.stringify(comments));

  // Clear form
  rating.checked = false; // Uncheck the selected star
  document.getElementById("commentText").value = "";

  // Display updated comments
  displayComments();

  alert("Bình luận và đánh giá của bạn đã được gửi!");
}

// Function to display comments
function displayComments() {
  const commentsList = document.getElementById("commentsList");
  commentsList.innerHTML = ""; // Clear existing comments

  // Get comments for THIS recipe from localStorage
  const comments =
    JSON.parse(localStorage.getItem(`comments_${recipeId}`)) || [];

  if (comments.length === 0) {
    commentsList.innerHTML =
      '<p style="text-align: center; color: #888">Chưa có bình luận nào.</p>';
    return;
  }

  comments.forEach((comment) => {
    const commentItem = document.createElement("div");
    commentItem.classList.add("comment-item");

    const ratingDisplay = document.createElement("div");
    ratingDisplay.classList.add("rating-display");
    ratingDisplay.innerHTML = "&#9733;".repeat(comment.rating); // Display stars

    const commentAuthor = document.createElement("strong");
    commentAuthor.textContent = `Người dùng ẩn danh (${comment.timestamp})`; // Basic user name for now

    const commentText = document.createElement("p");
    commentText.textContent = comment.text;

    commentItem.appendChild(ratingDisplay);
    commentItem.appendChild(commentAuthor);
    commentItem.appendChild(commentText);
    commentsList.appendChild(commentItem);
  });
}

// Initial load of comments when the page loads
document.addEventListener("DOMContentLoaded", displayComments);

// Placeholder for menu.js if it contains other scripts for the main menu page
// If menu.js contains functions specific to the menu page, it should not be included here.
// If it contains global utility functions, you might want to integrate them or include the file.
// For this specific recipe detail page, menu.js is likely not needed.
