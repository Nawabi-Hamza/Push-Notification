// const btn = document.querySelector(".click-button");

// const notifier = new NotificationManager();
// notifier.requestPermission();

// document.addEventListener("DOMContentLoaded", () => {
//     notifier.sendNotification("Hello Nawabi", "😊 Page Loaded Bro!", "google-messages-icon.png", "Test-Notifcation","https://github.com/Nawabi-Hamza");
//     btn.addEventListener("click", () => {
//         notifier.sendNotification("Hello Nawabi", "👆🏻 You clicked the button!", "google-messages-icon.png", "Test-Notifcation","https://github.com/Nawabi-Hamza");
//     });
// })

// notifier.autoNotifyWhenHidden("Hello Nawabi", "🤔 You are still here?", "google-messages-icon-png", 30000, "https://github.com/Nawabi-Hamza");




document.addEventListener("DOMContentLoaded", () => {
    // const notify = new NotificationManager("https://cdn.jsdelivr.net/npm/@hamza-nawabi/notification-manager@2.4.7/sw.js");
    const notify = new NotificationManager("/sw.js");
    notify.requestPermission();

    const button = document.querySelector('button');
    if (button) {
        button.addEventListener("click", () => 
            notify.sendNotification('Hello World', "This is a test message", false, false, false)
        );
    } else {
        console.error("❌ Button not found in the document.");
    }
});
