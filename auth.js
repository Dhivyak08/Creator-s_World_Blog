// Get users from localStorage
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

        const inputs = signupForm.querySelectorAll("input");
        const name = inputs[0].value;
        const email = inputs[1].value;
        const password = inputs[2].value;

        const users = getUsers();

        // Check if user exists
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

        const inputs = loginForm.querySelectorAll("input");
        const email = inputs[0].value;
        const password = inputs[1].value;

        const users = getUsers();

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {
            alert("Invalid credentials!");
            return;
        }

        // Save logged-in user
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Login successful!");
        window.location.href = "dashboard.html";
    });
}