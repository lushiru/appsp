import { Text, ToastAndroid } from 'react-native'
import { useState, useEffect } from 'react'
import { Button } from 'react-native-paper';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import { Layout } from '../../../layouts'
import { styles } from "./AgendarScreen.styles"
import { screensName } from '../../../utils'
import { agendarCtrl } from '../../../api';
import { AgendarTarjeta } from "../../../components/Agendar"

const Item = Picker.Item;

export function AgendarScreen() {

    const [ prioridades, setPrioridades ] = useState(null);
    const [ estado, setEstado ] = useState("");

    const isVisible = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
          if(isVisible) getPrioridades(estado);                    
      }, [isVisible]);

    const getPrioridades = async (est) => {
            
            try {
              const response = await agendarCtrl.verPrioridades(est);
              setPrioridades(response.arrprioridades);        
            } catch (error) {
                ToastAndroid.show( "Error al obtener prioridades" , ToastAndroid.SHORT);
            }
          };


  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Agendar</Text>
      <Button mode="contained" onPress={() => navigation.navigate(screensName.agend.agendarCrear)} style={styles.btn}>
            Crear Prioridad
      </Button>

      <Picker
          selectedValue={""}
          onValueChange={(v) => { setEstado(v); getPrioridades(v); }}
          >
          <Item label="Sin estado" value="" />  
          <Item label="Cumplida" value="Cumplida" />
          <Item label="Retrasada" value="Retrasada" />
      </Picker>

      {
        prioridades ?

          prioridades.map((item, index)=>(
            <AgendarTarjeta key={"at"+index} item={item} index={index} getPrioridades={getPrioridades}/>
          ))

        : ""
      }
      
    </Layout.Basic>
  )
}