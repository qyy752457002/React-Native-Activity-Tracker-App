import { FlowRow } from "../overrides";
import { Animated, Easing, StyleSheet } from "react-native";
import { COLORS } from "../../variables/styles";
import { useRef, useEffect } from "react";

const createTimingAnim = (opacity, toValue, duration) =>
  Animated.timing(opacity, {
    toValue: 1,
    duration,
    easing: Easing.ease,
    useNativeDriver: false,
  });

export const LoadingDots = ({color}) => {
  // 定义一个常量dotColor，如果color存在，则赋值为color，否则赋值为COLORS.white
  const dotColor = color || COLORS.white;
  // 创建一个长度为3的数组，每个元素都是一个新的Animated.Value对象，初始值为0
  const dotOpacities = useRef(
    Array(3)
      .fill(0)
      .map((o) => new Animated.Value(o))
  ).current;

  useEffect(() => {
    // 定义dotShowAnimations数组，包含三个动画，分别控制dot10pacity、dot20pacity、dot30pacity的透明度从0到1
    const dotShowAnimations = dotOpacities.map((opacity) =>
      createTimingAnim(opacity, 1, 700)
    );
    const dotHideAnimations = dotOpacities.map((opacity) =>
      createTimingAnim(opacity, 0, 500)
    );

    // 定义sequence数组，包含dotShowAnimations、delay(300)、dotHideAnimations三个动画，按顺序执行
    const sequence = Animated.sequence([
      // 使用Animated.stagger方法，每隔200毫秒执行一次dotShowAnimations动画
      Animated.stagger(200, dotShowAnimations),
      // 延迟200毫秒
      Animated.delay(200),
      // 并行执行dotHideAnimations数组中的动画
      Animated.parallel(dotHideAnimations),
    ]);

    // 定义loop循环，循环执行sequence动画
    const loop = Animated.loop(sequence);
    loop.start();

    // 组件卸载时停止循环
    return () => {
      loop.stop();
    };
  }, []);

  return (
    <FlowRow>
      {dotOpacities.map((opacity, index) => (
        <Animated.View
          key={`dot-${index}`}
          style={{ ...styles.dot, opacity, backgroundColor: dotColor }}
        />
      ))}
    </FlowRow>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
