
function getBlogs() {
    return JSON.parse(localStorage.getItem("blogs")) || [];
}

const container = document.getElementById("blogContainer");
const searchInput = document.getElementById("searchInput");

// Display blogs (limit to 20)
function displayBlogs(blogList) {
    container.innerHTML = "";

    blogList.slice(0, 20).forEach(blog => {

        const authorText = blog.name || blog.author;

        // ❌ Skip blog if no author
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

// Load blogs initially
function loadBlogs() {
    const blogs = getBlogs();
    displayBlogs(blogs);
}

// Search functionality
searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();

    const filtered = getBlogs().filter(blog =>
        blog.title.toLowerCase().includes(value) ||
        blog.content.toLowerCase().includes(value)
    );

    displayBlogs(filtered);
});

// Initial call
loadBlogs();
