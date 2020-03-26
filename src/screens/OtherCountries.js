import React from 'react';
import {View,Text,StyleSheet,FlatList,ActivityIndicator,Dimensions} from 'react-native';
import Drawer from '../components/Drawer';
const screenwidth = Dimensions.get('window').width;

export default class OtherCountries extends React.Component{
    state = {
        loading : true,
        data : []
    }
    componentDidMount(){
        this.fetchapi();
    }
    fetchapi = () => {
        fetch('https://covid2019-api.herokuapp.com/v2/current')
        .then((response) => response.json())
        .then((responsejson) => {this.setState({
            loading : false,
            data : responsejson.data
        })
        })
        .catch((error)=>console.log(error))
    }
    renderitem = (item) => {
        return(
                <View style={styles.countrystyle}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:20}}>{item.location}</Text>
                </View>
                <View style={{flex:1,display:'flex',flexDirection:'row'}}>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Text style={{color:'red',fontWeight:'bold'}}>Confirmed</Text>
                        <Text style={{fontSize:18}}>{item.confirmed}</Text>
                    </View>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Text style={{color:'red',fontWeight:'bold'}}>Deaths</Text>
                        <Text style={{fontSize:18}}>{item.deaths}</Text>
                    </View>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Text style={{color:'red',fontWeight:'bold'}}>Recovered</Text>
                        <Text style={{fontSize:18}}>{item.recovered}</Text>
                    </View>
                </View>
            </View>
        );
    }
    render(props){
        if(this.state.loading)
        {
            return(
               
                <View style={{flex:1,backgroundColor:'#fff'}}>
                     <Drawer 
                    navigate={this.props.navigation} 
                    title=' Other Countries '
                    />
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <ActivityIndicator color="blue" size="large"/>
                        <Text style={{color:'red',fontSize:15,fontWeight:'bold',marginTop:10}}>Loading Data ...</Text>
                    </View>
            </View>
            );
        }
        else
        {
            return(
                
                <View style={{flex:1,backgroundColor:'#fff'}}>
                    <Drawer 
                    navigate={this.props.navigation} 
                    title=' Other Countries '
                    />
                    <FlatList
                    data = {this.state.data}
                    renderItem={({item}) => this.renderitem(item) }
                    keyExtractor={(item) => item.location}/>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    countrystyle : {
        flex:1,
        width : screenwidth,
        height : 100,
        display : 'flex',
        marginVertical : 10,
        borderRadius : 10,
        backgroundColor : '#f2ffff'
    }
})