import { View, Text, ToastAndroid } from 'react-native'
import { useState, useEffect} from 'react'
import { Button } from 'react-native-paper';
import { notificarCtrl } from '../../../api'
import { styles } from "./NotificarScreen.styles"
import { Layout } from '../../../layouts'
import { screensName } from '../../../utils';
import { useIsFocused,useNavigation } from "@react-navigation/native";


export function NotificarScreen() {

    const [ mostrar, setMostrar] = useState(null);

    const navigation = useNavigation();
    const isVisible = useIsFocused();

     useEffect(() => {
          if(isVisible) getMostrar();                     
      }, [isVisible]);

    const getMostrar = async () => {
        try {
                const response = await notificarCtrl.verNotificars();
                setMostrar(response.arrcartas);                
            } catch (error) {
                ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
            }
    }

  return (
    <Layout.Basic>
      <Text style={styles.titulo} >Notificar</Text>
      <Button mode="contained" onPress={() => navigation.navigate(screensName.homeplan.notificarCrear)} style={styles.btn}>
        Generar Notificación 
      </Button>  
      {
        mostrar ? 
            mostrar.map((item,index) => (

                <View key={"v"+index} style={styles.tarjeta}>
                    <View key={"vv01"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Nombres :</Text><Text style={styles.texto}>{item.NOMBRES+" "+item.APELLIDO_PATERNO+" "+item.APELLIDO_MATERNO}</Text></View>
                    <View key={"vv02"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Fecha :</Text><Text style={styles.texto}>{item.FECHA_C}</Text></View>
                    <View key={"vv03"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Tipo :</Text><Text style={styles.texto}>{item.TIPO_C}</Text></View>
                    <View key={"vv04"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Motivo :</Text><Text style={styles.texto2}>{item.DETALLE}</Text></View>
                    <View key={"vv05"+index} >
                        <Button mode="contained" onPress={() => navigation.navigate(screensName.homeplan.notificarEditar, { id:item.ID })} style={styles.btnSubmit}>
                            Editar
                        </Button>
                    </View>
            </View> 

            ))
        : ""
      }  

    </Layout.Basic>
  )
}