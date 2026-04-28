function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    return null;
  }
}

const products = [
  { name: "Headphones", price: 2000, discount: 25 },
  { name: "Smart Watch", price: 3000, discount: 30 },
  { name: "Speaker", price: 1500, discount: 20 },
  { name: "Shoes", price: 2500, discount: 40 }
];

let cart = [];
let total = 0;
let totalCommission = 0;
let isPaying = false;

// login check
window.onload = function () {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("userName").innerText = user.name;

  loadProducts();
};

function loadProducts() {
  const list = document.getElementById("productList");

  if (!list) return;

  list.innerHTML = "";

  products.forEach((p) => {
    let finalPrice = Math.floor(p.price - (p.price * p.discount / 100));
    let commission = Math.floor(finalPrice * 0.1);
    list.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>Price: ₹${finalPrice}</p>
        <p style="color:green;">Earn: ₹${commission}</p>
        <button onclick="addToCart('${p.name}', ${finalPrice}, ${commission})">
          Add to Cart
        </button>
      </div>
    `;
  });
}

function addToCart(name, price, commission) {
  cart.push({ name, price, commission });

  total += price;
  totalCommission += commission;

  updateCart();
}

function updateCart() {
  const box = document.getElementById("cartBox");

  box.innerHTML = "";

  if (cart.length === 0) {
    box.innerHTML = "<p>No items in cart</p>";
  } else {
    cart.forEach(item => {
      box.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
    });
  }

  document.getElementById("totalAmount").innerText =
    "Total: ₹" + total;

  document.getElementById("commissionAmount").innerText =
    "Your Earnings: ₹" + totalCommission;
}
function openPayment() {
  document.getElementById("paymentModal").style.display = "flex";
}

function closePayment() {
  document.getElementById("paymentModal").style.display = "none";
}
async function completePayment() {

  if (isPaying) return;
  isPaying = true;

  const user = getCurrentUser();

  if (!user) {
    alert("Login required");
    isPaying = false;
    return;
  }

  if (cart.length === 0) {
    alert("Cart is empty");
    isPaying = false;
    return;
  }

  const ref = (user.referredBy || "").trim().toUpperCase();

  try {
    const res = await fetch("http://localhost:5000/api/auth/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerId: user._id,
        total: total,
        commission: totalCommission,
        refCode: ref
      })
    });

    const data = await res.json();
    console.log("ORDER RESPONSE:", data);

    if (!res.ok) {
      alert(data.message || "Payment failed");
      isPaying = false;
      return;
    }

    alert("✅ Payment Successful!");

    // RESET
    cart = [];
    total = 0;
    totalCommission = 0;

    updateCart();
    closePayment();

    document.getElementById("purchaseStatus").innerText =
      "🎉 Commission added successfully!";

  } catch (err) {
    console.error(err);
    alert("❌ Server error");
  }

  isPaying = false;
}
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}