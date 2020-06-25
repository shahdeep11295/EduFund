import React from 'react';
import { Alert,ActivityIndicator,Button, View,BackHandler, Text, StyleSheet, ImageBackground, ScrollView, FlatList, Image, StatusBar, Animated, TextInput,TouchableOpacity } from 'react-native';
import { scale, moderateScale, verticalScale } from '../../components/Scale';
import AsyncStorage from '@react-native-community/async-storage';
import data from "../../Json/data.json"
import { connect } from 'react-redux';
import { getProduct_Details } from '../../Action'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.arrayholder = data;
        this.state = {
            text: '',
            collection: data
        }
    }

    componentDidMount() {
        console.log("data", data);

    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
    
      componentWillUnmount() {
    
        //this.listener.remove();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      handleBackButtonClick = () => {
        Alert.alert(
          'Exit App',
          'Exiting the application?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }, {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
          },], {
          cancelable: false
        }
        )
        return true;
      }

    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            collection: newData,
            text: text,
        });
    }

    selectproduct = async(item) => {
        const result = await this.props.getProduct_Details(item)
        console.log("result", result);
        if(result.status=== 200){
        this.props.navigation.navigate('Product_Details',{
                                    code: item.code,})}
    }

    render() {
        if (this.props.loder) {
            return (
                <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: scale(328), height: scale(40), backgroundColor: "#FFFFFF", borderRadius: 8, flexDirection: "row", marginTop: verticalScale(70), justifyContent: "center", alignItems: "center" }}>
                    <TextInput style={{ width: "80%", }}
                        onChangeText={text => this.SearchFilterFunction(text)}
                        value={this.state.text}
                    />
                    <Image style={{ width: scale(16.85), height: scale(16.85), marginLeft: scale(15), }}
                        resizeMode='center'
                        source={require('../../assets/Search.png')} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <View style={{ marginLeft: scale(16), marginRight: scale(16) }}>
                        <FlatList
                            data={this.state.collection}
                            keyExtractor={(item, index) => index.toString()}
                            enableEmptySections={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity 
                                onPress={()=>this.selectproduct(item.code)}
                                activeOpacity={0.5}
                                style={{ height: scale(50), justifyContent: "center", marginTop: verticalScale(20), borderBottomColor: "#B5BABB", borderBottomWidth: 1 }}>
                                    <Text style={{ fontSize: scale(15) }} numberOfLines={2}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
})

function mapStateToProps(state) {
    return {
        userdata: state.register.userdata,
        loder: state.loder,
        productdata: state.product.productdata,
        //graphdata: customiseGraphdata(state.product.productdata.data)
    }
}

export default connect(mapStateToProps, { getProduct_Details })(Home)

// export default Home;