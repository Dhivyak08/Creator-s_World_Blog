// ---------------- SIGN UP ----------------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const inputs = signupForm.querySelectorAll("input");
        const name = inputs[0].value;
        const email = inputs[1].value;
        const password = inputs[2].value;

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Signup failed");
                return;
            }

            alert("Registration successful!");
            window.location.href = "login.html";

        } catch (err) {
            alert("Server error");
            console.error(err);
        }
    });
}

// ---------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const inputs = loginForm.querySelectorAll("input");
        const email = inputs[0].value;
        const password = inputs[1].value;

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const user = await res.json();

            if (!res.ok) {
                alert(user.message || "Invalid credentials");
                return;
            }

            // ✅ Store logged-in user ONLY
            localStorage.setItem("currentUser", JSON.stringify(user));

            alert("Login successful!");
            window.location.href = "dashboard.html";

        } catch (err) {
            alert("Server error");
            console.error(err);
        }
    });
}
