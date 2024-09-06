import { Animated, PanResponder, StyleSheet } from "react-native";
import { FlowHighlightView, FlowText, FlowRow } from "../overrides";
import { LoadingDots } from "../common/LoadingDots";
import { COLORS } from "@/variables/styles";
import { useRef } from "react";

const TRESHOLD = 60;

export const ActivityItem = ({ title, id, isActive, onActivityChange }) => {
  // 创建一个ref，用于存储动画的值
  const pan = useRef(new Animated.ValueXY()).current;

  // 创建一个PanResponder对象，用于处理触摸事件
  const panResonder = useRef(
    PanResponder.create({
      // 当触摸开始时，返回true，表示可以处理触摸事件
      onStartShouldSetPanResponder: () => true,
      // 当用户开始触摸屏幕时，阻止触摸事件被传递给其他组件
      onPanResponderTerminationRequest: () => false,
      // 当触摸移动时，使用Animated.event方法更新pan.x和pan.y的值
      onPanResponderMove: (event, gestureState) => {
        // 获取手势的x轴位移
        const currentX = gestureState.dx;

        // 如果手势的x轴位移大于阈值，则调用onActivityChange函数，将id和state设置为true
        if (currentX > TRESHOLD) {
          onActivityChange({ id, state: true });
        }

        // 如果手势的x轴位移小于阈值，则调用onActivityChange函数，将id和state设置为false
        if (currentX < -TRESHOLD) {
          onActivityChange({ id, state: false });
        }

        // 使用Animated.event方法，传入一个数组和一个对象
        Animated.event(
          [
            // 使用原生驱动
            null,
            { dx: pan.x, dy: pan.y },
          ],
          { useNativeDriver: false }
        )(event, gestureState);
      },

      // 当用户释放手势时，执行以下操作
      onPanResponderRelease: () => {
        // 使用spring动画，将pan的值从当前位置变为{x:0, y:0}
        // 释放手势后，组件会回到原来的位置
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          // 使用原生驱动
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const itemBackground = isActive
    ? { backgroundColor: COLORS.semiDarkGray }
    : { backgroundColor: COLORS.darkGray };

  return (
    // 使用Animated.View组件，并传入panResonder.panHandlers属性
    <Animated.View
      {...panResonder.panHandlers}
      // 设置样式
      style={{
        // 禁止触摸操作
        touchAction: "none",
        // 禁止用户选择文本
        userSelect: "none",
        // 设置transform属性，使组件在x轴上平移
        transform: [{ translateX: pan.x }],
      }}
    >
      <FlowHighlightView style={{ ...styles.itemContainer, ...itemBackground }}>
        <FlowRow style={styles.row}>
          <FlowText>{title}</FlowText>
          {isActive ? 
            <LoadingDots /> :
            <FlowText style={styles.time}>
              00:00:00
            </FlowText>
          }
        </FlowRow>
      </FlowHighlightView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 6,
    paddingVertical: 19,
  },
  row: {
    justifyContent: "space-between",
  },
  time: {
    color: COLORS.brightGreen,
  },
});
