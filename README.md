# FitLife — Documentación de la API de recomendación

Este repositorio contiene una pequeña aplicación frontend con un endpoint de API que genera recomendaciones de dieta y ejercicios basadas en los datos del usuario.

## Descripción de la implementación

- Archivo principal de la API: `api/recomendacion.js`.
- Tipo de endpoint: POST (solo se aceptan solicitudes POST)

### Flujo de la petición

1. Validación inicial:
   - El endpoint verifica que el método sea `POST`. Si no, responde con `405 Method Not Allowed`.
   - Se extraen los campos esperados del cuerpo de la petición: `peso`, `altura`, `imc`, `categoria`, `objetivo`.
   - Si falta alguno de los campos, devuelve `400 Bad Request` con un mensaje de error.

2. Preparación del prompt:
   - Se arma un `systemPrompt` que obliga al asistente a devolver únicamente un JSON válido con un formato concreto:
     {
       "dieta": { "calorias": "string", "recomendados": ["string"], "evitar": ["string"] },
       "ejercicios": [ { "nombre": "string", "series": "string", "descripcion": "string" } ],
       "notas": "string"
     }
   - Se arma un `userPrompt` que incluye los datos recibidos (`peso`, `altura`, `imc`, `categoria`, `objetivo`) para personalizar la recomendación.

3. Llamada al proveedor (Groq):
   - Se realiza una petición `POST` a `https://api.groq.com/openai/v1/chat/completions` usando `fetch` desde el servidor.
   - Encabezados: `Authorization: Bearer ${process.env.GROQ_API_KEY}` y `Content-Type: application/json`.
   - Se usa el modelo `llama-3.3-70b-versatile` y `temperature: 0.7`.

4. Procesamiento de la respuesta:
   - Se valida el estado de la respuesta; si no es OK, se lanza un error.
   - Se extrae `data.choices[0].message.content` y se limpia eliminando backticks (```json```), por si el modelo los incluyó.
   - Se parsea el contenido con `JSON.parse()` y se devuelve como respuesta con `200 OK`.

5. Manejo de errores:
   - Errores de validación del cliente → `400`.
   - Errores de método HTTP → `405`.
   - Errores del proveedor o del servidor → `500` y un mensaje genérico.

## Requisitos y variables de entorno

- Node.js (recomendado >= 18) y npm.
- Variable de entorno obligatoria en el servidor: `GROQ_API_KEY` (coloca la clave en `.env` o en la configuración del hosting).

Ejemplo `.env`:

GROQ_API_KEY=tu_api_key_aqui

## Cómo ejecutar en desarrollo

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en modo desarrollo (según el proyecto puede ser `npm run dev`):

```bash
npm run dev
```

3. Consumir el endpoint desde el frontend o con `fetch`/Postman haciendo una petición `POST` a la ruta correspondiente. Si usas un servidor estático + funciones (por ejemplo Vercel), la ruta será `/api/recomendacion`.

Payload esperado (JSON):

```json
{
  "peso": 70,
  "altura": 175,
  "imc": 22.9,
  "categoria": "Normal",
  "objetivo": "ganar_masa"
}
```

Respuesta esperada (ejemplo):

```json
{
  "dieta": { "calorias": "2500", "recomendados": ["pollo", "arroz"], "evitar": ["azúcar"] },
  "ejercicios": [ { "nombre": "Sentadillas", "series": "4x8", "descripcion": "..." } ],
  "notas": "..."
}
```

## Notas de seguridad y despliegue

- Nunca subir `GROQ_API_KEY` al repositorio. Añade `.env` a `.gitignore` si no está ya.
- Limitar el tamaño de las peticiones y sanitizar los datos si el endpoint se expone públicamente.
- Considerar caché o límites de frecuencia para evitar costes elevados por consultas al modelo.

## Archivos relevantes

- `api/recomendacion.js` — implementación del endpoint que genera la recomendación.
- `src/` — código frontend que consume la API.

---

Si quieres, puedo también:
- Añadir ejemplos de tests unitarios para validar el parsing de la respuesta.
- Añadir un archivo `.github/workflows/ci.yml` para ejecutar checks o desplegar.

Saludos — README generado automáticamente describiendo la API y su uso.
# FitLife

Aplicación web creada con React y Vite para calcular el IMC y mostrar recomendaciones personalizadas de dieta y ejercicio según la categoría obtenida.

## Características

- Cálculo de IMC a partir de peso y altura.
- Recomendaciones de alimentación según la categoría de IMC.
- Rutinas de ejercicios adaptadas al resultado.
- Inicio de sesión y registro básico con almacenamiento local.
- Panel de perfil para ver datos, dieta y ejercicios recomendados.

## Tecnologías

- React 19
- Vite
- React Router DOM
- Oxlint
- LocalStorage para persistencia básica

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre la URL que aparece en la terminal, normalmente `http://localhost:5173`.

## Scripts disponibles

- `npm run dev`: inicia el entorno de desarrollo.
- `npm run build`: genera la versión de producción.
- `npm run preview`: previsualiza la build generada.
- `npm run lint`: ejecuta Oxlint sobre el proyecto.

## Estructura general

- `src/CalculadoraIMC.jsx`: lógica principal del cálculo de IMC y recomendaciones.
- `src/login.jsx`: formulario de acceso y registro.
- `src/perfil.jsx`: panel del usuario con dieta, ejercicios y edición de perfil.
- `src/App.jsx`: navegación entre vistas principales.

## Notas

- Los datos del usuario se guardan en el navegador mediante `localStorage`.
- Este proyecto es una base funcional y puede ampliarse con autenticación real, backend y persistencia en base de datos.
