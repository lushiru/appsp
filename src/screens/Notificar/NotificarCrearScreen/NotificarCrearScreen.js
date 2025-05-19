import { Text, ToastAndroid } from 'react-native'
import { useState, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { Layout } from '../../../layouts'
import { desempeniosregistrarCtrl, notificarCtrl } from '../../../api'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./NotificarCrearScreen.form";
import { styles } from "./NotificarCrearScreen.styles";

const Item = Picker.Item;

export function NotificarCrearScreen() {

    const [ colaboradores, setColaboradores] = useState(null);
    const [show, setShow] = useState(false);
    const [inicio, setInicio] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {        
        getMostrarcol();        
    }, []);

    const getMostrarcol = async () => {
            try {
                    const response = await desempeniosregistrarCtrl.verTrabajadores();
                    setColaboradores(response.arrpers);                
                } catch (error) {
                    ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
                }
        }

    const setear = () => {
        setShow(true);
      }

    const obtenerDatos = ({type},selectedDate) => {
        formik.setFieldValue("fecha", selectedDate); 
        setShow(false);
        const mes = selectedDate.getMonth()+1;
        setInicio(selectedDate.toLocaleDateString());

      } 
    
     const formik = useFormik({
            initialValues: initialValues(),
            validationSchema: validationSchema(),
            validateOnChange: false,
            onSubmit: async (formValue) => {
              const { idcolaborador,fecha,tipo,detalle } = formValue;
              try {
                await notificarCtrl.crearNotificar(idcolaborador,fecha,tipo,detalle);
                navigation.goBack();
              } catch (error) {
                ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
              }
            },
          });  

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Generar Notificación</Text>
      {
        colaboradores ? 
        <>
            <Picker
                selectedValue={""}
                onValueChange={(v) => formik.setFieldValue("idcolaborador", v)}
                >
                <Item label="Seleccione Trabajador" value="" enabled={false} />
                {    colaboradores.map((item, index) => (
                        <Item key={"item"+index} label={item.nombres+" "+item.apellidos1+" "+item.apellidos2} value={item.id} />
                        )) }
            </Picker>            
        <Text style={styles.fecha}>Inicio: {inicio ? inicio : ""}</Text>
        <Button
          style={styles.btnFecha}
          onPress={setear}
        >
           Seleccionar Fecha
        </Button> 
        { show ?       
        <DateTimePicker
            value={ new Date() }
            onChange={obtenerDatos}
            mode="date"
            /> : ""}

        <Picker
                selectedValue={""}
                onValueChange={(v) => formik.setFieldValue("tipo", v)}
                >
                <Item label="Amonestacion" value="Amonestacion" />
                <Item label="Reconocimiento" value="Reconocimiento" />
        </Picker>            
        <TextInput
          label="Redacte"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("detalle", text)}
          value={formik.values.detalle}
          error={formik.errors.detalle}
        />
         <Button
            mode="contained"
            style={styles.btnSubmit}
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
          >
              Crear Notificación
          </Button>    
        </>    
        : ""
      }  
    </Layout.Basic>
  )
}