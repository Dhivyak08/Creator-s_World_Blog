// 🔹 Get blogs from localStorage (dashboard)
function getLocalBlogs() {
    return JSON.parse(localStorage.getItem("blogs")) || [];
}

const container = document.getElementById("blogContainer");
const searchInput = document.getElementById("searchInput");

let allBlogs = [];

// 🔹 Fetch blogs from API (Cosmos DB)
async function getApiBlogs() {
    try {
        const res = await fetch("https://creatorsworld-api-cyhybeefbfage5gv.southeastasia-01.azurewebsites.net/api/getBlogs");
        const data = await res.json();
        console.log("API Blogs:", data);
        return data;
    } catch (err) {
        console.error("API Error:", err);
        return [];
    }
}

// 🔹 Load both local + API blogs
async function loadBlogs() {
    const localBlogs = getLocalBlogs();
    const apiBlogs = await getApiBlogs();

    // merge both
    allBlogs = [...apiBlogs, ...localBlogs];

    displayBlogs(allBlogs);
}

// 🔹 Display blogs
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

// 🔹 Search
searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();

    const filtered = allBlogs.filter(blog =>
        blog.title.toLowerCase().includes(value) ||
        blog.content.toLowerCase().includes(value)
    );

    displayBlogs(filtered);
});

// 🔹 Initial load
loadBlogs();
