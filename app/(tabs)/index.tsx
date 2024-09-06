import { StyleSheet, View, SafeAreaView } from "react-native";
import { ActivityHomeScreen } from "@/screens/Home";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "@/variables/styles";
import { useEffect, useState } from "react";
import { isAsyncStorageEnabled } from "@/storage";

export default function HomeScreen() {
  // 声明一个状态变量isStorageEnabled，初始值为null
  const [isStorageEnabled, setIsStorageEnabled] = useState<boolean | null>(
    null
  );

  // useEffect钩子函数，在组件挂载时执行
  useEffect(() => {
    // 定义一个异步函数checkStorage，用于检查异步存储是否启用
    const checkStorage = async () => {
      // 调用isAsyncStorageEnabled函数，获取异步存储是否启用的状态
      const isEnabled = await isAsyncStorageEnabled();
      // 将异步存储是否启用的状态设置为isStorageEnabled
      setIsStorageEnabled(isEnabled);
    };

    // 调用checkStorage函数
    checkStorage();
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {isStorageEnabled == null ? (
          <></>
        ) : (
          <ActivityHomeScreen isStorageEnabled={isStorageEnabled} />
        )}
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
