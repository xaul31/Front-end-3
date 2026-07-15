import { useState } from 'react';
import { DIETAS, calcularIMC, obtenerCategoria } from '../dietas.js';

export default function CalculadoraIMC() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [objetivo, setObjetivo] = useState('mantener');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [cargandoIA, setCargandoIA] = useState(false);
  const [recomendacionIA, setRecomendacionIA] = useState(null);

  async function manejoSubmit(e) {
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
    setResultado({ imc, ...DIETAS[categoria] });

    // Pedimos la recomendación personalizada a la IA.
    setRecomendacionIA(null);
    setCargandoIA(true);

    try {
      const respuesta = await fetch('/api/recomendacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ peso: pesoNum, altura: alturaNum, imc, categoria, objetivo }),
      });

      if (!respuesta.ok) throw new Error('Error en la respuesta');

      const data = await respuesta.json();
      setRecomendacionIA(data);
      localStorage.setItem('recomendacionIA', JSON.stringify(data));
    } catch (err) {
      console.error('Error obteniendo recomendación IA:', err);
      // Si falla, no rompemos nada: la dieta estática ya se muestra igual
    } finally {
      setCargandoIA(false);
    }
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

        <label htmlFor="objetivo">¿Cuál es tu objetivo?</label>
        <select
          id="objetivo"
          value={objetivo}
          onChange={(e) => setObjetivo(e.target.value)}
        >
          <option value="bajar">Bajar de peso</option>
          <option value="subir">Subir de peso</option>
          <option value="mantener">Mantener mi peso</option>
          <option value="musculatura">Ganar musculatura</option>
        </select>

        <button type="submit" className="btn btn-primary">Calcular</button>
      </form>

      {error && <p className="form-error">{error}</p>}

      {resultado && (
        <div>
          <p>IMC: {resultado.imc.toFixed(1)}</p>
          <h4>Categoría: {obtenerCategoria(resultado.imc)}</h4>
          <p>{resultado.calorias}</p>
          <div className="row">
            <div className="col-md-4">
              <h4>Consejos</h4>
              <ul>
                {resultado.consejos.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="col-md-4">
              <h4>Alimentos recomendados</h4>
              <ul>
                {resultado.recomendados.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="col-md-4">
              <h4>Alimentos a evitar</h4>
              <ul>
                {resultado.evitar.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {cargandoIA && <p>Generando tu recomendación personalizada con IA...</p>}

          {recomendacionIA && (
            <div className="imc-recommendation">
              <h3>Recomendación personalizada (IA)</h3>
              <p><strong>Calorías sugeridas:</strong> {recomendacionIA.dieta.calorias}</p>

              <div className="row">
                <div className="col-md-6">
                  <h4>Alimentos recomendados</h4>
                  <ul>
                    {recomendacionIA.dieta.recomendados.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <h4>Alimentos a evitar</h4>
                  <ul>
                    {recomendacionIA.dieta.evitar.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <h4>Rutina de ejercicios</h4>
              <ul>
                {recomendacionIA.ejercicios.map((ej, i) => (
                  <li key={i}>
                    <strong>{ej.nombre}</strong> — {ej.series}
                    <br />
                    {ej.descripcion}
                  </li>
                ))}
              </ul>

              <p><em>{recomendacionIA.notas}</em></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}