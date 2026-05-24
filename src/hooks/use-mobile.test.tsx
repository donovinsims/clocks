import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "./use-mobile";

describe("useIsMobile", () => {
  let matchMediaMock: ReturnType<typeof vi.fn>;
  const listeners: Set<() => void> = new Set();

  beforeEach(() => {
    listeners.clear();
    // Default to a desktop viewport
    window.innerWidth = 1024;

    matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event: string, callback: () => void) => {
        if (event === "change") listeners.add(callback);
      }),
      removeEventListener: vi.fn((event: string, callback: () => void) => {
        if (event === "change") listeners.delete(callback);
      }),
      dispatchEvent: vi.fn(),
    }));
    window.matchMedia = matchMediaMock as unknown as (query: string) => MediaQueryList;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns false for desktop viewport", () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true for mobile viewport", () => {
    window.innerWidth = 320;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("updates when window resizes", () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      // Simulate resize to mobile
      window.innerWidth = 500;
      listeners.forEach((listener) => listener());
    });

    expect(result.current).toBe(true);

    act(() => {
      // Simulate resize to desktop
      window.innerWidth = 1024;
      listeners.forEach((listener) => listener());
    });

    expect(result.current).toBe(false);
  });
});
