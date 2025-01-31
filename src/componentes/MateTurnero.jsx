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
    <div className="text-center">
      <h1>Ronda de Mates</h1>
      <label>
        Tiempo por turno (segundos):
        <input 
        type="number"
        value={tiempoPorTurno}
        onChange={(e) => setTiempoPorTurno(Number(e.target.value))}
        />
      </label>
      <Participantes agregarMatero={agregarMatero} participantes={participantes} />
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
  );
};

export default MateTurnero;
