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
    return { email: d.email, firstName: typeof d.firstName === "string" ? d.firstName : undefined };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.KIT_API_KEY;
    const formId = process.env.KIT_FORM_ID || "9477895";

    if (!apiKey || !formId) {
      throw new Error("Kit API key or Form ID is not configured.");
    }

    const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        email: data.email,
        ...(data.firstName && { first_name: data.firstName }),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Kit API error:", res.status, body);
      throw new Error("Failed to subscribe. Please try again.");
    }

    return { ok: true };
  });
