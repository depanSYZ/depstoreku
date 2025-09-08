export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ success: false, message: "Nama dan pesan wajib diisi" });
  }

  // 🔑 Token & Chat ID
  const TELEGRAM_TOKEN = "7665749536:AAGg4XWYm7iMjz8jgxmofXuxKpbvHtpOCG8";
  const CHAT_ID = "8351788531";

  // ID unik & waktu lokal
  const commentId = Math.floor(10000 + Math.random() * 90000);
  const waktu = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

  // Format pesan pake code block ```
  const text = `
\`\`\`
💬 KOMENTAR BARU MASUK!
━━━━━━━━━━━━━━━
🆔 ID       : #${commentId}
👤 Nama     : ${name}
📝 Komentar : ${message}
⏰ Waktu    : ${waktu}
━━━━━━━━━━━━━━━
\`\`\`
`;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "MarkdownV2" // biar ``` kebaca
      }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Gagal kirim ke Telegram" });
  }
}
