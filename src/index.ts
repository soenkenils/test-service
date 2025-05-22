import express, { Application, Request, Response } from "express";

const GREETINGS = ["Hi!", "Hello!", "Ahoi!", "Moin!"];

const app: Application = express();
const port = 3000;

app.get("/greeting", (_req: Request, res: Response) => {
  const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  res.json({
    greeting: randomGreeting
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export default app;
