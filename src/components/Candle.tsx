import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import Animated from "react-native-reanimated";

export type CandleParams = {
  style: any;
  onPress: () => void;
};

const Candle = (props: CandleParams) => {
  const { style, onPress } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[style]} />
    </TouchableWithoutFeedback>
  );
};

export default Candle;
