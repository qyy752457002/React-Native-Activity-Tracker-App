import { View, StyleSheet } from "react-native";
import { FlowHighlightView, FlowText, FlowRow } from "../overrides";
import { COLORS } from "@/variables/styles";

// 定义一个ActivityTimer组件
export const ActivityTimer = () => {
  return (
    // 使用FlowHighlightView组件包裹时间容器
    <FlowHighlightView style={styles.timeContainer}>
      <FlowRow style={styles.row}>
        <FlowText>No Activity</FlowText>
      </FlowRow>

      <FlowRow style={styles.row}>
        <FlowText style={styles.time}>00:00:00</FlowText>
      </FlowRow>
    </FlowHighlightView>
  );
};

// 定义样式
const styles = StyleSheet.create({
  // 时间容器样式
  timeContainer: {
    marginVertical: 10,
  },
  // 行样式
  row: {
    justifyContent: "center",
  },
  // 时间文本样式
  time: {
    color: COLORS.brightGreen
  }
});
