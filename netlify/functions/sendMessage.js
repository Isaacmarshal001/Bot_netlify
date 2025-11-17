import fetch from "node-fetch";

export default async (event, context) => {
  
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const message = `
Good Morning,

We start trading soon

@New_Age_Fx  NewAge.co
`;

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
      body: "Message sent successfully."
    };

  } catch (err) {
    console.error("Error sending Telegram message:", err);

    return {
      statusCode: 500,
      body: "Failed to send message."
    };
  }
}
