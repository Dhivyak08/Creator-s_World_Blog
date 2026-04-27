// Add or Update blog
async function addBlog() {
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
        // ✅ UPDATE EXISTING BLOG (LOCAL ONLY for now)
        if (blogs[editIndex] && blogs[editIndex].author === currentUser.email) {
            blogs[editIndex].title = title;
            blogs[editIndex].content = content;
        }
        editIndex = null;

        saveBlogs(blogs);
        displayBlogs();
    } else {
        // ✅ ADD NEW BLOG → SAVE TO API + LOCAL

        try {
            await fetch("https://creatorsworld-api-cyhybeefbfage5gv.southeastasia-01.azurewebsites.net/api/createBlog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    content,
                    author: currentUser.email,
                    name: currentUser.name
                })
            });

            // 🔹 ALSO SAVE LOCALLY (so dashboard shows instantly)
            blogs.push({
                title,
                content,
                author: currentUser.email,
                name: currentUser.name
            });

            saveBlogs(blogs);

            alert("Blog saved to database!");

        } catch (err) {
            console.error(err);
            alert("Error saving blog");
        }

        displayBlogs();
    }

    // Reset form
    titleInput.value = "";
    contentInput.value = "";
}
