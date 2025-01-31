import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";

const Participantes = ({agregarMatero}) => {
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Nombre del Matero"
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: {
              value: 3,
              mensaje: "El nombre debe tener al menos 3 caracteres",
            },
            maxLength: {
              value: 20,
              mensaje: "El nombre no debe tener mas de 20 caracteres",
            },
          })}
        />
        <Button variant="sucess" type="submit">
          Agregar
        </Button>
      </Form.Group>
      <Form.Text>{errors.nombre?.mensaje}</Form.Text>
    </Form>
  );
};

export default Participantes;
