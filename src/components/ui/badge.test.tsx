import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";
import "@testing-library/jest-dom";

describe("Badge", () => {
  it("renders correctly", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New");
    expect(badge).toBeInTheDocument();
    expect(badge.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    render(<Badge className="custom-class">New</Badge>);
    expect(screen.getByText("New")).toHaveClass("custom-class");
  });

  it("applies variant classes", () => {
    render(<Badge variant="destructive">Alert</Badge>);
    expect(screen.getByText("Alert")).toHaveClass("bg-destructive");
  });
});
