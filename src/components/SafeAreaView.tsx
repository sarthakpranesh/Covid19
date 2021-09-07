import React from "react";
import { SafeAreaView as DefaultSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = ({ children, style }: any) => {
  return (
    <DefaultSafeAreaView
      edges={["right", "left"]}
      style={[
        {
          flex: 1,
          padding: 0,
          backgroundColor: "#DEF7FF",
        },
        style,
      ]}
    >
      {children}
    </DefaultSafeAreaView>
  );
};

export default SafeAreaView;
