import { useState } from 'react';

// Calcula el IMC a partir del peso en kilogramos y la altura en centímetros.
function calcularIMC(peso, alturaCm) {
  const alturaM = alturaCm / 100;
  return peso / (alturaM * alturaM);
}

// Devuelve la categoría de IMC según el valor calculado.
function obtenerCategoria(imc) {
  if (imc < 18.5) return 'bajo';
  if (imc < 25) return 'normal';
  if (imc < 30) return 'sobrepeso';
  return 'obesidad';
}

export const DIETAS = {
  bajo: {
    calorias: '2,800 – 3,400 kcal/día aprox.',
    consejos: [
      'Aumenta el tamaño de las porciones sin saltarte comidas. ',
      'Prioriza alimentos calóricos pero nutritivos (frutos secos, aguacate, aceite de oliva). ',
      'Suma una colación extra entre comidas principales. ',
    ],
    recomendados: [
      'Avena, pan integral y otros carbohidratos complejos ',
      'Huevos, pollo, pescado y legumbres ',
      'Frutos secos, mantequilla de maní, aguacate ',
      'Lácteos enteros (leche, yogur, queso) ',
    ],
    evitar: [
      'Saltarse comidas ',
      'Llenarse solo con líquidos antes de comer ',
      'Comida chatarra como única fuente de calorías extra ',
    ],
  },
  normal: {
    calorias: '2,000 – 2,400 kcal/día aprox. ',
    consejos: [
      'Mantén un horario de comidas regular. ',
      'Busca variedad: distintos colores de frutas y verduras en el día. ',
      'Hidrátate bien durante el día. ',
    ],
    recomendados: [
      'Frutas y verduras variadas ',
      'Cereales integrales (arroz, quinoa, pan integral) ',
      'Proteínas magras (pollo, pescado, legumbres) ',
      'Grasas saludables (aceite de oliva, frutos secos) ',
    ],
    evitar: [
      'Exceso de azúcar refinada ',
      'Ultraprocesados frecuentes ',
      'Bebidas azucaradas ',
    ],
  },
  sobrepeso: {
    calorias: '1,600 – 2,000 kcal/día aprox.',
    consejos: [
      'Reduce las porciones gradualmente, sin dietas extremas. ',
      'Prioriza vegetales para generar saciedad con menos calorías. ',
      'Evita comer frente a pantallas para notar mejor la saciedad. ',
    ],
    recomendados: [
      'Verduras y ensaladas en abundancia ',
      'Proteínas magras (pollo, pavo, pescado, claras de huevo) ',
      'Cereales integrales en porciones moderadas ',
      'Agua como bebida principal ',
    ],
    evitar: [
      'Harinas y azúcares refinados ',
      'Frituras y comida rápida ',
      'Alcohol y bebidas azucaradas ',
    ],
  },
  obesidad: {
    calorias: '1,200 – 1,600 kcal/día aprox.',
    consejos: [
      'Prioriza cambios sostenibles antes que restricciones drásticas. ',
      'Idealmente busca acompañamiento de un profesional de salud. ',
      'Aumenta el consumo de fibra para mayor saciedad. ',
    ],
    recomendados: [
      'Verduras cocidas o al vapor en gran cantidad ',
      'Proteínas magras en porciones controladas ',
      'Frutas bajas en azúcar ',
      'Agua e infusiones sin azúcar ',
    ],
    evitar: [
      'Azúcar en todas sus formas ',
      'Harinas blancas y grasas saturadas ',
      'Alcohol, refrescos y jugos industriales ',
      'Comida ultraprocesada ',
    ],
  },
};

export const RUTINAS = {
  bajo: {
    objetivo: 'Ganar masa muscular y fuerza',
    frecuencia: '4 días a la semana',
    duracion: '45-60 min por sesión',
    ejercicios: [
      { nombre: 'Sentadillas', series: '4 series x 8-10 reps' },
      { nombre: 'Press de banca (o flexiones)', series: '4 series x 8-10 reps' },
      { nombre: 'Peso muerto', series: '3 series x 8 reps' },
      { nombre: 'Remo con barra o mancuernas', series: '4 series x 8-10 reps' },
      { nombre: 'Press militar', series: '3 series x 8-10 reps' },
      { nombre: 'Dominadas o jalón al pecho', series: '3 series x 6-8 reps' },
    ],
    notas: 'Prioriza cargas progresivas (aumentar peso semana a semana) y descansa 48h entre grupos musculares similares. Evita exceso de cardio, ya que puede dificultar la ganancia de masa.',
  },
  normal: {
    objetivo: 'Mantener condición física general',
    frecuencia: '3-4 días a la semana',
    duracion: '40-50 min por sesión',
    ejercicios: [
      { nombre: 'Trote o caminata rápida', series: '20-30 min' },
      { nombre: 'Sentadillas', series: '3 series x 12 reps' },
      { nombre: 'Flexiones de brazo', series: '3 series x 10-12 reps' },
      { nombre: 'Plancha abdominal', series: '3 series x 30-45 seg' },
      { nombre: 'Zancadas', series: '3 series x 10 reps por pierna' },
      { nombre: 'Remo con mancuernas', series: '3 series x 12 reps' },
    ],
    notas: 'Combina cardio moderado con fuerza para mantener composición corporal. Varía la rutina cada 4-6 semanas para evitar estancamiento.',
  },
  sobrepeso: {
    objetivo: 'Reducir grasa corporal preservando masa muscular',
    frecuencia: '4-5 días a la semana',
    duracion: '40-50 min por sesión',
    ejercicios: [
      { nombre: 'Caminata rápida o cicloergómetro', series: '30 min' },
      { nombre: 'Circuito: sentadillas + flexiones + plancha', series: '3 rondas x 45 seg cada uno' },
      { nombre: 'Step-ups (subir a un escalón)', series: '3 series x 12 reps por pierna' },
      { nombre: 'Remo sentado (máquina o banda elástica)', series: '3 series x 12 reps' },
      { nombre: 'Elevaciones de rodilla', series: '3 series x 15 reps' },
    ],
    notas: 'Prioriza ejercicios de bajo impacto para cuidar articulaciones. El cardio moderado sostenido ayuda a generar un déficit calórico sin sobrecargar el cuerpo.',
  },
  obesidad: {
    objetivo: 'Mejorar movilidad y comenzar actividad física de forma segura',
    frecuencia: '3-4 días a la semana',
    duracion: '20-30 min por sesión',
    ejercicios: [
      { nombre: 'Caminata a paso moderado', series: '15-20 min' },
      { nombre: 'Ejercicios de movilidad articular (cuello, hombros, cadera)', series: '5-10 min' },
      { nombre: 'Sentadillas asistidas (apoyo en silla)', series: '2 series x 8-10 reps' },
      { nombre: 'Elevaciones de brazos con banda elástica liviana', series: '2 series x 10 reps' },
      { nombre: 'Ejercicios en el agua (si hay acceso a piscina)', series: '15-20 min' },
    ],
    notas: 'Se recomienda evaluación médica antes de iniciar. Prioriza actividades de bajo impacto (caminar, agua) y avanza gradualmente en intensidad y duración.',
  },
};

// Muestra el formulario, valida los datos y guarda la recomendación según el IMC.
export default function CalculadoraIMC() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  // Procesa el formulario, calcula el IMC y guarda el resultado en localStorage.
  function manejoSubmit(e) {
    e.preventDefault();

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (!pesoNum || !alturaNum || pesoNum <= 0 || alturaNum <= 0) {
      setError('Ingresa un peso y una altura válidos.');
      setResultado(null);
      return;
    }

    setError('');
    const imc = calcularIMC(pesoNum, alturaNum);
    const categoria = obtenerCategoria(imc);
    const dieta = DIETAS[categoria];
    localStorage.setItem('ultimoIMC', JSON.stringify({ imc, categoria }));
    localStorage.setItem('recomendacionIA', JSON.stringify(dieta));
    setResultado({ imc, categoria, ...dieta });
  }

  return (
    <div className="container">
      <h1 className="display-4">Calculadora de IMC</h1>
      <p>
        Ingresa tu peso (kg) y altura (cm) para calcular tu Índice de Masa Corporal (IMC).
      </p>

      <form onSubmit={manejoSubmit}>
        <label htmlFor="peso">Peso (kg):</label>
        <input
          id="peso"
          type="number"
          step="0.1"
          min="1"
          placeholder="Ej: 70"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />

        <label htmlFor="altura">Altura (cm):</label>
        <input
          id="altura"
          type="number"
          step="0.1"
          min="1"
          placeholder="Ej: 170"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />

        <button type="submit" className="btn btn-primary">Calcular</button>
      </form>

      {error && <p>{error}</p>}

      {resultado && (
        <div>
          <p>IMC: {resultado.imc.toFixed(1)}</p>
          <h4>Categoría: {obtenerCategoria(resultado.imc)}</h4>
          <p>{resultado.calorias}</p>
          <div className="row">
            <div className="col-md-4">
              <h4>Consejos</h4>
              <ul>
                {resultado.consejos}
              </ul>
            </div>
            <div className="col-md-4">
              <h4>Alimentos recomendados</h4>
              <ul>
                {resultado.recomendados}
              </ul>
            </div>
            <div className="col-md-4">
              <h4>Alimentos a evitar</h4>
              <ul>
                {resultado.evitar}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}