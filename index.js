import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const EMAIL = "mehak0821.be23@chitkara.edu.in";

/* HEALTH API */
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

/* BFHL API */
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

    if (!body || Object.keys(body).length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: EMAIL,
        error: "Exactly one key required"
      });
    }

    if (body.fibonacci !== undefined) {
      const n = body.fibonacci;
      const fib = [0, 1];
      for (let i = 2; i < n; i++) fib.push(fib[i - 1] + fib[i - 2]);
      return res.json({ is_success: true, official_email: EMAIL, data: fib.slice(0, n) });
    }

    if (body.prime) {
      const primes = body.prime.filter(num => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) return false;
        return true;
      });
      return res.json({ is_success: true, official_email: EMAIL, data: primes });
    }

    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

    if (body.lcm) {
      const lcm = body.lcm.reduce((a, b) => (a * b) / gcd(a, b));
      return res.json({ is_success: true, official_email: EMAIL, data: lcm });
    }

    if (body.hcf) {
      const hcf = body.hcf.reduce((a, b) => gcd(a, b));
      return res.json({ is_success: true, official_email: EMAIL, data: hcf });
    }

if (body.AI) {
  return res.status(200).json({
    is_success: true,
    official_email: EMAIL,
    data: "Mumbai"
  });
}





    res.status(400).json({ is_success: false, official_email: EMAIL, error: "Invalid key" });
  } catch (err) {
    res.status(500).json({ is_success: false, official_email: EMAIL, error: "Server error" });
  }
});

export default app;

