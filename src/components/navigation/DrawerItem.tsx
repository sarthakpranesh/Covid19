import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { SvgProps } from 'react-native-svg'

// importing constants
import Layout from '../../Layout'
const scale = Layout.fontScale

export interface DrawerItemProps {
  label: string;
  onPress: () => {};
  Icon: (p: SvgProps) => JSX.Element;
  style?: any;
}

const DrawerItem = ({ label, onPress, Icon, style }: DrawerItemProps) => {
  return (
    <TouchableOpacity style={styles.drawerItemContainer} onPress={onPress}>
      <View style={styles.innerDrawerItemContainer}>
        {
          Icon({
            color: 'black',
            style: {
              paddingHorizontal: 4,
              scaleX: scale,
              scaleY: scale
            }
          })
        }
        <Text style={styles.drawerTextStyle}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  drawerItemContainer: {
    alignSelf: 'stretch',
    padding: 8
  },
  innerDrawerItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  drawerTextStyle: {
    paddingLeft: 4,
    fontSize: 14 * scale,
    fontWeight: 'bold'
  }
})

export default DrawerItem
