import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DocumentacionScreen, DocumentacionVerScreen } from "../../screens/Documentacion";
import { screensName } from "../../utils";

const Stack = createNativeStackNavigator();

export function AgendStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screensName.agend.homeagend} component={DocumentacionScreen} />
      <Stack.Screen name={screensName.agend.documentacionVer} component={DocumentacionVerScreen} />
    </Stack.Navigator>
  );
}