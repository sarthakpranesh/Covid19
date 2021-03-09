import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'

export type CandleParams = {
  key: string;
  style: any;
  onPress: () => void;
}

const Candle = (props: CandleParams) => {
  const { key, style, onPress } = props
  const barHeight = style.height

  const translateYAnimation = useSharedValue(0)

  const _onPress = () => {
    onPress()
    translateYAnimation.value = withSequence(
      withTiming(
        barHeight / 2,
        {
          duration: 500,
          easing: Easing.ease
        }
      ),
      withTiming(
        0,
        {
          duration: 500,
          easing: Easing.ease
        }
      )
    )
  }

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateYAnimation.value,
      [0, barHeight / 2],
      [0.6, 0],
      Extrapolate.CLAMP
    )
    return {
      transform: [
        { translateY: translateYAnimation.value }
      ],
      opacity
    }
  })

  return (
    <TouchableWithoutFeedback
      key={key}
      onPress={() => _onPress()}
    >
      <Animated.View
        style={[style, animatedStyle]}
      />
    </TouchableWithoutFeedback>
  )
}

export default Candle
