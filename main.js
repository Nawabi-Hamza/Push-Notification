/**
 * NotificationManager.js
 * © 2025 Hamza Nawabi. All rights reserved.
 * Email: hamza.nawabi119@gmail.com
 * WhatsApp: +93 766420877
 * Created: March 18, 2025
 */


document.addEventListener("DOMContentLoaded", () => {
  const notify = new NotificationManager();
  notify.requestPermission();

  const button = document.querySelector(".click-button");
  if (button) {
    button.addEventListener("click", () => {
      console.log("🔘 Button clicked");
      notify.sendNotification(
        "Dear, Hamza Nawabi",
        "This is a test message for demo",
        "google-messages-icon.png",
        "Notification",
        "https://github.com/Nawabi-Hamza"
      );
    });
  } else {
    console.error("❌ Button not found in the document.");
  }
});
