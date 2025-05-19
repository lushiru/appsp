import * as Yup from "yup";

export function initialValues() {
  return {
    idcolaborador: "",
    fecha: "",
    tipo: "",
    detalle: "",
  };
}

export function validationSchema() {
  return Yup.object({
    idcolaborador: Yup.string().required(false),
    fecha: Yup.date().required(false),
    tipo: Yup.string().required(false),
    detalle: Yup.string().required(false),
  });
}