const container = document.getElementById("container");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const reloadBtn = document.getElementById("reload");

function fetchUsers() {
  container.innerHTML = "";
  loading.style.display = "block";
  error.innerText = "";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
      loading.style.display = "none";

      data.forEach(user => {
        const card = document.createElement("div");
        card.className = "card";

        let isOpen = false;

        card.innerHTML = `
          <img src="https://i.pravatar.cc/150?img=${user.id}">
          <h3>${user.name}</h3>
          <p class="info">${user.company.catchPhrase}</p>
          <button>Interested</button>
        `;

        const btn = card.querySelector("button");
        const info = card.querySelector(".info");

        btn.addEventListener("click", () => {
          if (!isOpen) {
            info.innerHTML = `
              Email: ${user.email}<br>
              Phone: ${user.phone}<br>
              Company: ${user.company.name}
            `;
            btn.innerText = "Back";
            isOpen = true;
          } else {
            info.innerText = user.company.catchPhrase;
            btn.innerText = "Interested";
            isOpen = false;
          }
        });

        container.appendChild(card);
      });
    })
    .catch(err => {
      loading.style.display = "none";
      error.innerText = "Error loading users!";
      console.log(err);
    });
}

reloadBtn.addEventListener("click", fetchUsers);
fetchUsers();