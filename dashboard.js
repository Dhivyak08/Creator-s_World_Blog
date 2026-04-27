const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}

const BASE_URL = "https://creatorsworld-api-cyhybeefbfage5gv.southeastasia-01.azurewebsites.net/api";

let editId = null;

// ---------------- LOAD BLOGS ----------------
async function loadBlogs() {
    try {
        const res = await fetch(`${BASE_URL}/getBlogs`);
        const blogs = await res.json();

        displayBlogs(blogs);

    } catch (err) {
        console.error(err);
        alert("Failed to load blogs");
    }
}

// ---------------- DISPLAY BLOGS ----------------
function displayBlogs(blogs) {
    const container = document.getElementById("userBlogs");
    container.innerHTML = "";

    blogs.forEach(blog => {
        if (blog.author === currentUser.email) {
            const div = document.createElement("div");
            div.className = "blog-card";

            div.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>

                <div style="margin-top:10px;">
                    <button onclick="editBlog('${blog.id}', '${blog.title}', \`${blog.content}\`)">Edit</button>
                    <button onclick="deleteBlog('${blog.id}')">Delete</button>
                </div>
            `;

            container.appendChild(div);
        }
    });
}

// ---------------- ADD / UPDATE BLOG ----------------
async function addBlog() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) {
        alert("Fill all fields");
        return;
    }

    try {
        if (editId) {
            // 🔄 UPDATE
            const res = await fetch(`${BASE_URL}/updateBlog`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: editId,
                    title,
                    content
                })
            });

            if (!res.ok) throw new Error("Update failed");

            editId = null;

        } else {
            // ➕ CREATE
            const res = await fetch(`${BASE_URL}/createBlog`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    content,
                    author: currentUser.email,
                    name: currentUser.name
                })
            });

            if (!res.ok) throw new Error("Create failed");
        }

        document.getElementById("title").value = "";
        document.getElementById("content").value = "";

        loadBlogs();

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

// ---------------- EDIT BLOG ----------------
function editBlog(id, title, content) {
    document.getElementById("title").value = title;
    document.getElementById("content").value = content;

    editId = id;
}

// ---------------- DELETE BLOG ----------------
async function deleteBlog(id) {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
        const res = await fetch(`${BASE_URL}/deleteBlog`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });

        if (!res.ok) throw new Error("Delete failed");

        loadBlogs();

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

// ---------------- LOGOUT ----------------
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// ---------------- HOME ----------------
function goHome() {
    window.location.href = "index.html";
}

// ---------------- INIT ----------------
loadBlogs();
