const CONFIG = {
  SHEET_NAME:       "Sheet1",                            // waitlist/demo sheet
  FEEDBACK_SHEET:   "Feedback",                          // feedback sheet
  SPREADSHEET_ID:   "1jAqEvzHdLupx0KAXTR2RFg8OGg3ZqYI17Ra3NcPltBA",
  NOTIFY_EMAIL:     "kubegraf@gmail.com",
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData ? e.postData.contents : "{}");

    const type = (data.type || "waitlist").trim();

    // ── Feedback submissions ─────────────────────────────────────────────────
    if (type === "feedback") {
      const ts        = new Date().toISOString();
      const rating    = String(data.rating    || "").trim();
      const category  = (data.category  || "general").trim();
      const message   = (data.message   || "").trim();
      const email     = (data.email     || "").trim();
      const page      = (data.page      || "").trim();
      const userAgent = (data.userAgent || "").trim();

      if (!message) return respond({ result: "error", error: "Message required." });

      const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
      let fSheet = ss.getSheetByName(CONFIG.FEEDBACK_SHEET);

      // Create the Feedback sheet with headers if it doesn't exist yet
      if (!fSheet) {
        fSheet = ss.insertSheet(CONFIG.FEEDBACK_SHEET);
        fSheet.appendRow(["Timestamp", "Rating", "Category", "Message", "Email", "Page", "UserAgent"]);
        fSheet.setFrozenRows(1);
        fSheet.setColumnWidth(4, 400); // wider column for Message
      }

      fSheet.appendRow([ts, rating, category, message, email, page, userAgent]);

      const ratingLabel = { "1": "😞 Very poor", "2": "😕 Poor", "3": "😐 Okay", "4": "😊 Good", "5": "😍 Excellent" }[rating] || "—";

      MailApp.sendEmail({
        to: CONFIG.NOTIFY_EMAIL,
        subject: "💬 New Feedback [" + category + "]: " + (message.substring(0, 60)) + (message.length > 60 ? "…" : ""),
        body: [
          "New feedback submission on kubegraf.io",
          "",
          "Timestamp: " + ts,
          "Rating:    " + ratingLabel,
          "Category:  " + category,
          "Message:   " + message,
          "Email:     " + (email || "—"),
          "Page:      " + (page  || "—"),
          "",
          "View sheet: https://docs.google.com/spreadsheets/d/" + CONFIG.SPREADSHEET_ID,
        ].join("\n"),
      });

      return respond({ result: "success" });
    }

    // ── Waitlist & Demo submissions ──────────────────────────────────────────
    const ts       = new Date().toISOString();
    const email    = (data.email    || "").trim();
    const name     = (data.name     || "").trim();
    const company  = (data.company  || "").trim();
    const role     = (data.role     || "").trim();
    const teamSize = (data.teamSize || "").trim();
    const clusters = (data.clusters || "").trim();
    const useCase  = (data.useCase  || "").trim();

    if (!email) return respond({ result: "error", error: "Email required." });

    const sheet = SpreadsheetApp
      .openById(CONFIG.SPREADSHEET_ID)
      .getSheetByName(CONFIG.SHEET_NAME);

    sheet.appendRow([ts, email, name, company, role, teamSize, clusters, type, useCase]);

    const isDemo = type === "demo";

    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAIL,
      subject: isDemo
        ? "🎯 Demo Request: " + (company || name || email)
        : "🚀 New Waitlist Signup: " + (name || email),
      body: [
        isDemo ? "New DEMO REQUEST on kubegraf.io" : "New waitlist signup on kubegraf.io",
        "",
        "Timestamp: " + ts,
        "Email:     " + email,
        "Name:      " + name,
        "Company:   " + company,
        "Role:      " + role,
        "Team Size: " + (teamSize || "—"),
        "Clusters:  " + (clusters || "—"),
        isDemo ? "Use Case:  " + (useCase || "—") : "",
        "",
        "View sheet: https://docs.google.com/spreadsheets/d/" + CONFIG.SPREADSHEET_ID,
      ].filter(line => line !== "").join("\n"),
    });

    return respond({ result: "success" });

  } catch (err) {
    return respond({ result: "error", error: err.message });
  }
}

function respond(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
