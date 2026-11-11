const express = require("express");
const router = express.Router();

// GET /health — Sağlık kontrolü
router.get("/", (req, res) => {
  res.json({
    status: "ok",
    student: "2311012082",
    project: "Kampüs Etkinlikleri",
    timestamp: new Date().toISOString()
  });
});

module.exports = router;

