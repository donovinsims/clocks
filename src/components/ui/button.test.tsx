import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";
import "@testing-library/jest-dom";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("renders as a child using asChild", () => {
    render(
      <Button asChild>
        <a href="/link">Link Button</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Link Button" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/link");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("applies variant classes", () => {
    render(<Button variant="destructive">Destructive</Button>);
    // Destructive variant in standard shadcn adds bg-destructive
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
  });
});
