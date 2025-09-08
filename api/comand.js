export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ success: false, error: "Nama dan komentar wajib diisi" });
  }

  const TELEGRAM_TOKEN = "7665749536:AAGg4XWYm7iMjz8jgxmofXuxKpbvHtpOCG8";
  const CHAT_ID = "8351788531";

  const text = `📝 KOMENTAR BARU\n\n👤 Nama: ${name}\n💬 Komentar: ${message}`;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text
      }),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error kirim telegram:", err);
    return res.status(500).json({ success: false, error: "Gagal kirim ke Telegram" });
  }
}
