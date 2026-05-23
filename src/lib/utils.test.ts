import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("should merge basic tailwind classes correctly", () => {
    expect(cn("bg-red-500", "text-white")).toBe("bg-red-500 text-white");
  });

  it("should resolve tailwind class conflicts using tailwind-merge", () => {
    // If we have 'p-4' and 'p-8', the last one should win
    expect(cn("p-4", "p-8")).toBe("p-8");
  });

  it("should handle arrays of classes", () => {
    expect(cn(["bg-blue-500", "text-black"])).toBe("bg-blue-500 text-black");
  });

  it("should handle conditional classes using objects", () => {
    expect(cn({ "bg-green-500": true, "text-transparent": false })).toBe("bg-green-500");
  });

  it("should handle mixed inputs", () => {
    expect(
      cn("text-sm", { "font-bold": true, "font-normal": false }, ["flex", "items-center"]),
    ).toBe("text-sm font-bold flex items-center");
  });

  it("should ignore falsy values", () => {
    expect(cn("bg-red-500", null, undefined, false, 0, "", "text-white")).toBe(
      "bg-red-500 text-white",
    );
  });

  it("should merge complex conditional and conflicting tailwind classes", () => {
    const condition = true;
    expect(cn("px-2 py-1", condition && "p-4", "m-1")).toBe("p-4 m-1");
  });
});
