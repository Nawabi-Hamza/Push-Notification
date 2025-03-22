document.addEventListener("DOMContentLoaded", () => {
  const notify = new NotificationManager("/sw.js");
  notify.requestPermission();

  const button = document.querySelector(".click-button");
  if (button) {
    button.addEventListener("click", () =>
      notify.sendNotification(
        "Hello World",
        "This is a test message",
        "google-messages-icon.png",
        "Test-Notification",
        "https://github.com/Nawabi-Hamza"
      )
    );
  } else {
    console.error("❌ Button not found in the document.");
  }
});
