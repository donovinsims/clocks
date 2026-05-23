import { describe, it, expect } from "vitest";
import { renderErrorPage } from "./error-page";

describe("renderErrorPage", () => {
  it("returns a valid HTML string", () => {
    const html = renderErrorPage();

    // Check that it starts with the correct doctype and html tags
    expect(typeof html).toBe("string");
    expect(html).toMatch(/^<!doctype html>/i);
    expect(html).toContain('<html lang="en">');
  });

  it("contains the correct title and heading", () => {
    const html = renderErrorPage();

    expect(html).toContain("<title>This page didn't load</title>");
    expect(html).toContain("<h1>This page didn't load</h1>");
  });

  it("includes helpful text for the user", () => {
    const html = renderErrorPage();

    expect(html).toContain(
      "Something went wrong on our end. You can try refreshing or head back home.",
    );
  });

  it("provides action buttons to reload or go home", () => {
    const html = renderErrorPage();

    expect(html).toContain(
      '<button class="primary" onclick="location.reload()">Try again</button>',
    );
    expect(html).toContain('<a class="secondary" href="/">Go home</a>');
  });

  it("includes basic inline styles", () => {
    const html = renderErrorPage();

    expect(html).toContain("<style>");
    expect(html).toContain("body {");
    expect(html).toContain("</style>");
  });
});
