import * as Yup from "yup";

export function initialValues() {
  return {
    tipo: "",
    detalle: "",
  };
}

export function validationSchema() {
  return Yup.object({
    tipo: Yup.string().required(false),
    detalle: Yup.string().required(false),
  });
}