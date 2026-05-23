import { describe, it, expect } from "vitest";
import { isCatastrophicSsrErrorBody } from "./server";

describe("isCatastrophicSsrErrorBody", () => {
  it("returns false for invalid JSON", () => {
    expect(isCatastrophicSsrErrorBody("invalid-json", 500)).toBe(false);
  });

  it("returns false for valid JSON that is not an object", () => {
    expect(isCatastrophicSsrErrorBody("null", 500)).toBe(false);
    expect(isCatastrophicSsrErrorBody("true", 500)).toBe(false);
    expect(isCatastrophicSsrErrorBody("42", 500)).toBe(false);
    expect(isCatastrophicSsrErrorBody('"string"', 500)).toBe(false);
    expect(isCatastrophicSsrErrorBody("[]", 500)).toBe(false);
  });

  it("returns false for object with missing required keys", () => {
    // Missing 'unhandled'
    expect(
      isCatastrophicSsrErrorBody(JSON.stringify({ message: "HTTPError", status: 500 }), 500),
    ).toBe(false);
    // Missing 'message'
    expect(isCatastrophicSsrErrorBody(JSON.stringify({ unhandled: true, status: 500 }), 500)).toBe(
      false,
    );
  });

  it("returns false for object with unexpected extra keys", () => {
    expect(
      isCatastrophicSsrErrorBody(
        JSON.stringify({ unhandled: true, message: "HTTPError", status: 500, extra: "key" }),
        500,
      ),
    ).toBe(false);
  });

  it("returns false if unhandled is not true", () => {
    expect(
      isCatastrophicSsrErrorBody(
        JSON.stringify({ unhandled: false, message: "HTTPError", status: 500 }),
        500,
      ),
    ).toBe(false);
    expect(
      isCatastrophicSsrErrorBody(
        JSON.stringify({ unhandled: "true", message: "HTTPError", status: 500 }),
        500,
      ),
    ).toBe(false);
  });

  it('returns false if message is not "HTTPError"', () => {
    expect(
      isCatastrophicSsrErrorBody(
        JSON.stringify({ unhandled: true, message: "OtherError", status: 500 }),
        500,
      ),
    ).toBe(false);
    expect(
      isCatastrophicSsrErrorBody(
        JSON.stringify({ unhandled: true, message: 500, status: 500 }),
        500,
      ),
    ).toBe(false);
  });

  it("returns false if status does not match responseStatus", () => {
    expect(
      isCatastrophicSsrErrorBody(
        JSON.stringify({ unhandled: true, message: "HTTPError", status: 404 }),
        500,
      ),
    ).toBe(false);
  });

  it("returns true if all conditions are met (status is undefined)", () => {
    expect(
      isCatastrophicSsrErrorBody(JSON.stringify({ unhandled: true, message: "HTTPError" }), 500),
    ).toBe(true);
  });

  it("returns true if all conditions are met (status matches responseStatus)", () => {
    expect(
      isCatastrophicSsrErrorBody(
        JSON.stringify({ unhandled: true, message: "HTTPError", status: 500 }),
        500,
      ),
    ).toBe(true);
  });
});
