import { Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";


const TurnDisplay = ({participantes, tiempoRestante, siguienteTurno}) => {
  return (
    <Card>
      <Card.Body>
        <h2>Turno de : {participantes}</h2>
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
      </Card.Body>
    </Card>
  );
};

export default TurnDisplay;
