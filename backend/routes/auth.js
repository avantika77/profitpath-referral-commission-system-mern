const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");

function generateRefCode(name = "") {
  const prefix = name.substring(0, 3).toUpperCase() || "MED";
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return prefix + random;
}

router.post("/register", async (req, res) => {
  try {
    let { name, email, password, role, referredBy } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User exists" });

    let refCode = null;

    if (role === "mediator") {
      refCode = generateRefCode(name);
    }

    if (role === "customer") {
      const mediator = await User.findOne({
        refCode: { $regex: `^${referredBy}$`, $options: "i" }
      });

      if (!mediator) {
        return res.status(400).json({ message: "Invalid referral code" });
      }
    }

    const user = new User({
      name,
      email,
      password,
      role,
      refCode,
      referredBy,
      commission: 0
    });

    await user.save();

    res.json({ message: "Registered", user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN Part
router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({ user });
});

// VALIDATE REF  registered referral code checking for customer registration and order placement
router.get("/validate-ref/:code", async (req, res) => {
  const user = await User.findOne({
    refCode: { $regex: `^${req.params.code}$`, $options: "i" }
  });

  res.json({ valid: !!user });
});

//order place code
router.post("/order", async (req, res) => {
  try {
    const { customerId, total, commission, refCode } = req.body;

    await Order.create({
      customerId,
      mediatorCode: refCode,
      price: total,
      commission
    });

    if (refCode) {
      const mediator = await User.findOne({
        refCode: { $regex: `^${refCode}$`, $options: "i" }
      });

      if (mediator) {
        mediator.commission += Number(commission);
        await mediator.save();
      }
    }

    res.json({ message: "Order placed" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// mediator details for dashboard
router.get("/mediator/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });

  if (!user) return res.json({});

  res.json({
    refCode: user.refCode,
    commission: user.commission
  });
});

module.exports = router;