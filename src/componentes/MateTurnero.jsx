import { useEffect, useState, useCallback } from "react";
import Participantes from "./Participantes";
import TurnDisplay from "./TurnDisplay";
import '../App.css'

const getParsedData = (key, defaultValue) => {
  const storedData = localStorage.getItem(key);
  try {
    return storedData ? JSON.parse(storedData) : defaultValue;
  } catch (e) {
    console.error(`Error parsing ${key}:`, e);
    return defaultValue; // fallback to default if parsing fails
  }
};

const MateTurnero = () => {
  const [participantes, setParticipantes] = useState(()=> getParsedData("participantes", []));
    
  const [turnoActual, setTurnoActual] = useState(getParsedData("turnoActual", 0));
  const [tiempoPorTurno, setTiempoPorTurno] = useState(getParsedData(localStorage.getItem("tiempoPorTurno"), 120))
  
  const [tiempoRestante, setTiempoRestante] = useState(tiempoPorTurno);
  const [tiempoComenzado, setTiempoComenzado] = useState(false);
const [mostrarInstrucciones, setMostrarInstrucciones] = useState(false);

  useEffect(() => {
    localStorage.setItem("participantes", JSON.stringify(participantes));
    localStorage.setItem("turnoActual", JSON.stringify(turnoActual));
    localStorage.setItem("tiempoPorTurno", JSON.stringify(tiempoPorTurno));
  }, [participantes, turnoActual, tiempoPorTurno]);

  useEffect(() => {
    if (tiempoComenzado && tiempoRestante > 0) {
      const tiempo = setTimeout(
        () => setTiempoRestante((prev) => prev - 1),
        1000
      );
      return () => clearTimeout(tiempo);
    }else if (tiempoRestante === 0) {
        siguienteTurno()
    }
  }, [tiempoRestante, tiempoComenzado]);

  const agregarMatero = (nombre) => {
      setParticipantes((prev) => [...prev, nombre]);
      if (participantes.length === 0) setTiempoComenzado(true);
    }

   const eliminarMatero = (index)=>{
setParticipantes((prev) =>{
    const nuevaLista = prev.filter((_, i) => i !== index);
    if (nuevaLista.length === 0) {
        setTiempoComenzado(false)
        setTurnoActual(0)
    }else if (index === turnoActual){
        setTurnoActual((prev)=> (prev >= nuevaLista.length  ? 0 : prev))
    }
    return nuevaLista;
   });
   };

  const siguienteTurno = () => {
    setTurnoActual((prev) => (prev + 1) % participantes.length);
    setTiempoRestante(tiempoPorTurno);
    setTiempoComenzado(true);
  };

  return (
    <section className="text-center">
      <h2>🧉 Bienvenidos a la Ronda de Mates ☕</h2>
      <div>
        <button
          className="btn btn-primary my-2"
          onClick={() => setMostrarInstrucciones(!mostrarInstrucciones)}
        >
          {mostrarInstrucciones ? "Ocultar" : "Instrucciones"}
        </button>
        <img
          src="https://inym.org.ar/imagenes/archivos/noticias/78918_listaImagenes-0_1088x650xrecortarxagrandar.jpg?random=1603901512"
          alt=""
          className="banner"
        />
      </div>

      {mostrarInstrucciones && (
        <div className="introduccion p-3 border rounded">
          <p>
            Este sistema te ayuda a organizar el turno de cada matero en una
            ronda de mates. ¡Así nadie se queda sin su mate!
          </p>
          <h4>🔹 ¿Cómo funciona?</h4>
          <ul className="text-start d-inline-block">
            <li>
              <strong>1️⃣ Selecciona el tiempo</strong> (en segundos) que cada
              persona tendrá para tomar su mate.
            </li>
            <li>
              <strong>2️⃣ Agrega los materos</strong> a la lista en el orden en
              que tomarán.
            </li>
            <li>
              <strong>3️⃣ El tiempo comienza automáticamente</strong> cuando
              agregas al primer matero.
            </li>
          </ul>
          <h4>🎯 Funcionalidad de los botones</h4>
          <ul className="text-start d-inline-block">
            <li>
              <strong>✅ Pasar Mate:</strong> Finaliza el turno actual y pasa el
              mate al siguiente matero de la lista.
            </li>
            <li>
              <strong>❌ Gracias:</strong> Si un matero ya no quiere seguir en
              la ronda, puede presionar este botón para salir de la lista.
            </li>
          </ul>
          <p>¡Que disfruten la ronda! 🧉🔥</p>
        </div>
      )}

      <div>
        <label className="d-flex justify-content-center flex-column fw-bold fs-5">
          Tiempo por turno (segundos):
          <input
            type="number"
            value={tiempoPorTurno}
            onChange={(e) => setTiempoPorTurno(Number(e.target.value))}
            className="w-25 text-center m-auto mt-2"
          />
        </label>
      </div>
      <div className="d-flex justify-content-center flex-column mt-3">
        <h4 className="fw-bold fs-5">Agregar Materos</h4>
        <Participantes
          agregarMatero={agregarMatero}
          participantes={participantes}
        />
      </div>
      <div>
        {participantes.length > 0 && (
          <TurnDisplay
            participantes={participantes}
            turnoActual={turnoActual}
            tiempoRestante={tiempoRestante}
            siguienteTurno={siguienteTurno}
            eliminarMatero={eliminarMatero}
          />
        )}
      </div>
    </section>
  );
};

export default MateTurnero;
