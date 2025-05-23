import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DocumentacionScreen, DocumentacionVerScreen } from "../../screens/Documentacion";
import { AgendarScreen, AgendarCrearScreen } from "../../screens/Agendar";
import { screensName } from "../../utils";

const Stack = createNativeStackNavigator();

export function AgendStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screensName.agend.homeagend} component={DocumentacionScreen} />
      <Stack.Screen name={screensName.agend.documentacionVer} component={DocumentacionVerScreen} />
      <Stack.Screen name={screensName.agend.agendar} component={AgendarScreen} />
      <Stack.Screen name={screensName.agend.agendarCrear} component={AgendarCrearScreen} />
    </Stack.Navigator>
  );
}