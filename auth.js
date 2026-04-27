// Get users
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Save users
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// ---------------- SIGN UP ----------------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!name || !email || !password) {
            alert("All fields required");
            return;
        }

        const users = getUsers();

        const exists = users.find(user => user.email === email);
        if (exists) {
            alert("User already exists!");
            return;
        }

        users.push({ name, email, password });
        saveUsers(users);

        alert("Registration successful!");
        window.location.href = "login.html";
    });
}

// ---------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const users = getUsers();

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {
            alert("Invalid credentials!");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Login successful!");
        window.location.href = "dashboard.html";
    });
}
