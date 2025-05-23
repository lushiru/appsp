import * as Yup from "yup";

export function initialValues() {
  return {
    tarea: "",
    fecha: "",
    fecha2: "",
    tipo: "",
    prioridad: "",
    horaalarma: "",
  };
}

export function validationSchema() {
  return Yup.object({
    tarea: Yup.string().required(true),
    fecha: Yup.date().required(true),
    fecha2: Yup.date().required(true),
    tipo: Yup.string().required(true),
    prioridad: Yup.string().required(true),
    horaalarma: Yup.string().required(true),
  });
}