const btn = document.querySelector(".click-button");

const notifier = new NotificationManager();
notifier.requestPermission();

document.addEventListener("DOMContentLoaded", () => {
    notifier.sendNotification("Hello Nawabi", "😊 Page Loaded Bro!", "google-messages-icon.png");
    btn.addEventListener("click", () => {
        notifier.sendNotification("Hello Nawabi", "👆🏻 You clicked the button!", "google-messages-icon.png");
    });
})

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    notifier.autoNotifyWhenHidden("Hello Nawabi", "🤔 You are still here?", "google-messages-icon-png", 30000);
  }else{
    notifier.sendNotification("Hello Nawabi", "👋🏻 Welcome back!");
  }
});
