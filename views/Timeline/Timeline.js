import React from "react";
import { FlatList, View, SafeAreaView } from "react-native";
import BrushingDetails from "../../components";
import { styles } from "./Timeline.style";

const DATA = [
  {
    name: "Shiva",
    age: 10,
  },
  {
    name: "Gautham",
    age: 11,
  },
];

const Timeline = () => {
  // child render item
  const childListRenderItem = ({ item, index }) => (
    <BrushingDetails item={item} />
  );

  // child KeyExtractor
  const childListKeyExtractor = (item, index) => String(index);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.flatListView}>
          <FlatList
            data={DATA}
            renderItem={childListRenderItem}
            keyExtractor={childListKeyExtractor}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Timeline;
