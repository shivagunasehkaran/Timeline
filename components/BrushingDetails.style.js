import { StyleSheet } from "react-native";
import { ColourPalette } from "../assets/styles/ColourPalette";
import { STATIC_TEXT } from "../utills/Constant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    backgroundColor: ColourPalette.lightGreen,
    borderRadius: 5,
    height: 94,
  },
  nameView: {
    justifyContent: "center",
    marginLeft: 20,
  },
  name: {
    color: ColourPalette.white,
    fontSize: 14,
    fontFamily: STATIC_TEXT.font_family2,
    fontWeight: STATIC_TEXT.font_bold2,
  },
});
