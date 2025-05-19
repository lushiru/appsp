import { View, Text, ToastAndroid } from 'react-native'
import { useState, useEffect, useRef} from 'react'
import { Button, TextInput } from 'react-native-paper';
import { capacitacionresgistroCtrl } from "../../../api";
import { Layout } from "../../../layouts";
import { Picker } from '@react-native-picker/picker';
import { capacitacionresgistroCtrl } from "../../../api";
import { useFormik } from "formik";
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from "./CapacitacionRegistroMostrarScreen.styles"
import { initialValues, validationSchema } from "./CapacitacionRegistroMostrarScreen.form";

const Item = Picker.Item;

export function CapacitacionRegistroMostrarScreen(props) {

    const {
        route: { params },
      } = props;

      const idplan = params?.idplan;
      const colaborador = params?.colaborador;

    const [ evaluar, setEvaluar ] = useState(null);
    const [ contenido, setContenido ] = useState(null);
    const [ verificacion, setVerificacion ] = useState(null);
    const [ fech, setFech ] = useState(null);
    const [show, setShow] = useState(false);
    const cumple = useRef([]);
      
    useEffect(() => {
        if(idplan && colaborador){getEvaluar();}                     
    }, [idplan]);  

    const getEvaluar = async () => {

        try {
          const response = await capacitacionresgistroCtrl.verUnCapacitacionRegistro(idplan,colaborador);
          setEvaluar(response.array); 
                
        } catch (error) {
            ToastAndroid.show( "error =" + error , ToastAndroid.SHORT);
        }

    }

    const cargarCumple = async () => {

        const array = [];

        await evaluar?.forEach(element => { 
            if(element.id == contenido){            
                element.arrversubitem?.forEach(element2 => {
                array.push({ idsubitem : element2.id, valor: "N/A"});                       
                    })
            }            
        });
        cumple.current = array;

    }

    const cambiarCumple = (v, Idsubitem) => {
        
        const array = cumple.current.map(element => {
            if(element.idsubitem == Idsubitem){
                return { idsubitem:Idsubitem, valor:v };          
            }else{
                return { idsubitem:element.idsubitem, valor:element.valor };
            }
        });
        cumple.current = array;
        
    }

   const EscribirEvaluacion = (props) => {   
        
        return (
            <View>
                <View key={Date.now()} style={styles.table}>
                { evaluar.map((item,index1) => 
                     (
                        item.id == props.contenido ?
                        item.registrado ? <Text>Evaluación registrada</Text> : 
                         <>   
                         { setVerificacion(item.id_verificacion) }
                         <View key={"viewi"+index1}>
                                <View key={"viewit"+index1} style={styles.table_head}>
                                    <View key={"viewitem"+index1} style={{width:"70%"}}>
                                        <Text key={"viewitemnombre"+index1}>{item.nombreitem}</Text>
                                    </View>
                                    <View key={"viewitemc"+index1} style={{width:"30%"}}>
                                        <Text key={"viewitemcumple"+index1}>Cumple</Text>
                                    </View>                                    
                                </View>
                               { item.arrversubitem?.map((item2,index2) => 
                                        ( <View key={"viewsubitem"+index1+index2}>
                                            <View key={"viewsubitemv"+index1+index2} style={styles.table_tar}>
                                                <View key={"viewsubitemn"+index1+index2} style={{width:"70%"}}>
                                                    <Text key={"viewsubitemnombre"+index1+index2}>{item2.nombresubitem}</Text>
                                                </View>
                                                <View key={"viewsubitemvc"+index1+index2} style={{width:"30%"}}>
                                                    <Picker key={"picker"+index1+index2}
                                                            selectedValue={"N/A"}
                                                            onValueChange={(v) => {cambiarCumple(v,item2.id);} }
                                                            >
                                                            <Item key={"itemsi"+index1+index2} label="SI" value="SI" />    
                                                            <Item key={"itemno"+index1+index2} label="NO" value="NO" />
                                                            <Item key={"itemna"+index1+index2} label="N/A" value="N/A" />
                                                    </Picker>
                                                </View>                                                
                                            </View>
                                                                             
                                    </View>    )
                                )} 
                        </View></> : ""  )
                 )}
                </View>
                   
            </View>         
        );
    } 

    const setear = () => {
        setShow(true);
      }


    const obtenerDatos = ({type},selectedDate) => {
        const mes = selectedDate.getMonth()+1;
        setFech(selectedDate.getFullYear()+"-"+mes+"-"+selectedDate.getDate());
        formik.setFieldValue("fecha", fech); 
        setShow(false);
    } 

    const formik = useFormik({
              initialValues: initialValues(),
              validationSchema: validationSchema(),
              validateOnChange: false,
              onSubmit: async (formValue) => {
                const { observacion,fecha,porcentaje } = formValue;
                try {
                  await capacitacionresgistroCtrl.crearCapacitacionRegistro(verificacion,fecha,observacion,colaborador,idplan,contenido,porcentaje,cumple.current);
                  getEvaluar();
                } catch (error) {
                  ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
                }
              },
            });

  return (
    <Layout.Basic>

      {
        evaluar ? 

            <Picker key={"picker"}
                    selectedValue={""}
                    onValueChange={(v) => { setContenido(v);cargarCumple(); } }
                    >
                    <Item key={"item00"} label="" value="" enable={false} />    
                    {
                        evaluar.map((item,index) => (
                            <Item key={"item0"+index} label={item.id} value={item.nombreverificacion} /> 
                        ))
                    }
            </Picker>

        : ""
      } 

      {
        contenido ? 
            <>
            <View>
                <Text>{ fech ? fech : "" }</Text>
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
            </View>
            <EscribirEvaluacion contenido={contenido} />
            <TextInput
                label="Observaciones"
                style={styles.input}
                onChangeText={(text) => formik.setFieldValue("observacion", text)}
                value={formik.values.observacion}
                error={formik.errors.observacion}
                />
            <TextInput
                label="Porcentaje Asignado"
                style={styles.input}
                onChangeText={(text) => formik.setFieldValue("porcentaje", text)}
                value={formik.values.porcentaje}
                error={formik.errors.porcentaje}
                />            
            </>                
        : ""
      } 
      
    </Layout.Basic>
  )
}