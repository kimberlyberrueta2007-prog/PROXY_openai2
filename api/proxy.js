export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body;
  let url = "https://api.openai.com/v1/chat/completions";

  // 🔹 Si el modelo es de imágenes, cambia el endpoint
  if (body.model && body.model.startsWith("gpt-image")) {
    url = "https://api.openai.com/v1/images/generations";
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Bearer ${process.env.OPENAI_API_KEY},
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Error interno del proxy" });
  }
}
