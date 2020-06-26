import React from 'react';
import { Alert, ActivityIndicator, Button, View, BackHandler, Text, StyleSheet, ImageBackground, ScrollView, FlatList, Image, StatusBar, Animated, TextInput, TouchableOpacity } from 'react-native';
import { scale, moderateScale, verticalScale } from '../../components/Scale';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { getProduct_Details, getallUser,user_update } from '../../Action'
import LinearGradient from 'react-native-linear-gradient';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            data: '',
            email: '',
            name: '',
            age: '',
            gender: '',
            pwd: '',
            uuid: ''
        }
    }
    componentDidMount = async () => {
        this._data();
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
    
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      handleBackButtonClick = () => {
        this.props.navigation.navigate('Home')
        return true;
      }

    _data = async () => {
        const email = await AsyncStorage.getItem('email');
        const { alluser } = this.props;
        let user = {}
        for (let key in alluser) {
            if (alluser[key].email === email) {
                user = alluser[key]
            }
        }
        this.setState({
            data: user,
            email: user.email,
            name: user.name,
            age: user.age,
            gender: user.gender,
            pwd: user.pwd,
            uuid: user.uuid
        })
    }

    _edit() {
        this.setState({ edit: true })
    }
    _cancel() {
        this._data();
        this.setState({ edit: false })
    }
    _save = async () => {
        var {
            email,
            name,
            age,
            gender,
            pwd,
            uuid
        } = this.state

        const data = {
            "email":email,
            "name": name,
            "age":age,
            "gender": gender,
            "pwd":pwd,
            "uuid":uuid
        }
        //this.props.user_update(data)
        const result = await this.props.user_update(data)
        this.setState({ edit: false })
        // if (result.status === 200) { this.setState({ edit: false })}
        
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
                <View style={{ width: scale(328), height: scale(300), backgroundColor: "#E3E7E7", borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{height:scale(60),justifyContent:"center",alignItems:"center",alignSelf: "flex-end",}}>
                    {!this.state.edit ?
                        <TouchableOpacity style={{ width: scale(57), height: scale(18), borderRadius: 8, borderColor: "#0093E9", borderWidth: 1, backgroundColor: "transparent", marginTop: verticalScale(10), alignSelf: "flex-end", marginRight: scale(10), flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}
                            onPress={() => this._edit()}>
                            <Image
                                style={{ width: scale(7.89), height: scale(7.89) }}
                                source={require("../../assets/edit.png")}
                                resizeMode='contain'
                            />
                            <Text style={{ color: "#0093E9", fontSize: scale(10), fontFamily: "Roboto-Regular", }}>EDIT</Text>
                        </TouchableOpacity> :

                        <View style={{ alignSelf: "flex-end", flexDirection: "column" }}>


                            <TouchableOpacity style={{ width: scale(57), height: scale(18), borderRadius: 8, backgroundColor: "transparent", marginTop: verticalScale(10), alignSelf: "flex-end", marginRight: scale(10), flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}
                                onPress={() => this._save()}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={['#0093E9', '#36C2CF']}
                                    style={{ width: scale(57), height: scale(18), borderRadius: 8, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "#FFFFFF", fontSize: scale(10), fontFamily: "Roboto-Bold", fontWeight: "bold" }}>SAVE</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ position: "relative", width: scale(57), height: scale(18), borderRadius: 8, borderColor: "#0093E9", borderWidth: 1, backgroundColor: "transparent", marginTop: verticalScale(10), alignSelf: "flex-end", marginRight: scale(10), flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}
                                onPress={() => this._cancel()}>
                                <Text style={{ color: "#0093E9", fontSize: scale(10), fontFamily: "Roboto-Regular", }}>CANCEL</Text>
                            </TouchableOpacity>

                        </View>}
                        </View>

                    <View style={{marginLeft:scale(16),marginRight:scale(16) }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: verticalScale(15), alignItems: "center", height: scale(35) }}>
                            <Text style={{ color: "#707070", fontSize: scale(12), fontFamily: "Roboto-Regular", width: "45%" }}>Name</Text>
                            {/* <Text style={{ color: "#000000", fontSize: scale(12), fontFamily: "Roboto-Regular", width: "55%" }}>+91 6396966723</Text> */}
                            <TextInput style={{ color: "#000000", fontSize: scale(12), fontFamily: "Roboto-Regular", width: "55%", alignSelf: "center", height: scale(35), borderBottomWidth: this.state.edit ? 1 : 0, borderBottomColor: this.state.edit ? "#D6D6D6" : null }}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                editable={this.state.edit}
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: verticalScale(15), alignItems: "center", height: scale(35) }}>
                            <Text style={{ color: "#707070", fontSize: scale(12), fontFamily: "Roboto-Regular", width: "45%" }}>Email</Text>
                            <Text style={{ color: "#000000", fontSize: scale(12), fontFamily: "Roboto-Regular", width: "55%" }}>{this.state.email}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: verticalScale(15), alignItems: "center", height: scale(35) }}>
                            <Text style={{ color: "#707070", fontSize: scale(12), fontFamily: "Roboto-Regular", width: "45%" }}>Age</Text>
                            {/* <Text style={{ color: "#000000", fontSize: scale(12), fontFamily: "Roboto-Regular", width: "55%" }}>+91 6396966723</Text> */}
                            <TextInput style={{ color: "#000000", fontSize: scale(12), fontFamily: "Roboto-Regular", width: "55%", alignSelf: "center", height: scale(35), borderBottomWidth: this.state.edit ? 1 : 0, borderBottomColor: this.state.edit ? "#D6D6D6" : null }}
                                onChangeText={(age) => this.setState({ age })}
                                value={this.state.age}
                                editable={this.state.edit}
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: verticalScale(15), alignItems: "center", height: scale(35) }}>
                            <Text style={{ color: "#707070", fontSize: scale(12), fontFamily: "Roboto-Regular", width: "45%" }}>Gender</Text>
                            {/* <Text style={{ color: "#000000", fontSize: scale(12), fontFamily: "Roboto-Regular", width: "55%" }}>+91 6396966723</Text> */}
                            <TextInput style={{ color: "#000000", fontSize: scale(12), fontFamily: "Roboto-Regular", width: "55%", alignSelf: "center", height: scale(35), borderBottomWidth: this.state.edit ? 1 : 0, borderBottomColor: this.state.edit ? "#D6D6D6" : null }}
                                onChangeText={(gender) => this.setState({ gender })}
                                value={this.state.gender}
                                editable={this.state.edit}
                            />
                        </View>

                    </View>
                </View>
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
        alluser: state.getalluser.alluser,
    }
}

export default connect(mapStateToProps, { getProduct_Details, getallUser ,user_update})(Profile)