import { FlatList, StyleSheet, View, Text } from "react-native";
import { ActivityTimer } from "@/components/activity/Timer";
import { ActivityItem } from "@/components/activity/Item";
import defaultItems from "@/data/activities.json";

import { FlowRow, FlowText } from "@/components/overrides";
import { useState, useEffect } from "react";
import { loadDayFlowItems, storeDayFlowItems } from "../storage";

export const ActivityHomeScreen = ({ isStorageEnabled }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const load = async () => {
      // 从loadDayFlowItems函数中获取items
      const items = await loadDayFlowItems();
      // 如果items为空，则将defaultItems赋值给activities
      !items ? setActivities(defaultItems) : setActivities(items);
      // 如果items不为空，则将items赋值给activities
      items ? setActivities(items) : setActivities(defaultItems);
    };

    load();
  }, []);

  const saveToStorage = (data) => {
    if (isStorageEnabled) {
      // 将data保存到本地存储
      storeDayFlowItems(data);
    }
  };

  // 检查活动状态
  const checkActivity = ({ id, state }) => {
    // 设置活动
    setActivities((activities) => {
      // 找到活动在数组中的索引
      const candidateIdx = activities.findIndex(
        (activity) => activity.id === id
      );

      // 如果找到了活动
      if (candidateIdx > -1 && activities[candidateIdx].isActive != state) {
        console.log("Changing State!");
        // 创建新的活动数组，将找到的活动状态设置为state，其他活动状态设置为false
        const newActivities = activities.map((a) =>
          a.id === id ? { ...a, isActive: state } : { ...a, isActive: false }
        );

        saveToStorage(newActivities);
        // 返回新的活动数组
        return newActivities;
      }

      // 如果没有找到活动，返回原来的活动数组
      return activities;
    });
  };

  return (
    <View style={styles.screenContainer}>
      <ActivityTimer></ActivityTimer>
      <FlowRow style={styles.listHeading}>
        <FlowText style={styles.text}>Activities</FlowText>
        <FlowText style={styles.text}>Add</FlowText>
      </FlowRow>
      <FlatList
        data={activities}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <ActivityItem {...item} onActivityChange={checkActivity} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: "100%",
  },
  listHeading: {
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
