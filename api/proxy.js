export default async function handler(req, res) {  
  try {  
    const body = await req.json();  
    const { prompt, isImage } = body;  

    const headers = {  
      "Content-Type": "application/json",  
      "Authorization": Bearer ${process.env.OPENAI_API_KEY},  
    };  

    const url = isImage  
      ? "https://api.openai.com/v1/images/generations"  
      : "https://api.openai.com/v1/chat/completions";  

    const payload = isImage  
      ? { model: "gpt-image-1", prompt, size: "512x512" }  
      : { model: "gpt-4o-mini", messages: [{ role: "user", content: prompt }] };  

    const response = await fetch(url, {  
      method: "POST",  
      headers,  
      body: JSON.stringify(payload),  
    });  

    const data = await response.json();  
    res.status(200).json(data);  
  } catch (error) {  
    res.status(500).json({ error: error.message });  
  }  
}
