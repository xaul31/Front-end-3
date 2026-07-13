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
