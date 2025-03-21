const btn = document.querySelector(".click-button");

const notifier = new NotificationManager();
notifier.requestPermission();

document.addEventListener("DOMContentLoaded", () => {
    notifier.sendNotification("Hello Nawabi", "😊 Page Loaded Bro!");
    btn.addEventListener("click", () => {
        notifier.sendNotification("Hello Nawabi", "👆🏻 You clicked the button!");
    });
})

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    notifier.autoNotifyWhenHidden("Hello Nawabi", "🤔 You are still here?", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPNLA6Vl3xMbPDlgEMFb3QP04Xi0fpgIdfNQ&s", 30000);
  }else{
    notifier.sendNotification("Hello Nawabi", "👋🏻 Welcome back!");
  }
});
