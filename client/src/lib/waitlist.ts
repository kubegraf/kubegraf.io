export interface WaitlistResponse {
  message: string;
}

export interface WaitlistPayload {
  email: string;
  name?: string;
  company?: string;
  role?: string;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdprplr";

export async function joinWaitlist(payload: WaitlistPayload): Promise<WaitlistResponse> {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: payload.email,
      name: payload.name,
      company: payload.company,
      role: payload.role,
      _subject: "New KubeGraf Waitlist Signup",
    }),
  });

  let data: any = {};
  try {
    data = await response.json();
  } catch {
    // ignore parse errors, we'll fall back to a generic message
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
        data?.message ||
        "Failed to join the waitlist. Please try again.",
    );
  }

  return {
    message:
      data?.message ||
      "Thanks for joining the waitlist! We'll be in touch soon.",
  };
}


