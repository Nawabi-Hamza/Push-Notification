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
        "Hello World",
        "This is a test message",
        "google-messages-icon.png",
        "Test-Notification",
        "https://github.com/Nawabi-Hamza/notfication-manager"
      );
    });
  } else {
    console.error("❌ Button not found in the document.");
  }
});
