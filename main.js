const btn = document.querySelector(".click-button");
// const icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-9Q0HbIRaLfEaEfsc-VrhnNMrAxvFddth6Q&s";
const icon = "google-message-icon.png";

if (btn) {
    btn.addEventListener("click", () => {
        pushMessage("Button Clicked", "This is a notification from Hamza Nawabi for testing", icon, "notify_me");
    });
}

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        setInterval(() => {
            pushMessage("Please come back!", "We miss you!", icon, "notify_me");
        }, 5000);
    } else {
        pushMessage("Welcome back!", "We are happy to see you again!", icon, "notify_me");
    }
});

let num = 0;
async function pushMessage(title, body, icon, tag) {
    num += 1;
    console.log("Notification permission status:", Notification.permission);

    const error = document.querySelector(".error");
    const success = document.querySelector(".success");
    const alert = document.querySelector(".alert-success");

    if (error) error.textContent = ""; // Clear previous messages
    if (success) success.textContent = "";
    if (alert) alert.textContent = "";

    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            if (success) success.textContent = "✅ Notification permission granted!";

            const notification = new Notification(title, {
                body: body,
                icon: icon,
                tag: tag,
                // requireInteraction: true, // Keeps the notification open
                renotify: true, // Resend notification if already there
                // silent: true, // Sound alert
                // vibrate: [200, 100, 200], // Vibrate alert
                data: {
                    url: "https://hamzanawabi.com",
                    id: num,
                },
            });

            notification.onclick = () => {
                console.log("🟢 Notification clicked.");
            };

            notification.onclose = (e)=>{
                console.log("🔴 Notification closed.");
            }

            notification.onerror = (e) => {
                console.error("❌ Notification error:", e);
            };

        } else {
            if (error) error.textContent = "❌ Notification permission denied!";
        }
    } catch (err) {
        if (error) error.textContent = `❌ Error: ${err}`;
        console.error("Error requesting notification permission:", err);
    }
}
