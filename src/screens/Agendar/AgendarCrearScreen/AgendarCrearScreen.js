import { ToastAndroid, Text } from 'react-native'
import { useState } from 'react'
import { TextInput, Button } from "react-native-paper";
import { Layout } from '../../../layouts'
import { styles } from './AgendarCrearScreen.styles'
import { initialValues, validationSchema } from "./AgendarCrearScreen.form"
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { agendarCtrl } from '../../../api';

const Item = Picker.Item;

export function AgendarCrearScreen() {

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const [inicio, setInicio] = useState(null);
    const [termino, setTermino] = useState(null);
    const [hora, setHora] = useState(null);

    const navigation = useNavigation();

    const setear1 = () => {
        setShow1(true);
      }
    const setear2 = () => {
        setShow2(true);
      }
    const setear3 = () => {
        setShow3(true);
      }    

    const obtenerDatos1 = ({type},selectedDate) => {
        const fecha = selectedDate.toLocaleDateString('es-CL');
        const partes = fecha.split("-");
        const [dia, mes, anio] = partes;
        formik.setFieldValue("fecha", anio+"-"+mes+"-"+dia); 
        setShow1(false);
        setInicio(selectedDate.toLocaleDateString('es-CL'));

      }
    const obtenerDatos2 = ({type},selectedDate) => {
        const fecha = selectedDate.toLocaleDateString('es-CL');
        const partes = fecha.split("-");
        const [dia, mes, anio] = partes;
        formik.setFieldValue("fecha2", anio+"-"+mes+"-"+dia); 
        setShow2(false);
        setTermino(selectedDate.toLocaleDateString('es-CL'));

      }
    const obtenerDatos3 = ({type},selectedDate) => {
        formik.setFieldValue("horaalarma", selectedDate.toLocaleTimeString('es-CL', {
          timeZone: "America/Santiago",
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })); 
        setShow3(false);
        setHora(selectedDate.toLocaleTimeString('es-CL', {
          timeZone: "America/Santiago",
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }));
      }  
  
    const formik = useFormik({
            initialValues: initialValues(),
            validationSchema: validationSchema(),
            validateOnChange: false,
            onSubmit: async (formValue) => {
              const { tarea,fecha,fecha2,tipo,prioridad,horaalarma } = formValue;
              try {
                await agendarCtrl.crearPrioridad(tarea,fecha,fecha2,tipo,prioridad,horaalarma);
                navigation.goBack();
              } catch (error) {
                ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
              }
            },
          });  

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Agendar Crear</Text>
      <TextInput
          label="Tarea"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("tarea", text)}
          value={formik.values.tarea}
          error={formik.errors.tarea}
        />
      <Text style={styles.fecha}>Fecha Inicio: {inicio ? inicio : ""}</Text>
        <Button
          style={styles.btnFecha}
          onPress={setear1}
        >
           Seleccionar Fecha Inicio
        </Button> 
        { show1 ?       
        <DateTimePicker
            value={ new Date() }
            //timeZoneName="America/Santiago"
            onChange={obtenerDatos1}
            //display="spinner"
            mode="date"
            /> : ""}
      <Text style={styles.fecha}>Fecha Termino: {termino ? termino : ""}</Text>
        <Button
          style={styles.btnFecha}
          onPress={setear2}
        >
           Seleccionar Fecha Termino
        </Button> 
        { show2 ?       
        <DateTimePicker
            value={ new Date() }
            //timeZoneName="America/Santiago"
            onChange={obtenerDatos2}
            //display="spinner"
            mode="date"
            /> : ""} 
      <Text style={styles.fecha}>Hora alarma: {hora ? hora : ""}</Text>
        <Button
          style={styles.btnFecha}
          onPress={setear3}
        >
           Seleccionar Hora alarma
        </Button> 
        { show3 ?       
        <DateTimePicker
            value={ new Date() }
            timeZoneName="America/Santiago"
            onChange={obtenerDatos3}
            display="spinner"
            mode="time"
            /> : ""}
      <Picker
          selectedValue={""}
          onValueChange={(v) => formik.setFieldValue("tipo", v)}
          >
          <Item label="Tipo" value="" enabled={false}/>  
          <Item label="Operativa" value="Operativa" />  
          <Item label="Administrativa" value="Administrativa" />
          <Item label="Otros" value="Otros" />
      </Picker>
      <Picker
          selectedValue={""}
          onValueChange={(v) => formik.setFieldValue("prioridad", v)}
          >
          <Item label="Prioridad" value="" enabled={false} />  
          <Item label="Baja" value="Baja" />
          <Item label="Media" value="Media" />
          <Item label="Alta" value="Alta" />
      </Picker>                 

      <Button
        mode="contained"
        style={styles.btnSubmit}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
        >
            Guardar
        </Button>      
    </Layout.Basic>
  )
}