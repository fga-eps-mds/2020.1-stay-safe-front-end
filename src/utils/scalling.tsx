import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
    size + (scale(size) - size) * factor;

const percentage = (percent) => (percent / 100) * width;
const vPercentage = (percent) => (percent / 100) * height;

export { scale, verticalScale, moderateScale, percentage, vPercentage };
