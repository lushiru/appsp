import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";


async function verCapacitacionesfecha(mes,anio) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACIONREGISTRO}&mes=${mes}&anio=${anio}`;
      const token = await storageCrtl.getToken();
  
      const paramsTemp = {      
        headers: {
          Authorization: token,          
          },
      };
  
      const response = await axios.get(url,paramsTemp);
  
      if (response.status !== 200) throw response;
  
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function crearCapacitacionRegistro(idverificacion,fecha,observacion,idinscrito,idinstruccionplan,idcontenido,porcentajec, arrresultado) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACIONREGISTRO}`;
    const token = await storageCrtl.getToken();

    const bodyFormData = new FormData();
    bodyFormData.append("idverificacion",idverificacion);
    bodyFormData.append("fecha",fecha);
    bodyFormData.append("observacion",observacion);
    bodyFormData.append("idinscrito",idinscrito);
    bodyFormData.append("idinstruccionplan",idinstruccionplan);
    bodyFormData.append("idcontenido",idcontenido);
    bodyFormData.append("porcentajec",porcentajec);
    let i=0;
    arrresultado.forEach((item) => {
        bodyFormData.append('idsubitem['+i+']', item.idsubitem);
        bodyFormData.append('valor['+i+']', item.valor);
        i++;
    });

    try {
              
        const res = await axios.post(url,bodyFormData,{
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        })

        return res.data

      } catch (error) {
        console.error(error);
      }
    
  }

  async function verUnCapacitacionRegistro(idplan,idinscrito) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACIONREGISTRO}&idplan=${idplan}&idinscrito=${idinscrito}`;
      const token = await storageCrtl.getToken();
  
      const paramsTemp = {      
        headers: {
          Authorization: token,          
          },
      };
  
      const response = await axios.get(url,paramsTemp);
  
      if (response.status !== 200) throw response;
  
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  
  export const capacitacionresgistroCtrl = {
    verCapacitacionesfecha,
    crearCapacitacionRegistro,
    verUnCapacitacionRegistro,
  };
