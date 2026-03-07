// ============================================================
// Feedback submission — writes to the "Feedback" sheet in
// the same Google Spreadsheet as the waitlist.
//
// The Apps Script needs one extra handler for type === "feedback".
// Add this block to your existing doPost() function:
//
//   if (data.type === "feedback") {
//     var fSheet = ss.getSheetByName('Feedback');
//     if (!fSheet) {
//       fSheet = ss.insertSheet('Feedback');
//       fSheet.appendRow(['Timestamp','Rating','Category','Message','Email','Page','UserAgent']);
//       fSheet.setFrozenRows(1);
//     }
//     fSheet.appendRow([
//       new Date().toISOString(),
//       data.rating   || '',
//       data.category || 'general',
//       data.message  || '',
//       data.email    || '',
//       data.page     || '',
//       data.userAgent|| '',
//     ]);
//     return ContentService
//       .createTextOutput(JSON.stringify({ result: 'success' }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
//
// ============================================================

// Re-uses the existing waitlist Apps Script endpoint
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzo7KyLXw-ubvGKnvJZj7yk9E7IFkHGkXN1OdL2DBK6ppWExqMbAnLVAp7sNJVoxUxkpg/exec";

export interface FeedbackPayload {
  rating: number | null;
  category: string;
  message: string;
  email?: string;
  page?: string;
}

export async function submitFeedback(payload: FeedbackPayload): Promise<void> {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    // text/plain avoids CORS preflight — Apps Script does not handle OPTIONS
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      type: "feedback",
      rating: payload.rating ?? "",
      category: payload.category,
      message: payload.message,
      email: payload.email ?? "",
      page: payload.page ?? "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      timestamp: new Date().toISOString(),
    }),
  });

  let data: { result?: string; error?: string } = {};
  try {
    data = await res.json();
  } catch {
    // ignore — Apps Script can return non-JSON on some edge cases
  }

  if (!res.ok || data.result === "error") {
    throw new Error(data.error || "Failed to submit feedback.");
  }
}
