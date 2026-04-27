// DOM elements
const container = document.getElementById("blogContainer");
const searchInput = document.getElementById("searchInput");

const BASE_URL = "https://creatorsworld-api-cyhybeefbfage5gv.southeastasia-01.azurewebsites.net/api";

let allBlogs = [];

// ---------------- FETCH BLOGS ----------------
async function loadBlogs() {
    try {
        const res = await fetch(`${BASE_URL}/getBlogs`);
        const blogs = await res.json();

        allBlogs = blogs;
        displayBlogs(allBlogs);

    } catch (err) {
        console.error(err);
        alert("Failed to load blogs");
    }
}

// ---------------- DISPLAY BLOGS ----------------
function displayBlogs(blogList) {
    container.innerHTML = "";

    blogList.slice(0, 20).forEach(blog => {

        const authorText = blog.name || blog.author;

        if (!authorText) return;

        const div = document.createElement("div");
        div.className = "blog-card";

        div.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <small>By: ${authorText}</small>
        `;

        container.appendChild(div);
    });
}

// ---------------- SEARCH ----------------
searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();

    const filtered = allBlogs.filter(blog =>
        blog.title.toLowerCase().includes(value) ||
        blog.content.toLowerCase().includes(value)
    );

    displayBlogs(filtered);
});

// ---------------- INIT ----------------
loadBlogs();
