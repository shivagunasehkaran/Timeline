import { StyleSheet } from "react-native";
import { ColourPalette } from "../../assets/styles/ColourPalette";
import { STATIC_TEXT } from "../../utills/Constant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColourPalette.white,
  },
  title: {
    marginTop: 10,
    paddingLeft: 17,
    fontSize: 24,
    fontFamily: STATIC_TEXT.font_family,
    fontWeight: STATIC_TEXT.font_bold1,
  },
  flatListView: {
    marginVertical: 10,
    marginHorizontal: 14,
  },
});
