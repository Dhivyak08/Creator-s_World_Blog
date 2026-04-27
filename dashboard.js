const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}

let editIndex = null;

// Get blogs
function getBlogs() {
    return JSON.parse(localStorage.getItem("blogs")) || [];
}

// Save blogs
function saveBlogs(blogs) {
    localStorage.setItem("blogs", JSON.stringify(blogs));
}

// Add or Update blog
function addBlog() {
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        alert("Fill all fields");
        return;
    }

    const blogs = getBlogs();

    if (editIndex !== null) {
        // ✅ UPDATE EXISTING BLOG
        if (blogs[editIndex] && blogs[editIndex].author === currentUser.email) {
            blogs[editIndex].title = title;
            blogs[editIndex].content = content;
        }
        editIndex = null;
    } else {
        // ✅ ADD NEW BLOG
        blogs.push({
    title,
    content,
    author: currentUser.email,
    name: currentUser.name   // ✅ add this
});
    }

    saveBlogs(blogs);

    // Reset form
    titleInput.value = "";
    contentInput.value = "";

    displayBlogs();
}

// Show blogs
function displayBlogs() {
    const container = document.getElementById("userBlogs");
    const blogs = getBlogs();

    container.innerHTML = "";

    blogs.forEach((blog, index) => {
        if (blog.author === currentUser.email) {
            const div = document.createElement("div");
            div.className = "blog-card";

            div.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>

                <div style="margin-top:10px;">
                    <button onclick="editBlog(${index})">Edit</button>
                    <button onclick="deleteBlog(${index})">Delete</button>
                </div>
            `;

            container.appendChild(div);
        }
    });
}

// Edit blog
function editBlog(index) {
    const blogs = getBlogs();
    const blog = blogs[index];

    if (!blog || blog.author !== currentUser.email) {
        alert("Invalid edit operation");
        return;
    }

    document.getElementById("title").value = blog.title;
    document.getElementById("content").value = blog.content;

    editIndex = index;
}

// Delete blog
function deleteBlog(index) {
    const blogs = getBlogs();

    if (!blogs[index] || blogs[index].author !== currentUser.email) {
        alert("Invalid delete operation");
        return;
    }

    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    blogs.splice(index, 1);

    saveBlogs(blogs);

    // Reset edit if needed
    if (editIndex === index) {
        editIndex = null;
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
    }

    displayBlogs();
}

// Logout
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// Initial load
displayBlogs();

function goHome() {
    window.location.href = "index.html";
}