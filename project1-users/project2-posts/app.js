const container = document.getElementById("container");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const reloadBtn = document.getElementById("reload");

function fetchPosts() {
  container.innerHTML = "";
  loading.style.display = "block";
  error.innerText = "";

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
      loading.style.display = "none";

      // 👇 100 cards
      data.forEach(post => {
        const card = document.createElement("div");
        card.className = "card";

        let isOpen = false;

        card.innerHTML = `
  <div class="card-content">
    <h3>${post.title}</h3>
    <p class="info">${post.body.slice(0, 50)}...</p>
  </div>

  <button>Read More</button>
`;
        const btn = card.querySelector("button");
        const info = card.querySelector(".info");

        btn.addEventListener("click", () => {
          if (!isOpen) {
            info.innerText = post.body;
            btn.innerText = "Show Less";
            isOpen = true;
          } else {
            info.innerText = post.body.slice(0, 50) + "...";
            btn.innerText = "Read More";
            isOpen = false;
          }
        });

        container.appendChild(card);
      });
    })
    .catch(err => {
      loading.style.display = "none";
      error.innerText = "Error loading posts!";
      console.log(err);
    });
}

reloadBtn.addEventListener("click", fetchPosts);
fetchPosts();