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
    <Form onSubmit={handleSubmit(onSubmit)} className="">
      <Form.Group>
        <Form.Control
          type="text"
          className="w-50 m-auto"
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
      <div className=" mt-4">
        <h5 className="fw-bold text-info-emphasis">Lista de Materos</h5>
      <ul className="list-unstyled ">
        {participantes.map((nombre, index) => (
          <li
            className={`fs-5 fw-bold ${
              index === participantes.turnoActual ? `turno-actual` : ``
            }`}
            key={index}
           
          >
            {nombre}
          </li>
        ))}
      </ul>
      </div>
    </Form>
  );
};

export default Participantes;
