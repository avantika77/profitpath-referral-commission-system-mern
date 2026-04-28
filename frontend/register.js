document.addEventListener("DOMContentLoaded", () => {

  const roleSelect = document.getElementById("role");
  const referralBox = document.getElementById("referralBox");
  const referralInput = document.getElementById("refInput");

  function getReferralFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("ref");
  }

  function handleRoleChange() {
    const ref = getReferralFromURL();

    if (roleSelect.value === "customer") {
      referralBox.style.display = "flex";
      referralInput.value = ref || "";
    } else {
      referralBox.style.display = "none";
      referralInput.value = "";
    }
  }

  roleSelect.addEventListener("change", handleRoleChange);
  handleRoleChange();

  async function validateReferral(code) {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/validate-ref/${code}`);
      const data = await res.json();
      return data.valid;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  document.getElementById("registerForm").onsubmit = async (e) => {
    e.preventDefault();

    const roleVal = roleSelect.value;
    let referralCode = referralInput.value.trim().toUpperCase();

    if (roleVal === "customer" && !referralCode) {
      alert("❌ Enter referral code");
      return;
    }

    if (roleVal === "customer") {
      const isValid = await validateReferral(referralCode);

      if (!isValid) {
        alert("❌ Invalid referral code");
        return;
      }
    }

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      role: roleVal,
      referredBy: roleVal === "customer" ? referralCode : null
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!result || res.status !== 200) {
        alert(result.message || "❌ Registration failed");
        return;
      }

      alert("✅ Registered successfully");
      window.location.href = "login.html";

    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }
  };

});