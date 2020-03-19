import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

class LineChart extends Component {
    chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5
      };

      shouldComponentUpdate (nextProps) {
          console.log(nextProps);
          if (nextProps.data !== this.props.data) {
              return true;
          }
          return false;
      }

    render () {
        const timeLineData = this.props.data;
        return (
            <View>
                <Text>{ this.props.title ? this.props.title : "Section Title" }</Text>
                {
                        timeLineData
                    ?
                        <LineChart
                            data={{
                            labels: timeLineData.labels,
                            datasets: [
                                {
                                data: timeLineData.totals
                                }
                            ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}
                            yAxisLabel="$"
                            yAxisSuffix="k"
                            yAxisInterval={0.001} // optional, defaults to 1
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                marginVertical: 8,
                                marginHorizontal: 10,
                                borderRadius: 5
                            }}
                        />
                    :
                        <Text>Loading</Text>
                    }
                </View>
        );
    }
}

export default LineChart;