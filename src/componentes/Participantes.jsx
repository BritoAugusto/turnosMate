import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";

const Participantes = ({agregarMatero, participantes}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

const onSubmit = (data) =>{
    agregarMatero(data.nombre);
    reset();
}

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="mb-3">
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Nombre del Matero"
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: {
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres",
            },
            maxLength: {
              value: 20,
              message: "El nombre no debe tener mas de 20 caracteres",
            },
          })}
        />
        <Button type="submit" className="mt-2">
          Agregar
        </Button>
      </Form.Group>
      {errors.nombre && (
        <Form.Text className="text-danger">{errors.nombre.message}</Form.Text>
      )}
      <ul className="list-unstyled mt-3">
        {participantes.map((nombre, index) => (
          <li
            className={`fs-5${
              index === participantes.turnoActual ? `turno-actual` : ``
            }`}
            key={index}
            // style={{
            //   fontSize: participantes.turnoActual ? "1.5em" : "1em", // Aumenta el tamaño del nombre del turno actual
            //   fontWeight:
            //     index === participantes.turnoActual ? "bold" : "normal", // Resalta el nombre
            //   color: index === participantes.turnoActual ? "red" : "black", // Cambia el color del turno actual
            // }}
          >
            {nombre}
          </li>
        ))}
      </ul>
    </Form>
  );
};

export default Participantes;
