/**
 * NotificationManager.js
 * © 2025 Hamza Nawabi. All rights reserved.
 * Email: hamza.nawabi119@gmail.com
 * WhatsApp: +93 766420877
 * Created: March 18, 2025
 */

class NotificationManager {
  constructor(serviceWorkerPath = "/sw.js") {
    this.serviceWorkerPath = serviceWorkerPath;
    this.initServiceWorker();
  }

  // Register Service Worker
  async initServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const reg = await navigator.serviceWorker.register(
          this.serviceWorkerPath
        );
        console.log("✅ Service Worker Registered");
      } catch (error) {
        console.error("❌ SW Registration Failed:", error);
      }
    } else {
      console.warn("⚠️ Service Worker not supported in this browser.");
    }
  }

  // Request Notification Permission
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

  // Send Notification
  async sendNotification(title, body, icon, tag, url) {
    console.log("🔔 Sending notification...");
    if (!("Notification" in window)) {
      console.warn("🚨 Notifications not supported.");
      return;
    }
    if (Notification.permission !== "granted") {
      console.warn("🚨 Notifications are not allowed.");
      return;
    }
    const options = {
      body: body || "You have a new message.",
      icon:
        icon ||
        "https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/two-way-chat-bubble-icon.png",
      tag: tag || "notify",
      data: { url: url || "https://github.com/Nawabi-Hamza" },
    };

    try {
      if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) {
          reg.showNotification(title, options);
          console.log("✅ Notification sent via Service Worker");
        } else {
          console.warn("🚨 Service Worker not registered yet.");
          new Notification(title, options);
          console.log("✅ Notification sent via Notification API");
        }
      } else {
        new Notification(title, options);
        console.log("✅ Notification sent via Notification API");
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
        this.sendNotification(
          "Welcome Back!",
          "👋🏻 We're happy to see you!",
          icon,
          tag,
          finalURL
        );
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const notify = new NotificationManager("/sw.js");
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
        "https://github.com/Nawabi-Hamza"
      );
    });
  } else {
    console.error("❌ Button not found in the document.");
  }
});
