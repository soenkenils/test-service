import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../src/index";

describe("GET /unknown", () => {
  it("should return 404 for unknown route", async () => {
    const response = await request(app).get("/unknown");
    expect(response.status).toBe(404);
  });
});

describe("GET /greeting", () => {
  it("should return a valid greeting message", async () => {
    const response = await request(app)
      .get("/greeting")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("greeting");
    expect([
      "Hi!",
      "Hello!",
      "Ahoi!",
      "Moin!",
      "Greetings!",
      "Hey there!",
      "Welcome!",
      "Howdy!",
      "Hola!",
      "Bonjour!",
      "Ciao!",
      "G'day mate!",
      "Aloha!",
      "Namaste!",
      "What's up!",
      "Yo!",
      "Salutations!",
      "Guten Tag!"
    ]).toContain(
      response.body.greeting,
    );
  });
});
