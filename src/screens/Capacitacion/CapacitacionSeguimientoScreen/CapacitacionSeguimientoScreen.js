import { View, Text, ToastAndroid } from 'react-native'
import { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';
import { TextInput, Button } from "react-native-paper";
import { styles } from "./CapacitacionSeguimientoScreen.styles"
import { Layout } from '../../../layouts'
import { capacitacionseguimientoCtrl } from '../../../api';
import { CapacitacionSeguimientoTarjeta } from "../../../components/Capacitacion"

const Item = Picker.Item;

export function CapacitacionSeguimientoScreen() {

    const [ mes, setMes ] = useState("");
    const [ anio, setAnio ] = useState("");
    const [ seguimiento, setSeguimiento ] = useState(null);
 
   useEffect(() => {
        
        getDatoshoy();
        
    }, []);

    const getDatoshoy = () => {
        const fecha = Date.now();
        const hoy = new Date(fecha);
        const m = hoy.getMonth() + 1;
        setMes(m.toString());
        setAnio(hoy.getFullYear().toString());
    }

    
    const obtenerPlanes = async () => {

        try {
            const response = await capacitacionseguimientoCtrl.verCapacitacionesseguimientofecha(mes,anio);
            setSeguimiento(response.array);                
        } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
        }
        
    }


  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Ver Actividades / Seguimiento</Text>

      <Picker
            selectedValue={mes}
            onValueChange={(v) => { setMes(v); }}
            >
            <Item label="Enero" value="1" />  
            <Item label="Febrero" value="2" />
            <Item label="Marzo" value="3" />
            <Item label="Abril" value="4" />
            <Item label="Mayo" value="5" />
            <Item label="Junio" value="6" />
            <Item label="Julio" value="7" />
            <Item label="Agosto" value="8" />
            <Item label="Septiembre" value="9" />
            <Item label="Octubre" value="10" />
            <Item label="Noviembre" value="11" />
            <Item label="Diciembre" value="12" />
        </Picker>  
     <TextInput
            label="Año"
            style={styles.input}
            onChangeText={(text) => { setAnio(text); }}
            value={anio}
        />        
        <Button
            mode="contained"
            style={styles.btnSubmit}
            onPress={() => { obtenerPlanes(); }}
        >
            Seguimiento Individual
        </Button>

        {
            seguimiento ? 

                seguimiento.map((item,index) =>
                   <CapacitacionSeguimientoTarjeta item={item} index={index} key={"cap"+index} /> 
                )

            : ""
        }

    </Layout.Basic>
  )
}