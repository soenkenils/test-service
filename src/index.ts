import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction,
  type ErrorRequestHandler,
} from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

interface GreetingResponse {
  greeting: string;
}

const GREETINGS: readonly string[] = ["Hi!", "Hello!", "Ahoi!", "Moin!"];
const port: number = process.env.PORT
  ? Number.parseInt(process.env.PORT, 10)
  : 3000;

const app: Application = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit per IP
  }),
);

app.get(
  "/greeting",
  (_req: Request, res: Response<GreetingResponse>, next: NextFunction) => {
    try {
      const randomGreeting =
        GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      res.json({
        greeting: randomGreeting,
      });
    } catch (error) {
      next(error);
    }
  },
);

// Custom error types
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
// Global Error Handler
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);

  if (err instanceof ValidationError) {
    res.status(400).json({
      error: "Validation Error",
      message: err.message,
    });
    return;
  }

  if (err instanceof NotFoundError) {
    res.status(404).json({
      error: "Not Found",
      message: err.message,
    });
    return;
  }

  // Handle unexpected errors
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred"
        : err.message,
  });
};

app.use(errorHandler);

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
