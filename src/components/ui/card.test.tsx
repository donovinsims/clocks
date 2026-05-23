import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./card";
import "@testing-library/jest-dom";

describe("Card components", () => {
  it("renders Card with children", () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
    expect(screen.getByText("Card Content")).toHaveClass(
      "rounded-xl border bg-card text-card-foreground shadow",
    );
  });

  it("renders CardHeader", () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText("Header")).toHaveClass("flex flex-col space-y-1.5 p-6");
  });

  it("renders CardTitle", () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByText("Title")).toHaveClass("font-semibold leading-none tracking-tight");
  });

  it("renders CardDescription", () => {
    render(<CardDescription>Description</CardDescription>);
    expect(screen.getByText("Description")).toHaveClass("text-sm text-muted-foreground");
  });

  it("renders CardContent", () => {
    render(<CardContent>Content</CardContent>);
    expect(screen.getByText("Content")).toHaveClass("p-6 pt-0");
  });

  it("renders CardFooter", () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText("Footer")).toHaveClass("flex items-center p-6 pt-0");
  });

  it("forwards custom classes to all subcomponents", () => {
    const { container } = render(
      <Card className="custom-card">
        <CardHeader className="custom-header">
          <CardTitle className="custom-title">Title</CardTitle>
          <CardDescription className="custom-desc">Description</CardDescription>
        </CardHeader>
        <CardContent className="custom-content">Content</CardContent>
        <CardFooter className="custom-footer">Footer</CardFooter>
      </Card>,
    );

    expect(container.querySelector(".custom-card")).toBeInTheDocument();
    expect(container.querySelector(".custom-header")).toBeInTheDocument();
    expect(container.querySelector(".custom-title")).toBeInTheDocument();
    expect(container.querySelector(".custom-desc")).toBeInTheDocument();
    expect(container.querySelector(".custom-content")).toBeInTheDocument();
    expect(container.querySelector(".custom-footer")).toBeInTheDocument();
  });
});
