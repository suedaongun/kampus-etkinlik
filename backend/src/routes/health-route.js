import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    student: "2311012082",
    project: "Kampüs Etkinlikleri",
    timestamp: new Date().toISOString()
  });
});

export default router;
