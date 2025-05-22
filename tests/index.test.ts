import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/index";

describe("GET /", () => {
  it("should return Hello, world!", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, world!");
  });
});

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
    expect(["Hi!", "Hello!", "Ahoi!", "Moin!"]).toContain(response.body.greeting);
  });
});

