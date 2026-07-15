export default async function handler(req, res) {
  // 1. Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  } // codigo 405 es el estándar para indicar que el método HTTP usado no está permitido para este endpoint

  // 2. Extraer los datos que manda el frontend
  const { peso, altura, imc, categoria, objetivo } = req.body;

  // 3. Validación básica
  if (!peso || !altura || !imc || !categoria || !objetivo) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  // codigo 400 es el estándar para indicar que la solicitud no se puede procesar debido a un error del cliente, como datos faltantes o inválidos.

  // 4. Armar el prompt — acá es donde defines EXACTAMENTE qué formato quieres de vuelta
  const systemPrompt = `Eres un asistente de nutrición y ejercicio físico.
Responde ÚNICAMENTE con un JSON válido, sin texto adicional antes ni después, con este formato exacto:
{
  "dieta": { "calorias": "string", "recomendados": ["string"], "evitar": ["string"] },
  "ejercicios": [ { "nombre": "string", "series": "string", "descripcion": "string" } ],
  "notas": "string"
}`;

  const userPrompt = `Datos del usuario:
- Peso: ${peso} kg
- Altura: ${altura} cm
- IMC: ${imc.toFixed(1)} (categoría: ${categoria})
- Objetivo: ${objetivo}

Genera una dieta y una rutina de ejercicios (4-5 ejercicios) personalizada para este perfil y objetivo.`;

  try {
    // 5. Llamada a Groq
    const respuestaGroq = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, // la key vive SOLO acá, en el servidor
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!respuestaGroq.ok) {
      throw new Error(`Groq respondió con estado ${respuestaGroq.status}`);
    }

    const data = await respuestaGroq.json();

    // 6. Extraer el texto y limpiar para obtener el JSON
    const contenido = data.choices[0].message.content;
    const limpio = contenido.replace(/```json|```/g, '').trim(); // por si el modelo agrega backticks
    const recomendacion = JSON.parse(limpio);

    // 7. Responder al frontend
    return res.status(200).json(recomendacion);
    // codigo 200 es el estándar para indicar que la solicitud fue exitosa y que se devuelve la información solicitada.

  } catch (error) {
    console.error('Error llamando a Groq:', error);
    return res.status(500).json({ error: 'No se pudo generar la recomendación' });
  } // codigo 500 es el estándar para indicar que ocurrió un error en el servidor al procesar la solicitud.
}