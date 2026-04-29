# 🚀 Refer & Earn Platform (MERN Stack)

A full-stack **Referral-Based Commission E-Commerce Platform** where mediators (affiliates) earn commission when customers purchase products using their referral codes.

---

## 📌 Project Overview

This platform allows:

* Customers to purchase products
* Mediators to share referral codes
* Admin to manage products, categories, and commissions

---

## 🧠 Features

### 👤 Authentication

* User Registration & Login 
* Role-based access (Admin / Mediator / Customer)
* Referral code system

---

### 🛒 Customer Features

* Browse products
* Category filtering
* Purchase products
---

### 🤝 Mediator Features

* Unique referral code
* Dashboard with earnings
* Commission tracking
* Wallet system
* Withdraw request

---

### 🛠️ Admin Features

* Manage users & mediators
* Manage categories & commission %
* Add / update products
* Approve withdrawals
* View reports

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Axios
* Tailwind CSS / MUI

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## 💰 Commission Logic

Commission is calculated based on product category:

```
commission = productPrice × (categoryCommission / 100)
```

Example:

* Product Price = ₹2000
* Category Commission = 10%
* Mediator Earns = ₹200

---

## 🔄 User Flow

1. Mediator registers → gets referral code
2. Customer signs up using that code
3. Customer purchases product
4. Commission is calculated
5. Amount added to mediator wallet
6. Mediator requests withdrawal

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Author

AVANTIKA SHRIVASTAVA
GitHub: https://github.com/avantika77

---


