import { StyleSheet } from "react-native";
import { ColourPalette } from "../assets/styles/ColourPalette";
import { STATIC_TEXT } from "../utills/Constant";

export const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    borderBottomWidth: 0.2,
  },
  dateView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    fontSize: 15,
    fontFamily: STATIC_TEXT.font_family2,
    color: ColourPalette.lightGreen,
  },
  messageView: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
  },
  message: {
    color: ColourPalette.lightGreen,
    fontSize: 15,
    fontFamily: STATIC_TEXT.font_family2,
    fontWeight: STATIC_TEXT.font_bold2,
  },
});
