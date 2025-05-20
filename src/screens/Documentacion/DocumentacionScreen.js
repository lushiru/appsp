import { Layout } from "../../layouts";
import { UserInfo } from "../../components/Account";
import { MenuAgend } from '../../components/MenuAgend';
import { Image } from "react-native";
import { styles } from "./DocumentacionScreen.styles";
import logo from "../../../assets/logo.jpg";

export function DocumentacionScreen() {
  return (
    <Layout.Basic>
      <Image source={logo} style={styles.logo} />
      <UserInfo />
      <MenuAgend />
    </Layout.Basic>
  )
}