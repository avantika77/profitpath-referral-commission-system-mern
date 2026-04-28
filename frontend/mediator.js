function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    return null;
  }
}

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

function copyCode() {
  const code = document.getElementById("refCode").value;
  navigator.clipboard.writeText(code);
  alert("Copied!");
}

function shareWhatsApp() {
  const code = document.getElementById("refCode").value;
  const msg = `Join using my referral code: ${code}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
}

async function loadMediatorDashboard() {

  const user = getCurrentUser();

  if (!user || user.role !== "mediator") {
    alert("Unauthorized");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("welcomeText").innerText =
    "Welcome " + user.name;

  try {
    const res = await fetch(`http://localhost:5000/api/auth/mediator/${user.email}`);
    const data = await res.json();

    document.getElementById("refCode").value = data.refCode || "N/A";
    document.getElementById("refCode2").value = data.refCode || "N/A";

    const commission = data.commission || 0;

    document.getElementById("shopEarn").innerText = commission;
    document.getElementById("earn").innerText = commission;
    document.getElementById("paid").innerText = commission;
    document.getElementById("pending").innerText = 0;

    document.getElementById("totalCom").innerText = commission;
    document.getElementById("paid2").innerText = commission;
    document.getElementById("pending2").innerText = 0;
    document.getElementById("totalCom2").innerText = commission;

  } catch (err) {
    console.error(err);
    alert("Failed to load dashboard");
  }
}

window.onload = loadMediatorDashboard;