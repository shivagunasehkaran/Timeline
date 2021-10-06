import moment from "moment";
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
  let date = item ? item.brushingTime : "";
  let message = item ? item.message : "";

  return (
    <View style={styles.container}>
      <View style={styles.dateView}>
        <Text style={styles.date}>
          {moment(date, "HH:mm:ss").format("hh:mm A")}
        </Text>
      </View>
      <View style={styles.messageView}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

export default BrushingDetails;
