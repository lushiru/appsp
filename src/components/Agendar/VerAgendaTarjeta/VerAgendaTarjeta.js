import { View, Text } from 'react-native'
import { styles } from "./VerAgendaTarjeta.styles"

export function AgendarTarjeta({ item, index }) {

    
  return (
    <View key={"v"+index} style={styles.tarjeta}>
            {
              item.arrtar ?
                <View style={styles.subtarjeta}><Text style={styles.titulo}>Actividad a Supervisar</Text>
                {item.arrtar.map((it,index1)=>(
                  <View key={"vv00"+index+""+index1}>  
                    <View key={"vv01"+index+""+index1} style={styles.textcolumn}><Text style={styles.titulo2}>Fecha :</Text><Text style={styles.texto2}>{item.diadelasemana +" "+ item.fech}</Text></View>
                    <View key={"vv02"+index+""+index1} style={styles.textcolumn}><Text style={styles.titulo2}>Observación :</Text><Text style={styles.texto2}>{item.observacion}</Text></View>
                  </View>  
                ))}
                </View>
              : ""
            }
            {
              item.prioridades ?
                <View style={styles.subtarjeta}><Text style={styles.titulo}>Prioridades</Text>
                {item.prioridades.map((it,index2)=>(
                  <View key={"vvv00"+index+""+index2}>  
                    <View key={"vv04"+index+""+index2} style={styles.textcolumn}><Text style={styles.titulo2}>Fecha :</Text><Text style={styles.texto2}>{item.diadelasemana +" "+ item.fech}</Text></View>
                    <View key={"vv05"+index+""+index2} style={styles.textcolumn}><Text style={styles.titulo2}>Fechas :</Text><Text style={styles.texto2}>{item.fechainicio +" "+ item.fechatermino}</Text></View>
                    <View key={"vv06"+index+""+index2} style={styles.textcolumn}><Text style={styles.titulo2}>Tarea :</Text><Text style={styles.texto2}>{item.tarea}</Text></View>
                  </View>  
                ))}
                </View>
              : ""
            }
    </View> 
  )
}