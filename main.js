/**
 * NotificationManager.js
 * © 2025 Hamza Nawabi. All rights reserved.
 * Email: hamza.nawabi119@gmail.com
 * WhatsApp: +93 766420877
 * Created: March 18, 2025
 */

class NotificationManager {
    // constructor(serviceWorkerPath = "sw.js") {
    constructor(serviceWorkerPath = "/sw.js") {
        this.hiddenInterval = null;
        this.serviceWorkerPath = serviceWorkerPath;
        this.initServiceWorker();
    }

    // ✅ Register Service Worker
    async initServiceWorker() {
        if ("serviceWorker" in navigator) {
            try {
                const reg = await navigator.serviceWorker.register(this.serviceWorkerPath);
                console.log("✅ Service Worker Registered");
            } catch (error) {
                console.error("❌ SW Registration Failed:", error);
            }
        } else {
            console.warn("⚠️ Service Worker not supported in this browser.");
        }
    }

    // ✅ Request Notification Permission
    async requestPermission() {
        try {
            const permission = await Notification.requestPermission();
            if (permission !== "granted") {
                console.warn("⚠️ Notifications permission denied.");
            }
            return permission;
        } catch (error) {
            console.error("❌ Error requesting permission:", error);
            return "denied";
        }
    }

    // ✅ Send Notification (Safe handling)
    async sendNotification(title, body, icon , tag , url ) {
        if (!("Notification" in window)) {
            console.warn("🚨 Notifications not supported.");
            return;
        }
        if (Notification.permission !== "granted") {
            console.warn("🚨 Notifications are not allowed.");
            return;
        }
        const finalURL = url || "https://github.com/Nawabi-Hamza";
        const options = {
            body: body || "You have a new message.",
            icon: icon || "https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/two-way-chat-bubble-icon.png",
            tag: tag || "notify" ,
            url: finalURL
        };

        try {
            if ("serviceWorker" in navigator) {
                const reg = await navigator.serviceWorker.getRegistration();
                if (reg) {
                    reg.showNotification(title, options);
                } else {
                    console.warn("🚨 Service Worker not registered yet.");
                    new Notification(title, options);
                }
            } else {
                new Notification(title, options);
            }
        } catch (error) {
            console.error("❌ Error sending notification:", error);
        }
    }

    // ✅ Auto Reminder When User Leaves
    autoNotifyWhenHidden(title, body, icon, tag, url, interval = 60000) {
        document.addEventListener("visibilitychange", () => {
            const finalURL = url || "https://github.com/Nawabi-Hamza";
            if (document.visibilityState === "hidden") {
                if (this.hiddenInterval) return; // ✅ Prevent duplicate intervals

                this.hiddenInterval = setInterval(() => {
                    this.sendNotification(title, body, icon, tag, finalURL);
                }, interval);
            } else {
                clearInterval(this.hiddenInterval);
                this.hiddenInterval = null;
                this.sendNotification("Welcome Back!", "👋🏻 We're happy to see you!", icon, tag, finalURL);
            }
        });
    }
}
// ✅ Make it available globally
// window.NotificationManager = NotificationManager;

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
