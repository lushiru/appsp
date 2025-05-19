import axios from "axios";
import { ENV } from "../utils";
import { storageCrtl } from "./storage";


async function verNotificars() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.NOTIFICAR}`;
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

  async function crearNotificar(id,fecha,tipo,detalle) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.NOTIFICAR}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.post(url, {
          id,
          fecha,
          tipo,
          detalle
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

  async function verUnNotificar(id) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.NOTIFICAR}&id=${id}`;
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

  async function updateNotificar(id, tipo, detalle) {

    const url = `${ENV.API_URL}${ENV.ENDPOINTS.NOTIFICAR}`;
    const token = await storageCrtl.getToken();

    try {
              
        const res = await axios.put(url, {
          id,  
          tipo,
          detalle
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

  export const notificarCtrl = {
    verNotificars,
    crearNotificar,
    verUnNotificar,
    updateNotificar,
  };
