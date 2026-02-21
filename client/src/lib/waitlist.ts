export interface WaitlistResponse {
  message: string;
}

export interface WaitlistPayload {
  email: string;
  name?: string;
  company?: string;
  role?: string;
  teamSize?: string;
  clusters?: string;
}

// Google Apps Script Web App — writes to Google Sheets + emails on each signup
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzo7KyLXw-ubvGKnvJZj7yk9E7IFkHGkXN1OdL2DBK6ppWExqMbAnLVAp7sNJVoxUxkpg/exec";

export async function joinWaitlist(payload: WaitlistPayload): Promise<WaitlistResponse> {
  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    // text/plain avoids CORS preflight — Apps Script does not handle OPTIONS
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      email: payload.email,
      name: payload.name ?? "",
      company: payload.company ?? "",
      role: payload.role ?? "",
      teamSize: payload.teamSize ?? "",
      clusters: payload.clusters ?? "",
    }),
  });

  let data: { result?: string; error?: string } = {};
  try {
    data = await response.json();
  } catch {
    // ignore parse errors
  }

  if (!response.ok || data.result === "error") {
    throw new Error(data.error || "Failed to join the waitlist. Please try again.");
  }

  return {
    message: "You're on the list! We'll be in touch soon.",
  };
}


