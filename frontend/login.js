const role = document.getElementById("role");

document.getElementById("loginForm").onsubmit = async (e) => {
  e.preventDefault();

  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    role: role.value
  };

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    console.log("LOGIN RESPONSE:", result);

    if (!result || result.message === "Invalid credentials") {
      alert("Invalid login");
      return;
    }

    let user = result.user;

    if (!user || !user.role) {
      alert("Invalid login response");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("userName", user.name || "User");

    if (user.role === "mediator" && user.refCode) {
      localStorage.setItem("userId", user.refCode.trim().toUpperCase());
    }

    // REDIRECT
    if (user.role === "mediator") {
      window.location.href = "mediator.html";
    } else {
      window.location.href = "customer.html";
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};