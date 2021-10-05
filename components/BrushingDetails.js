import React from "react";
import { Text, View } from "react-native";
import { styles } from "./BrushingDetails.style";

type BrushingDetailsProp = {
  item: Object,
};

// flatlist render item
const BrushingDetails = (props: BrushingDetailsProp) => {
  // getting data from parent
  let item = props.item ? props.item : null;
  let name = item ? item.name : "";

  return (
    <View style={styles.container}>
      <View style={styles.nameView}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
};

export default BrushingDetails;
