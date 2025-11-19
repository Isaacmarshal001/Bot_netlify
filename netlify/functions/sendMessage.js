import fetch from "node-fetch";

export async function handler(event, context) {
  // Dynamic import required for node-fetch v3+
  const fetch = (await import("node-fetch")).default;

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  // Detect current day (Nigeria Time)
  const now = new Date();
  const options = { timeZone: "Africa/Lagos", weekday: "long" };
  const today = new Intl.DateTimeFormat("en-US", options).format(now);

  let message = "";

  // Weekday message (Monday–Friday)
  if (["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(today)) {
    message = `
Good Morning,

We start trading soon

@New_Age_Fx  NewAge.co
`;
  }

  // Saturday message
  if (today === "Saturday") {
    message = `
🌞 Happy Weekend — (${today})!

Enjoy your rest day traders.
See you next week!

@New_Age_Fx  NewAge.co
`;
  }

  // Sunday message
  if (today === "Sunday") {
    message = `
🌞 Happy Sunday!

A new trading week begins tomorrow.
Prepare your mind and stay focused 💹

@New_Age_Fx  NewAge.co
`;
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML"
      })
    });

    const data = await res.json();
    console.log("Telegram response:", data);

    return {
      statusCode: 200,
      body: `Message sent for: ${today}`
    };

  } catch (err) {
    console.error("ERROR sending Telegram message:", err);
    return {
      statusCode: 500,
      body: "Failed to send message."
    };
  }

};
