import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

interface GreetingResponse {
  greeting: string;
}

const GREETINGS: readonly string[] = ["Hi!", "Hello!", "Ahoi!", "Moin!"];
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const app: Application = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit per IP
}));

app.get("/greeting", (_req: Request, res: Response<GreetingResponse>, next: NextFunction) => {
  try {
    const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    res.json({
      greeting: randomGreeting
    });
  } catch (error) {
    next(error);
  }
});

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

if (require.main === module) {
  try {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

export default app;
