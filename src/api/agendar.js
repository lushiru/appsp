import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";


async function verPrioridades(estado) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.AGENDAR}&estado=${estado}`;
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

  async function crearPrioridad(tarea,fecha,fecha2,tipo,prioridad,horaalarma) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.AGENDAR}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
          tarea,
          fecha,
          fecha2,
          tipo,
          prioridad,
          horaalarma
        },{
          headers: {
            Authorization: token, 
           "Content-Type": "application/x-www-form-urlencoded",
          }
        })

        return res.data

      } catch (error) {
        console.error(error);
      }
    
  }

  async function updateEstado(id,estado) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.AGENDAR}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.put(url, {
          id,
          estado          
        },{
          headers: {
            Authorization: token, 
           "Content-Type": "application/x-www-form-urlencoded",
          }
        })

        return res.data

      } catch (error) {
        console.error(error);
      }
    
  } 
  
  async function veragenda(mes,anio) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.VERAGENDA}&mes=${mes}&anio=${anio}`;
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
  
  export const agendarCtrl = {
    verPrioridades,
    crearPrioridad,
    updateEstado,
    veragenda,
  };
