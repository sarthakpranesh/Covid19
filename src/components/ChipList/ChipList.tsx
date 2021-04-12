import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native'

export type ChipListParam = {
  data: string [];
  selected: string;
  setSelected: (i: string) => void;
}

const ChipList = (props: ChipListParam) => {
  const {
    data,
    selected,
    setSelected
  } = props
  return (
    <FlatList
      style={styles.flatList}
      contentContainerStyle={styles.flatListContainer}
      data={data}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={[
              styles.chipContainer,
              {
                backgroundColor: selected === item ? '#90EE90' : 'white'
              }
            ]}
            onPress={() => setSelected(item)}
          >
            <Text style={styles.chipText}>{item.toLocaleUpperCase()}</Text>
          </TouchableOpacity>
        )
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  flatList: {
    marginTop: 4,
  },
  flatListContainer: {
    paddingLeft: 15
  },
  chipContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8
  },
  chipText: {
    fontSize: 14
  }
})

ChipList.defaultProps = {
  data: ['active', 'total', 'recovered', 'deaths'],
  selected: 'active',
  setSelected: () => {}
}

export default ChipList
