import { useEffect, useState, useCallback } from "react";
import Participantes from "./Participantes";
import TurnDisplay from "./TurnDisplay";

const MateTurnero = () => {
const [participantes, setParticipantes] = useState([])
const [turnoActual, setTurnoActual] = useState(0);
const [tiempoRestante, setTiempoRestante] = useState(30)
const [tiempoComenzado, setTiempoComenzado] = useState(false)

useEffect(()=>{
    if (tiempoComenzado && tiempoRestante) {
        const tiempo = setTimeout(()=> setTiempoRestante((prev)=> prev - 1), 1000)
        return ()=> clearTimeout(tiempo)
    }else if (tiempoRestante === 0){
      siguienteTurno()
    }
}, [tiempoRestante, tiempoComenzado])

const agregarMatero = useCallback((nombre)=>{
    setParticipantes((prev)=> [...prev, nombre]);
    if(participantes.length === 0) setTiempoComenzado(true);

}, [participantes])

const siguienteTurno = ()=>{
    setTurnoActual((prev)=> (prev + 1) % participantes.length);
    setTiempoRestante(30);
    setTiempoComenzado(true);
}

  return <div>
    <h1>Ronda de Mates</h1>
    <Participantes agregarMatero={agregarMatero}/>
    {participantes.length > 0 && (
        <TurnDisplay
        participantes={participantes[turnoActual]}
        tiempoRestante={tiempoRestante}
        siguienteTurno={siguienteTurno}
        />
    )}
  </div>;
};

export default MateTurnero;
