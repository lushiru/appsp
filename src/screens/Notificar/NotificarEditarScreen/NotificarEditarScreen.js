import { Text, ToastAndroid } from 'react-native'
import { useState, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { Layout } from '../../../layouts'
import { notificarCtrl } from '../../../api'
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./NotificarEditarScreen.form";
import { styles } from "./NotificarEditarScreen.styles";

const Item = Picker.Item;

export function NotificarEditarScreen(props) {

    const {
        route: { params },
      } = props;

    const id = params?.id;
    const [selectedValuePicker, setSelectedValuePicker] = useState("");
     
    const navigation = useNavigation();

    useEffect(() => {
        if (id) {
            retriveEdit(id);
        }
        }, [id]);

    const retriveEdit = async (ide) => {
              const response = await notificarCtrl.verUnNotificar(ide);
              await formik.setFieldValue("tipo", response.arrcartas.TIPO_C); setSelectedValuePicker(response.arrcartas.TIPO_C);
              await formik.setFieldValue("detalle", response.arrcartas.DETALLE); 
                
      }    

      const formik = useFormik({
            initialValues: initialValues(),
            validationSchema: validationSchema(),
            validateOnChange: false,
            onSubmit: async (formValue) => {
              const { tipo,detalle } = formValue;
              try {
                await notificarCtrl.updateNotificar(id,tipo,detalle);
                navigation.goBack();
              } catch (error) {
                ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
              }
            },
          });  

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Actualizar Notificación</Text>
      
        <Picker
                selectedValue={selectedValuePicker}
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
           Actualizar
        </Button>   
         
    </Layout.Basic>
  )
}