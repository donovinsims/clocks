import { createServerFn } from "@tanstack/react-start";

// ConvertKit (Kit) v3 API — server-side only.
// The handler is tree-shaken from client bundles by @tanstack/react-start.
// For production, set these env vars: KIT_FORM_ID, KIT_API_KEY

export const subscribeToConvertKit = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid request");
    }
    const d = data as Record<string, unknown>;
    if (typeof d.email !== "string" || !d.email) {
      throw new Error("Email is required");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
      throw new Error("Invalid email format");
    }
    return { email: d.email };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.KIT_API_KEY;
    const formId = process.env.KIT_FORM_ID;

    console.log("[ConvertKit] Handler called with email:", data.email);
    console.log("[ConvertKit] API Key present:", !!apiKey);
    console.log("[ConvertKit] Form ID present:", !!formId);

    if (!apiKey || !formId) {
      console.error("[ConvertKit] Missing credentials - API Key:", !!apiKey, "Form ID:", !!formId);
      throw new Error("Kit API key or Form ID is not configured.");
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    let res: Response;
    try {
      console.log("[ConvertKit] Making API request to:", `https://api.convertkit.com/v3/forms/${formId}/subscribe`);
      res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          email: data.email,
        }),
        signal: controller.signal,
      });
      console.log("[ConvertKit] API response status:", res.status);
    } catch (err) {
      console.error("[ConvertKit] API request error:", err);
      if ((err as Error).name === "AbortError") {
        throw new Error("API request timed out. Please try again.");
      }
      throw new Error("Failed to subscribe due to a network error. Please try again.");
    } finally {
      clearTimeout(timeoutId);
    }

    if (!res.ok) {
      const body = await res.text();
      console.error("Kit API error:", res.status, body);
      throw new Error("Failed to subscribe. Please try again.");
    }

    const responseBody = await res.json();
    console.log("[ConvertKit] Success! Response:", JSON.stringify(responseBody));
    return { ok: true };
  });
