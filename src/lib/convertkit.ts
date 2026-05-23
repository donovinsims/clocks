import { createServerFn } from "@tanstack/react-start";

// ConvertKit (Kit) v4 API — server-side only.
// The handler is tree-shaken from client bundles by @tanstack/react-start.
// For production, move the API key to an env var: KIT_API_KEY

export const subscribeToConvertKit = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid request");
    }
    const d = data as Record<string, unknown>;
    if (typeof d.email !== "string" || !d.email) {
      throw new Error("Email is required");
    }
    return { email: d.email };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.KIT_API_KEY;
    if (!apiKey) {
      throw new Error("Kit API key is not configured.");
    }

    const res = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey,
      },
      body: JSON.stringify({
        email_address: data.email,
        state: "active",
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Kit API error:", res.status, body);
      throw new Error("Failed to subscribe. Please try again.");
    }

    return { ok: true };
  });
