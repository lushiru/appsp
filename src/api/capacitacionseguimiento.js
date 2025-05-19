import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";


async function verCapacitacionesseguimientofecha(mes,anio) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACIONSEGUIMIENTO}&mes=${mes}&anio=${anio}`;
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

  
  async function verUnCapacitacionSeguimiento(idplan,idinscrito) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.CAPACITACIONSEGUIMIENTO}&idplan=${idplan}&idinscrito=${idinscrito}`;
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
  
  
  export const capacitacionseguimientoCtrl = {
    verCapacitacionesseguimientofecha,
    verUnCapacitacionSeguimiento,
  };
