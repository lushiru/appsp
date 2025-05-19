import { View, Text, ToastAndroid } from 'react-native'
import { useState, useEffect, useRef} from 'react'
import { Button, TextInput } from 'react-native-paper';
import { capacitacionresgistroCtrl } from "../../../api";
import { Layout } from "../../../layouts";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from "./CapacitacionRegistroMostrarScreen.styles"
import { useNavigation } from "@react-navigation/native";

const Item = Picker.Item;

export function CapacitacionRegistroMostrarScreen(props) {

    const {
        route: { params },
      } = props;

      const idplan = params?.idplan;
      const colaborador = params?.colaborador;

      const navigation = useNavigation();

    const [ evaluar, setEvaluar ] = useState(null);
    const [ contenido, setContenido ] = useState(null);
    const [ verificacion, setVerificacion ] = useState(null);
    const [show , setShow ] = useState(false);
    const cumple = useRef([]);
    const observacion = useRef("");
    const fecha = useRef("");
    const porcentaje = useRef("");
      
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

    const cargarCumple = async (conte) => {

        const array = [];

        await evaluar?.forEach(element => { 
            if(element.id == conte){ 
                           
                element.arrveritem?.forEach(element2 => {
                    element2.arrversubitem?.forEach(element3 => {
                        array.push({ idsubitem : element3.id, valor: "N/A"}); 
                        })                      
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

    const cambiarObs = (v) => {
        observacion.current = v;
    } 

    const cambiarPorc = (v) => {
        porcentaje.current = v;
    } 

   const EscribirEvaluacion = (props) => {   

          
        return (
            <View key={"crmsv"+Date.now()}>
                <View key={"crmsdn"+Date.now()} style={styles.table}>
                { evaluar.map((item,index) => 
                     (  
                        item.id == props.contenido ?
                        item.registrado ? <Text key={"crmstext"+index}>Evaluación registrada</Text> : 

                         <View key={"crms"+index} >
                         { item.arrveritem?.map((dato,index1) => (                         
                                <View key={"crmsviewi"+index+""+index1}>
                                        <View key={"crmsviewit"+index+""+index1} style={styles.table_head}>
                                            <View key={"crmsviewitem"+index+""+index1} style={{width:"70%"}}>
                                                <Text key={"crmsviewitemnombre"+index+""+index1}>{dato.nombreitem}</Text>
                                            </View>
                                            <View key={"crmsviewitemc"+index+""+index1} style={{width:"30%"}}>
                                                <Text key={"crmsviewitemcumple"+index+""+index1}>Cumple</Text>
                                            </View>                                    
                                        </View>
                                    { dato.arrversubitem?.map((item2,index2) => 
                                                ( 
                                                <View key={"crmsviewsubitem"+index+""+index1+""+index2}>
                                                    <View key={"crmsviewsubitemv"+index+""+index1+""+index2} style={styles.table_tar}>
                                                        <View key={"crmsviewsubitemn"+index+""+index1+""+index2} style={{width:"70%"}}>
                                                            <Text key={"crmsviewsubitemnombre"+index+""+index1+""+index2}>{item2.nombresubitem}</Text>
                                                        </View>
                                                        <View key={"crmsviewsubitemvc"+index+""+index1+""+index2} style={{width:"30%"}}>
                                                            <Picker key={"crmspicker"+index+""+index1+""+index2}
                                                                    selectedValue={"N/A"}
                                                                    onValueChange={(v) => {cambiarCumple(v,item2.id);} }
                                                                    >
                                                                    <Item key={"crmsitemsi"+index+""+index1+""+index2} label="SI" value="SI" />    
                                                                    <Item key={"crmsitemno"+index+""+index1+""+index2} label="NO" value="NO" />
                                                                    <Item key={"crmsitemna"+index+""+index1+""+index2} label="N/A" value="N/A" />
                                                            </Picker>
                                                        </View>                                                
                                                    </View>                                                                                    
                                                </View>    )
                                        )} 
                                </View>  )
                        )}
                        </View> : <View key={"vvvvvvv"+index}></View>
                 ))}
                </View>
                   
            </View>         
        );
    } 

    const setear = () => {
        setShow(true);
      }


    const obtenerDatos = ({type},selectedDate) => {
        const mes = selectedDate.getMonth()+1;
        fecha.current = selectedDate.getFullYear()+"-"+mes+"-"+selectedDate.getDate();
        setShow(false);
    } 

    const gotoGuardar = async () => {
              
                try {
                  if(fecha.current != "" && observacion.current != "" && porcentaje.current != "")
                  await capacitacionresgistroCtrl.crearCapacitacionRegistro(verificacion,fecha.current,observacion.current,colaborador,idplan,contenido,porcentaje.current,cumple.current);
                  navigation.goBack();
                } catch (error) {
                  ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
                }
            }  
            
    const setearVerificacion = (v) => {
        evaluar?.forEach(element => { 
            if(element.id == v){ 
                setVerificacion(element.id_verificacion);               
            }            
        });
    }       

  return (
    <Layout.Basic>

      {
        evaluar ? 

            <Picker key={"pickerev"}
                    selectedValue={""}
                    onValueChange={(v) => { setContenido(v);cargarCumple(v);setearVerificacion(v); } }
                    >
                    <Item key={"item0"} label="Seleccione Evaluación" value="" enabled={false} />    
                    {
                        evaluar.map((item,index) => (
                            <Item key={"item0"+index} label={ item.registrado ? `${item.nombreverificacion} Registrado` : item.nombreverificacion } value={item.id} enabled={ item.registrado ? false:true }/> 
                        ))
                    }
            </Picker>

        : ""
      } 

      {
        contenido ? 
            <>
            { !fecha.current ?
            <>
            
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
            </> : 
            <>
            <Text style={styles.titulo}>{ fecha.current ? fecha.current : "" }</Text>
            
            <EscribirEvaluacion key={"evn"} contenido={contenido} />
            
            <TextInput
                label="Observaciones"
                style={styles.input}
                onChangeText={cambiarObs}
                />
            <TextInput
                label="Porcentaje Asignado"
                style={styles.input}
                onChangeText={cambiarPorc}
                /> 
            <Button mode="contained" onPress={() => gotoGuardar()} style={styles.btn}>
                        Guardar Evaluacion
            </Button>  
            </> 
                }             
            </>                
        : ""
      } 
      
    </Layout.Basic>
  )
}