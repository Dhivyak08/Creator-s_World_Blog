const BASE_URL = "https://creatorsworld-api-cyhybeefbfage5gv.southeastasia-01.azurewebsites.net/api";

// ---------------- SIGN UP ----------------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const inputs = signupForm.querySelectorAll("input");

        const name = inputs[0].value.trim();
        const email = inputs[1].value.trim();
        const password = inputs[2].value.trim();

        if (!name || !email || !password) {
            alert("All fields are required");
            return;
        }

        console.log("Sending signup:", { name, email, password }); // 🔥 debug

        try {
            const res = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            let data;
            try {
                data = await res.json();
            } catch {
                throw new Error("Invalid JSON response from server");
            }

            console.log("Response:", data); // 🔥 debug

            if (!res.ok) {
                alert(data.message || "Signup failed");
                return;
            }

            alert("Registration successful!");
            window.location.href = "login.html";

        } catch (err) {
            console.error("Signup error:", err);
            alert("Server error");
        }
    });
}

// ---------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const inputs = loginForm.querySelectorAll("input");

        const email = inputs[0].value.trim();
        const password = inputs[1].value.trim();

        if (!email || !password) {
            alert("All fields are required");
            return;
        }

        console.log("Sending login:", { email, password }); // 🔥 debug

        try {
            const res = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            let user;
            try {
                user = await res.json();
            } catch {
                throw new Error("Invalid JSON response from server");
            }

            console.log("Login response:", user); // 🔥 debug

            if (!res.ok) {
                alert(user.message || "Invalid credentials");
                return;
            }

            localStorage.setItem("currentUser", JSON.stringify(user));

            window.location.href = "dashboard.html";

        } catch (err) {
            console.error("Login error:", err);
            alert("Server error");
        }
    });
}
