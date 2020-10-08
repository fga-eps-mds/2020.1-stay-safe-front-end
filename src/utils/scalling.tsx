import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

const percentage = (percent: number) => (percent / 100) * width;
const vPercentage = (percent: number) => (percent / 100) * height;

export { scale, verticalScale, moderateScale, percentage, vPercentage };
