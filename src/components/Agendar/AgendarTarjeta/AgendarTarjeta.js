import { View, Text, ToastAndroid } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { styles } from "./AgendarTarjeta.styles"
import { agendarCtrl } from '../../../api';

const Item = Picker.Item;

export function AgendarTarjeta({ item, index, getPrioridades }) {

    const cambiarEstado = async (estado) => {

        try {                    
                const response = await agendarCtrl.updateEstado(item.id, estado); 
                getPrioridades(item.estado);
            } catch (error) {
                ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
            }   

    }


  return (
    <View key={"v"+index} style={styles.tarjeta}>
            <View key={"vv01"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Tarea :</Text><Text style={styles.texto2}>{item.tarea}</Text></View>
            <View key={"vv02"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Fecha Inicio :</Text><Text style={styles.texto}>{item.fechainicio}</Text></View>
            <View key={"vv03"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Fecha Termino :</Text><Text style={styles.texto}>{item.fechatermino}</Text></View>
            <View key={"vv04"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Tipo :</Text><Text style={styles.texto}>{item.tipo}</Text></View>
            <View key={"vv05"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Prioridad :</Text><Text style={styles.texto}>{item.prioridad}</Text></View>
            <Picker key={"vv06"+index}
                selectedValue={item.estado}
                onValueChange={(v) => { cambiarEstado(v); }}
                >
                <Item label="Sin estado" value="" />  
                <Item label="Cumplida" value="Cumplida" />
                <Item label="Retrasada" value="Retrasada" />
            </Picker>
    </View> 
  )
}