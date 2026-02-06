import React from "react";
import FeedbackForm from "./FeedbackForm.jsx";

export default function QrEntry() {
  return (
    <main className="layout">
      <FeedbackForm source="qr" />
      <footer className="footer">
        Need help? Please ask our on-site team member.
      </footer>
    </main>
  );
}
