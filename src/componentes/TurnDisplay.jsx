import { Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";


const TurnDisplay = ({participantes, turnoActual, tiempoRestante, siguienteTurno, eliminarMatero}) => {
  return (
    <Card className="text-center mt-5">
      <Card.Body>
        <h2>Turno de : {participantes[turnoActual]}</h2>
        <p>⏳ {tiempoRestante} segundos</p>
        <Button
        variant="primary"
        onClick={()=>{
           Swal.fire({
              title: "Turno finalizado",
              text: `Ahora sigue el siguiente matero`,
              icon: "info",
            });
            siguienteTurno();
          }} 
        >
          Pasar Mate
        </Button>
        <Button
        variant="danger"
        className="ms-2"
        onClick={()=> eliminarMatero(turnoActual)}
        >
          ¡Gracias!
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TurnDisplay;
