import * as Yup from "yup";

export function initialValues() {
  return {
    observacion: "",
    fecha: "",
    porcentaje: "",
  };
}

export function validationSchema() {
  return Yup.object({
    observacion: Yup.string().required(true),
    fecha: Yup.date().required(true),
    porcentaje: Yup.number().required(true),
  });
}