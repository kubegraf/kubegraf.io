export interface WaitlistResponse {
  message: string;
}

export interface WaitlistPayload {
  email: string;
  name?: string;
  company?: string;
  role?: string;
}

const WAITLIST_ENDPOINT = "https://formsubmit.co/ajax/contact@kubegraf.io";

export async function joinWaitlist(payload: WaitlistPayload): Promise<WaitlistResponse> {
  const response = await fetch(WAITLIST_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...payload,
      _subject: "New Kubegraf waitlist signup",
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
      data?.message ||
        data?.error ||
        "Failed to join the waitlist. Please try again.",
    );
  }

  return {
    message:
      data?.message ||
      "Thanks for joining the waitlist! We'll be in touch at contact@kubegraf.io.",
  };
}


