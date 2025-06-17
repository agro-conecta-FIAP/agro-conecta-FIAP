let allSocialPosts = []; // To store all posts once fetched
let filterCategorySelect;
let socialPageSection;
let searchInput;
let searchButton;
let selectedTopicDisplay;
let clearFilterButton;

// Function to fetch topics and social posts from JSON files
async function fetchData() {
  try {
    const [topicsResponse, postsResponse] = await Promise.all([
      fetch("../data/topics.json"),
      fetch("../data/social-posts.json"),
    ]);

    if (!topicsResponse.ok) {
      throw new Error(
        `HTTP error! status: ${topicsResponse.status} for topics.json`
      );
    }
    if (!postsResponse.ok) {
      throw new Error(
        `HTTP error! status: ${postsResponse.status} for social-posts.json`
      );
    }

    const topics = await topicsResponse.json();
    allSocialPosts = await postsResponse.json(); // Store all posts

    populateFilterDropdown(topics);
    renderPosts(allSocialPosts); // Initial render of all posts
    displayTopicTags(); // Apply topic tags to rendered posts
    filterArticles(); // Apply initial filters
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to render social posts
function renderPosts(posts) {
  if (!socialPageSection) return;
  socialPageSection.innerHTML = ""; // Clear existing posts

  // Preserve the selected-topic-display div if it exists
  const existingSelectedTopicDisplay = document.getElementById(
    "selected-topic-display"
  );
  if (existingSelectedTopicDisplay) {
    socialPageSection.appendChild(existingSelectedTopicDisplay);
  }

  posts.forEach((post, idx) => {
    const article = document.createElement("article");
    article.className = "social-page-section-article";

    // Render comments HTML
    let commentsHtml = "";
    if (
      post.coments &&
      post.coments.length > 0 &&
      post.coments[0].content.trim() !== ""
    ) {
      commentsHtml =
        `<div class='comments-section' id='comments-section-${idx}'><h4>Comentários</h4><ul class='comments-list'>` +
        post.coments
          .map(
            (c) =>
              `<li class='comment-item'>
            <div class='comment-header'><span class='comment-author'>${c.name}</span> <span class='comment-date'>${c.data}</span></div>
            <div class='comment-content'>${c.content}</div>
          </li>`
          )
          .join("") +
        `</ul></div>`;
    } else {
      commentsHtml = `<div class='comments-section' id='comments-section-${idx}'><h4>Comentários</h4><div class='no-comments'>Nenhum comentário ainda.</div></div>`;
    }

    // Add comment form
    commentsHtml += `
      <form class='add-comment-form' data-post-idx='${idx}'>
      <div class='add-comment-form-header'>
        <textarea class='add-comment-form-textarea' name='content' placeholder='Escreva um comentário...' required rows='2'></textarea><br />
      </div>
        <button type='submit'>Comentar</button>
      </form>
    `;

    article.innerHTML = `
      <div class="social-page-section-article-header">
        <img
          src="../public/images/circle-user.png"
          alt="${post.authorName}"
          style="
            width: 48px;
            height: 48px;
            border-radius: 50%;
            object-fit: cover;
          "
        />
        <div>
          <strong class="social-page-section-article-header-name"
            >${post.authorName}</strong
          ><br />
          <span class="social-page-section-article-header-name-subtitle"
            >${post.authorSubtitle}</span
          >
        </div>
      </div>
      <div class="social-page-section-article-content">
        ${post.content}
        <div class="topic-tags" data-topics="${post.topics}"></div>
      </div>
      ${commentsHtml}
    `;
    socialPageSection.appendChild(article);
  });
  displayTopicTags(); // Re-apply topic tags after rendering new posts

  // Add event listeners for all comment forms
  const commentForms = document.querySelectorAll(".add-comment-form");
  commentForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const idx = parseInt(form.getAttribute("data-post-idx"));
      const name = "Edson";
      const content = form.elements["content"].value.trim();
      if (!content) return;
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      if (
        !allSocialPosts[idx].coments ||
        (allSocialPosts[idx].coments.length === 1 &&
          allSocialPosts[idx].coments[0].content === "")
      ) {
        allSocialPosts[idx].coments = [];
      }
      allSocialPosts[idx].coments.push({ name, data: dateStr, content });
      renderCommentsForPost(idx);
      form.reset();
    });
  });

  addTopicTagClickListeners();
}

// Função para re-renderizar apenas os comentários de um post
function renderCommentsForPost(idx) {
  const post = allSocialPosts[idx];
  const commentsSection = document.getElementById(`comments-section-${idx}`);
  if (!commentsSection) return;
  let html = "";
  if (
    post.coments &&
    post.coments.length > 0 &&
    post.coments[0].content.trim() !== ""
  ) {
    html =
      `<h4>Comentários</h4><ul class='comments-list'>` +
      post.coments
        .map(
          (c, i, arr) =>
            `<li class='comment-item${
              i === arr.length - 1 ? " new-comment-highlight" : ""
            }'>
          <div class='comment-header'><span class='comment-author'>${
            c.name
          }</span> <span class='comment-date'>${c.data}</span></div>
          <div class='comment-content'>${c.content}</div>
        </li>`
        )
        .join("") +
      `</ul>`;
  } else {
    html = `<h4>Comentários</h4><div class='no-comments'>Nenhum comentário ainda.</div>`;
  }
  commentsSection.innerHTML = html;

  // Remover o destaque após 1.5s
  const lastComment = commentsSection.querySelector(".new-comment-highlight");
  if (lastComment) {
    setTimeout(() => {
      lastComment.classList.remove("new-comment-highlight");
    }, 1500);
  }
}

// Function to populate the filter dropdown
function populateFilterDropdown(topics) {
  if (!filterCategorySelect) return;

  // Ensure the default option from HTML is present
  const defaultOption = filterCategorySelect.querySelector('option[value=""]');
  if (defaultOption) {
    defaultOption.selected = true;
  }

  // Clear only dynamically added options, keeping the HTML default
  Array.from(filterCategorySelect.options).forEach((option) => {
    if (option.value !== "") {
      option.remove();
    }
  });

  topics.forEach((topic) => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    filterCategorySelect.appendChild(option);
  });
}

// Function to filter articles based on selected topic or search term
function filterArticles() {
  const selectedTopic = filterCategorySelect.value;
  const searchTerm = searchInput.value.toLowerCase();

  // Update the selected topic display
  if (selectedTopicDisplay) {
    selectedTopicDisplay.textContent = selectedTopic
      ? `Tópico Selecionado: ${selectedTopic}`
      : "";
  }

  // Filter the `allSocialPosts` array and then re-render them
  const filteredPosts = allSocialPosts.filter((post) => {
    const articleTopics = post.topics || "";
    const contentText = post.content ? post.content.toLowerCase() : "";
    const titleText = post.authorName ? post.authorName.toLowerCase() : "";
    const subtitleText = post.authorSubtitle
      ? post.authorSubtitle.toLowerCase()
      : "";

    const matchesTopic =
      selectedTopic === "" ||
      (articleTopics && articleTopics.includes(selectedTopic));

    const matchesSearch =
      searchTerm === "" ||
      contentText.includes(searchTerm) ||
      titleText.includes(searchTerm) ||
      subtitleText.includes(searchTerm) ||
      (articleTopics && articleTopics.toLowerCase().includes(searchTerm));
    return matchesTopic && matchesSearch;
  });
  renderPosts(filteredPosts); // Render only the filtered posts
}

document.addEventListener("DOMContentLoaded", () => {
  filterCategorySelect = document.getElementById("filter-category-select");
  socialPageSection = document.querySelector(".social-page-section");
  searchInput = document.querySelector('.search-box input[type="text"]');
  searchButton = document.querySelector(".search-box .search-button");
  selectedTopicDisplay = document.getElementById("selected-topic-display");
  clearFilterButton = document.getElementById("clear-filter-button");

  // Event listeners
  filterCategorySelect.addEventListener("change", filterArticles);
  searchButton.addEventListener("click", filterArticles);
  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      filterArticles();
    }
  });

  if (clearFilterButton) {
    clearFilterButton.addEventListener("click", () => {
      filterCategorySelect.value = ""; // Reset the select dropdown to the default option
      filterArticles(); // Re-apply filters to show all articles
    });
  }

  fetchData(); // Call fetchData instead of fetchTopics
});

// Function to display topic tags in each article
function displayTopicTags() {
  const topicTagsContainers = document.querySelectorAll(".topic-tags");
  topicTagsContainers.forEach((container) => {
    const topicsData = container.getAttribute("data-topics");
    if (topicsData) {
      const topicsArray = topicsData.split(",").map((topic) => topic.trim());
      container.innerHTML = ""; // Clear existing content

      topicsArray.forEach((topic) => {
        const span = document.createElement("span");
        span.className = "topic-tag"; // Add a class for styling
        span.textContent = `#${topic}`;
        container.appendChild(span);
      });
    }
  });
}

function addTopicTagClickListeners() {
  const topicTags = document.querySelectorAll(".topic-tag");
  topicTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      const selectedTag = this.textContent.replace("#", "").trim();
      filterPostsByTag(selectedTag);
    });
  });
}

function filterPostsByTag(tag) {
  // Supondo que você tenha uma função para renderizar posts filtrados
  renderPosts(allSocialPosts.filter((post) => post.topics.includes(tag)));
  // Opcional: atualizar o display do tópico selecionado
  document.getElementById(
    "selected-topic-display"
  ).textContent = `Filtrando por: #${tag}`;
}
