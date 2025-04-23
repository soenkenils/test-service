import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/./index"; // Ensure your app is exported in index.ts

describe("GET /", () => {
  it("should return Hello, world!", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, world!");
  });
});
