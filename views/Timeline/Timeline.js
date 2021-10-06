import moment from "moment";
import React, { useEffect, useState } from "react";
import { SectionList, SafeAreaView, View, Text } from "react-native";
import BrushingDetails from "../../components";
import { STATIC_TEXT, TIMELINE_STATUS } from "../../utills/Constant";
import { SortedArray } from "../../utills/DateUtil";
import { styles } from "./Timeline.style";

const Timeline = () => {
  const [timeLineValue, setTimeLineValue] = useState([]);
  let initialValue = 0;

  useEffect(() => {
    // initial call when page loads
    renderTimeLine();
  }, []);

  // append values for time line status
  const getTimelineStatus = (
    brushingObj,
    brushingDate,
    brushingTime,
    finalArray
  ) => {
    let obj = {};
    obj.id = initialValue;
    obj.brushingDate = brushingDate;
    obj.brushingTime = brushingTime;
    obj.arch = brushingObj.arch;
    obj.status = brushingObj.interrupted
      ? TIMELINE_STATUS.INCOMPLETE
      : brushingObj.arch;
    obj.interrupted = brushingObj.interrupted;
    obj.message = !brushingObj.interrupted
      ? `${STATIC_TEXT.micka_has_brushed} ${brushingObj.arch} ${STATIC_TEXT.arch_at}`
      : `${STATIC_TEXT.micka_didnot_finish} ${brushingObj.arch} ${STATIC_TEXT.arch_at}`;
    // push values into array
    finalArray.push(obj);
    initialValue++;
  };

  // calculate the time line mechanism based on json
  const getTimelineStatusBasedOnTimeFrame = (
    brushingObj,
    brushingDate,
    brushingTime,
    finalArray
  ) => {
    let startTime = moment(
      `${brushingDate} ${brushingTime}`,
      "MM/DD/YYYY hh:mm:ss"
    );
    let endTime = moment(
      `${finalArray[initialValue - 1].brushingDate} ${
        finalArray[initialValue - 1].brushingTime
      }`,
      "MM/DD/YYYY hh:mm:ss"
    );

    let minutesDiff = startTime.diff(endTime, "minutes");
    // check 30 mins time frame and set status
    if (
      minutesDiff < 30 &&
      finalArray[initialValue - 1].arch !== brushingObj.arch &&
      !brushingObj.interrupted &&
      finalArray[initialValue - 1].status !== TIMELINE_STATUS.INCOMPLETE
    ) {
      finalArray[
        initialValue - 1
      ].message = `${STATIC_TEXT.micka_finished_brushing}`;
      finalArray[initialValue - 1].status = TIMELINE_STATUS.COMPLETED;
    } else if (
      minutesDiff < 30 &&
      (finalArray[initialValue - 1].arch !== brushingObj.arch ||
        finalArray[initialValue - 1].arch === brushingObj.arch) &&
      !brushingObj.interrupted &&
      finalArray[initialValue - 1].status === TIMELINE_STATUS.INCOMPLETE
    ) {
      finalArray[
        initialValue - 1
      ].message = `${STATIC_TEXT.micka_has_brushed} ${brushingObj.arch} ${STATIC_TEXT.arch_at}`;
      finalArray[initialValue - 1].status =
        brushingObj.arch === "upper"
          ? TIMELINE_STATUS.UPPER_ARCH
          : TIMELINE_STATUS.LOWER_ARCH;
      finalArray[initialValue - 1].arch = brushingObj.arch;
      finalArray[initialValue - 1].brushingDate = brushingDate;
      finalArray[initialValue - 1].brushingTime = brushingTime;
    } else if (minutesDiff > 30) {
      // construt status for time line
      getTimelineStatus(brushingObj, brushingDate, brushingTime, finalArray);
    } else {
      console.log("the final array in else part", finalArray);
    }
  };

  // render time line status
  const renderTimeLine = () => {
    let finalArray = [];

    // looping sorted array for getting status
    for (let i = 0; i < SortedArray.length; i++) {
      let brushingObj = SortedArray[i];
      let date = brushingObj.date;
      let brushingDate = moment.utc(date).format("MM/DD/YYYY");
      let brushingTime = moment.utc(date).format("hh:mm:ss");
      // initial check
      if (i === 0) {
        // construt status for time line
        getTimelineStatus(brushingObj, brushingDate, brushingTime, finalArray);
      } else {
        if (
          Date(brushingDate) === Date(finalArray[initialValue - 1].brushingDate)
        ) {
          getTimelineStatusBasedOnTimeFrame(
            brushingObj,
            brushingDate,
            brushingTime,
            finalArray
          );
        } else {
          // construt status for time line
          getTimelineStatus(
            brushingObj,
            brushingDate,
            brushingTime,
            finalArray
          );
        }
      }
    }
    // group array for section list
    getGroupData(finalArray);
  };

  // use reduce to group data based date.
  const getGroupData = (finalArray) => {
    const groupData = finalArray.reduce((groups, data) => {
      const date = data.brushingDate;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(data);
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groupData).map((date) => {
      return {
        date,
        data: groupData[date],
      };
    });
    console.log("SORTED ARRAY : " + JSON.stringify(groupArrays));
    setTimeLineValue(groupArrays);
  };

  // child render item
  const childListRenderItem = ({ item, index }) => (
    <BrushingDetails item={item} />
  );

  // child KeyExtractor
  const childListKeyExtractor = (item, index) => item + index;

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={timeLineValue}
        keyExtractor={childListKeyExtractor}
        renderItem={childListRenderItem}
        renderSectionHeader={({ section: { date } }) => (
          <View style={styles.headerView}>
            <Text style={styles.date}>
              {moment(date).format("dddd D MMM yyyy")}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Timeline;
