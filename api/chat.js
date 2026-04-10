export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      max_tokens: 1000,
      messages: [
        {
          role: "system",
          content: "أنت مساعد ذكي اسمك Foryou AI. تجيب دائماً بالعربية بأسلوب ودود وواضح ومفيد."
        },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "عذراً، لم أفهم السؤال.";
  res.status(200).json({ reply });
}
