import React, { useEffect } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'

export type CandleParams = {
  key: string;
  style: any;
  onPress: () => void;
}

const Candle = (props: CandleParams) => {
  const { key, style, onPress } = props

  return (
    <TouchableWithoutFeedback
      key={key}
      onPress={onPress}
    >
      <Animated.View
        style={[style]}
      />
    </TouchableWithoutFeedback>
  )
}

export default Candle
