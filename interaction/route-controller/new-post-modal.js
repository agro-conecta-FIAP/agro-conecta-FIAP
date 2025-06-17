document.addEventListener("DOMContentLoaded", () => {
  const openButtons = document.querySelectorAll(".open-modal");
  const newPostModal = document.getElementById("new-post");
  const newPostForm = document.getElementById("new-post-form");
  const postAuthorNameInput = document.getElementById("post-author-name");
  const postAuthorSubtitleInput = document.getElementById(
    "post-author-subtitle"
  );
  const postContentTextarea = document.getElementById("post-content");
  const postTopicsInput = document.getElementById("post-topics");
  const publishPostButton = newPostForm.querySelector(".publish-post-button");
  const closeModalButton = newPostForm.querySelector(".close-modal-button");
  const socialPageSection = document.querySelector(".social-page-section");

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      newPostModal.showModal();
    });
  });

  closeModalButton.addEventListener("click", () => {
    newPostForm.reset(); // Clear form fields on cancel
    newPostModal.close();
  });

  newPostForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    const authorName = postAuthorNameInput.value;
    const authorSubtitle = postAuthorSubtitleInput.value;
    const postContent = postContentTextarea.value;
    const postTopics = postTopicsInput.value;

    if (!authorName || !postContent) {
      alert("Nome do Autor e Conteúdo da Publicação são obrigatórios!");
      return;
    }

    // Create a new post object
    const newPost = {
      authorName: authorName,
      authorSubtitle: authorSubtitle,
      content: postContent,
      topics: postTopics,
    };

    // Add the new post to the global allSocialPosts array (from topic-handler.js)
    allSocialPosts.unshift(newPost); // Add to the beginning to show as latest

    // Re-render all posts and apply filters
    filterArticles();

    newPostForm.reset(); // Clear form fields after submission
    newPostModal.close();
  });
});
