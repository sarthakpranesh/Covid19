import React from 'react'
import { SafeAreaView as DefaultSafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'

const SafeAreaView = ({ children, style }: SafeAreaViewProps & any) => {
  return (
    <DefaultSafeAreaView
      edges={['right', 'left']}
      style={[{
        flex: 1,
        padding: 0
      }, style]}>
      {children}
    </DefaultSafeAreaView>
  )
}

SafeAreaView.defaultProps = {
  children: null,
  style: null
}

export default SafeAreaView
