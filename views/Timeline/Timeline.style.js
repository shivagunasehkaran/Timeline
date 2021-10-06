import { StyleSheet } from "react-native";
import { ColourPalette } from "../../assets/styles/ColourPalette";
import { STATIC_TEXT } from "../../utills/Constant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColourPalette.white,
  },
  headerView: {
    height: 30,
    backgroundColor: ColourPalette.gray,
    justifyContent: "center",
    paddingLeft: 20,
  },
  date: {
    fontSize: 15,
    fontFamily: STATIC_TEXT.font_family2,
    color: ColourPalette.black,
  },
});
