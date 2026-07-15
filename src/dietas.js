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

export function calcularIMC(peso, alturaCm) {
  const alturaM = alturaCm / 100;
  return peso / (alturaM * alturaM);
}


export function obtenerCategoria(imc) {
  if (imc < 18.5) return 'bajo';
  if (imc < 25) return 'normal';
  if (imc < 30) return 'sobrepeso';
  return 'obesidad';
}
