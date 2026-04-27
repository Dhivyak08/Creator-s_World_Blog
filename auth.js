// ---------------- SIGN UP ----------------
if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputs = signupForm.querySelectorAll("input");

        const name = inputs[0].value.trim();
        const email = inputs[1].value.trim();
        const password = inputs[2].value.trim();

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
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputs = loginForm.querySelectorAll("input");

        const email = inputs[0].value.trim();
        const password = inputs[1].value.trim();

        if (!email || !password) {
            alert("All fields required");
            return;
        }

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
