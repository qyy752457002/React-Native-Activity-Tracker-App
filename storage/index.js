// 导入AsyncStorage模块
import AsyncStorage from "@react-native-async-storage/async-storage";

// 存储数据
const storeData = async (key, value) => {
  try {
    // 将数据转换为JSON字符串并存储在AsyncStorage中
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    // 打印错误信息
    console.error("Error storing data:", error);
    return false;
  }
};

// 加载数据
const loadData = async (key) => {
  try {
    // 从AsyncStorage中获取数据
    const value = await AsyncStorage.getItem(key);
    // 如果有数据，则将JSON字符串转换为对象并返回
    return value ? JSON.parse(value) : null;
  } catch (error) {
    // 打印错误信息
    console.error("Error retrieving data:", error);
    return null;
  }
};

// 存储每日流水项
const storeDayFlowItems = async (data) => {
  // 调用storeData函数存储数据
  return storeData("dayFlowItems", data);
};

// 加载每日流水项
const loadDayFlowItems = async () => {
  // 调用loadData函数加载数据
  return loadData("dayFlowItems");
};

const isAsyncStorageEnabled = async () => {
  try {
    await AsyncStorage.setItem("flowTestKey", "testFlowValue");
    await AsyncStorage.getItem("flowTestKey");
    return true;
  } catch (error) {
    console.error("Storage is not enabled: ", error)
    return false; 
  }
}

// 导出函数
export { storeData, loadData, storeDayFlowItems, loadDayFlowItems, isAsyncStorageEnabled};
