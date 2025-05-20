import { View, Text, TouchableHighlight } from 'react-native'
import { Layout } from "../../../layouts"
import { styles } from './DocumentacionVerScreen.styles'
import { openURL } from "expo-linking";

export function DocumentacionVerScreen() {
  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Documentación</Text>
      <TouchableHighlight underlayColor="lightgrey" onPress={() => openURL("https://spanel.cl/spanel/archivos/REGLAMENTO INTERNO ANDES 2013 Modificado.rev02.pdf")}>
          <Text style={styles.link}>REGLAMENTO INTERNO ANDES 2013 Modificado.rev02.pdf</Text>
        </TouchableHighlight>
      <TouchableHighlight underlayColor="lightgrey" onPress={() => openURL("https://spanel.cl/spanel/archivos/Evaluaciones_Planta.pdf")}>
          <Text style={styles.link}>Evaluaciones_Planta.pdf</Text>
        </TouchableHighlight>
      <TouchableHighlight underlayColor="lightgrey" onPress={() => openURL("https://spanel.cl/spanel/archivos/Aut._Horas_Extras_Grupal.pdf")}>
          <Text style={styles.link}>Aut._Horas_Extras_Grupal.pdf</Text>
        </TouchableHighlight>
      <TouchableHighlight underlayColor="lightgrey" onPress={() => openURL("https://spanel.cl/spanel/archivos/Autorización_Entrada.pdf")}>
          <Text style={styles.link}>Autorización_Entrada.pdf</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="lightgrey" onPress={() => openURL("https://spanel.cl/spanel/archivos/Autorización_Horas_Extras.pdf")}>
          <Text style={styles.link}>Autorización_Horas_Extras.pdf</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="lightgrey" onPress={() => openURL("https://spanel.cl/spanel/archivos/Autorización_Salida.pdf")}>
          <Text style={styles.link}>Autorización_Salida.pdf</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="lightgrey" onPress={() => openURL("https://spanel.cl/spanel/archivos/Falla_Aviso_Telefónico.pdf")}>
          <Text style={styles.link}>Falla_Aviso_Telefónico.pdf</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="lightgrey" onPress={() => openURL("https://spanel.cl/spanel/archivos/Permiso.pdf")}>
          <Text style={styles.link}>Permiso.pdf</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="lightgrey" onPress={() => openURL("https://spanel.cl/spanel/archivos/Permiso_Recuperación.pdf")}>
          <Text style={styles.link}>Permiso_Recuperación.pdf</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="lightgrey" onPress={() => openURL("https://spanel.cl/spanel/archivos/Reemplazo_Jornada.pdf")}>
          <Text style={styles.link}>Reemplazo_Jornada.pdf</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="lightgrey" onPress={() => openURL("https://spanel.cl/spanel/archivos/Remmplazo_Jornada.pdf")}>
          <Text style={styles.link}>Remmplazo_Jornada.pdf</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="lightgrey" onPress={() => openURL("https://spanel.cl/spanel/archivos/Salida_Faena.pdf")}>
          <Text style={styles.link}>Salida_Faena.pdf</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="lightgrey" onPress={() => openURL("https://spanel.cl/spanel/archivos/Salida_Mutual.pdf")}>
          <Text style={styles.link}>Salida_Mutual.pdf</Text>
        </TouchableHighlight>      

    </Layout.Basic>
  )
}