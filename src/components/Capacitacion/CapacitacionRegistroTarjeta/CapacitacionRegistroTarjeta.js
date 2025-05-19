import { View, Text, ToastAndroid } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { styles } from "./CapacitacionRegistroTarjeta.styles";
import { useState } from 'react';
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { screensName } from '../../../utils';

const Item = Picker.Item;

export function CapacitacionRegistroTarjeta({item, index }) {

    const [ colaborador, setColaborador ] = useState(null);
    const navigation = useNavigation();

    const irIndividual = async (idplan) => {

        if(colaborador != null) navigation.navigate(screensName.homeplan.capacitacionRegistroMostrar, {idplan: idplan, colaborador: colaborador});
        
    }

  return (
    <View key={"v"+index} style={styles.tarjeta}>
            <View key={"vv01"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Plan de Instrucción :</Text><Text style={styles.texto}>{item.nombreplan}</Text></View>
            <View key={"vv02"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Fecha :</Text><Text style={styles.texto}>{item.fecha}</Text></View>
            <Picker
                selectedValue={""}
                onValueChange={(v) => { setColaborador(v); }}
                >
                <Item key={"ver0"+index} label="Seleccione Trabajador" value="" enabled={false}/>  
                {
                    item.arrinst.map((it, index2) => (
                        <Item key={"ver0"+index+index2} label={it.nombre} value={it.id} />
                    ))
                }                
            </Picker>
            <Button
                mode="contained"
                style={styles.btnSubmit}
                onPress={() => { irIndividual(item.id); }}
            >
                Ir Individual
            </Button>
    </View>                        
  )
}