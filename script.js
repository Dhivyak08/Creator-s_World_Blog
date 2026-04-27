document.addEventListener("DOMContentLoaded", function () {

    console.log("SCRIPT LOADED");

    function getLocalBlogs() {
        return JSON.parse(localStorage.getItem("blogs")) || [];
    }

    const container = document.getElementById("blogContainer");
    const searchInput = document.getElementById("searchInput");

    let allBlogs = [];

    async function getApiBlogs() {
        try {
            const res = await fetch("https://creatorsworld-api-cyhybeefbfage5gv.southeastasia-01.azurewebsites.net/api/getBlogs");

            const data = await res.json();

            console.log("API Blogs RAW:", data);

            const cleaned = data.map(blog => ({
                id: blog.id,
                title: blog.title,
                content: blog.content,
                author: blog.author,
                name: blog.name
            }));

            return cleaned;

        } catch (err) {
            console.error("API Error:", err);
            return [];
        }
    }

    async function loadBlogs() {
        const localBlogs = getLocalBlogs();
        const apiBlogs = await getApiBlogs();

        allBlogs = [...apiBlogs, ...localBlogs];

        displayBlogs(allBlogs);
    }

    function displayBlogs(blogList) {
        container.innerHTML = "";

        blogList.slice(0, 20).forEach(blog => {

            if (!blog.title || !blog.content) return;

            const authorText = blog.name || blog.author || "Unknown";

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

    searchInput.addEventListener("input", function () {
        const value = this.value.toLowerCase();

        const filtered = allBlogs.filter(blog =>
            blog.title.toLowerCase().includes(value) ||
            blog.content.toLowerCase().includes(value)
        );

        displayBlogs(filtered);
    });

    loadBlogs();

});
