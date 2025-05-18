import { useState, useEffect } from "react";
import { View, Text, ToastAndroid } from 'react-native'
import { Button } from 'react-native-paper';
import { screensName } from '../../../utils';
import { Layout } from '../../../layouts';
import { styles } from './CapacitacionScreen.styles';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { capacitacionCtrl } from "../../../api";
import { CapacitacionDataTable } from "../../../components/Capacitacion"

export function CapacitacionScreen() {

  const [ capacitacion, setCapacitacion ] = useState(null);

      const isVisible = useIsFocused();
      const navigation = useNavigation();
      const [reload, setReload] = useState(false);
    
      useEffect(() => {
          if(isVisible) getCapacitaciones();                    
      }, [isVisible]);

      useEffect(() => {
          if(reload) getCapacitaciones();                    
      }, [reload]);
  
      const getCapacitaciones = async () => {
        try {
          const response = await capacitacionCtrl.verCapacitaciones();
          setCapacitacion(response.arrinst);        
        } catch (error) {
            ToastAndroid.show( "Error al obtener capacitaciones" , ToastAndroid.SHORT);
        }
      };

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Capacitación</Text>
      <View style={styles.contenedor}>
      <Button mode="contained" onPress={() => navigation.navigate(screensName.homeplan.capacitacionCrear)} style={styles.btn}>
            Crear Actividad
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate(screensName.homeplan.capacitacionRegistro)} style={styles.btn}>
            Registro Control de Actividad
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate(screensName.homeplan.capacitacionCrear)} style={styles.btn}>
            Crear Actividad
      </Button>
      </View>  
      {

        capacitacion ?
          
          <CapacitacionDataTable capacitacion={capacitacion} setReload={setReload} />

        : ""

      }

    </Layout.Basic>
  )
}