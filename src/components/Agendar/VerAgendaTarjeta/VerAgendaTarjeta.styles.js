import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontWeight:900,
    margin: 10,
    fontSize: 20
  },
  btnSubmit:{
    fontSize: 14,
    backgroundColor: "#254ffd",
    margin:5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  tarjeta: {
    backgroundColor: "#eae8e0",
    margin: 15, 
    padding: 15,
    borderColor: "#a5a4a2",
    borderRadius: 10,
    borderWidth: 3,  
  },
  subtarjeta: {
    margin: 5, 
    padding: 5,
    borderColor: "#a5a4a2",
    borderRadius: 10,
    borderWidth: 3,  
  },
  textcolumn:{
    flexDirection: "row",
    
  },
  texto: {
    fontSize: 16, 
    textAlign: "right"
  },
  texto2: {
    fontSize: 16, 
    textAlign: "left",
    flexShrink: 1
  },
  titulo2: {
    fontWeight:500, 
    width: 120,
    fontSize: 16   
  },

});