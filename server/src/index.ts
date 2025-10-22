import { config } from "dotenv";
import express from "express";
import cors from "cors";
import AgentRouter from "./routes/agent";
import TemplateRouter from "./routes/templates";
import { ProfileRouter } from "./routes/profile";
import AuthRouter from "./routes/auth";
import { authMiddleware } from "./middlewares/auth-middleware";

const app = express();
config();

app.use(cors());
app.use(express.json());
app.use("/generate", authMiddleware, AgentRouter);
app.use("/template", authMiddleware, TemplateRouter);
app.use("/profile", authMiddleware, ProfileRouter);
app.use("/auth", AuthRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
