import { View, Text } from 'react-native'
import { useState, useEffect} from 'react'
import { capacitacionseguimientoCtrl } from '../../../api'
import { styles } from "./CapactitacionSeguimientoMostrarScreen.styles"
import { Layout } from '../../../layouts'


export function CapactitacionSeguimientoMostrarScreen(props) {

    const {
        route: { params },
      } = props;

    const idplan = params?.idplan;
    const colaborador = params?.colaborador;
    const nombreplan = params?.nombreplan;   

    const [ mostrar, setMostrar] = useState(null);

    useEffect(() => {        
        if(idplan && colaborador) getMostrar();        
    }, [idplan]);

    const getMostrar = async () => {
        try {
                const response = await capacitacionseguimientoCtrl.verUnCapacitacionSeguimiento(idplan,colaborador);
                setMostrar(response.array);                
            } catch (error) {
                ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
            }
    }

  return (
    <Layout.Basic>
      <Text style={styles.titulo} >{nombreplan}</Text>

      {
        mostrar ? 
            mostrar.map((item,index) => (

                <View key={"v"+index} style={styles.tarjeta}>
                    <View key={"vv01"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Evaluación :</Text><Text style={styles.texto}>{item.nombre}</Text></View>
                    <View key={"vv02"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Fecha :</Text><Text style={styles.texto}>{item.fecha}</Text></View>
                    <View key={"vv03"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Porcentaje :</Text><Text style={styles.texto}>{item.porcentaje}</Text></View>
            </View> 

            ))
        : ""
      }  

    </Layout.Basic>
  )
}