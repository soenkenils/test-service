import express, { Application } from "express";

const app: Application = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export default app;
