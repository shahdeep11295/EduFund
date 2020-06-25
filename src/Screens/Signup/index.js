import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { scale, moderateScale, verticalScale } from '../../components/Scale';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { saveUser } from '../../Action'

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            Gender: '',
            Age: '',
            isLoading: false
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    registerUser = async () => {
        if (this.state.email === '' || this.state.password === '' || this.state.displayName == '' || this.state.Gender === '' || this.state.Age === '') {
            Alert.alert('Enter details to signup!')
        } else {
            const data = {
                email: this.state.email,
                password: this.state.password,
                displayName: this.state.displayName,
                Gender: this.state.Gender,
                Age: this.state.Age
            }
            const result = await this.props.saveUser(data, () => this.props.navigation.navigate('Signin'))
        }
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
            <View style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                padding: 35,
                backgroundColor: '#fff'
            }}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Name"
                    value={this.state.displayName}
                    onChangeText={(val) => this.updateInputVal(val, 'displayName')}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={(val) => this.updateInputVal(val, 'email')}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Age"
                    value={this.state.Age}
                    onChangeText={(val) => this.updateInputVal(val, 'Age')}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Gender"
                    value={this.state.Gender}
                    onChangeText={(val) => this.updateInputVal(val, 'Gender')}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                    maxLength={15}
                    secureTextEntry={true}
                />
                <Button
                    color="#3740FE"
                    title="Signup"
                    onPress={() => this.registerUser()}
                />

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Signin')}>
                    <Text
                        style={styles.loginText}
                    >
                        Already Registered? Click here to login
        </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
})

function mapStateToProps(state) {
    return {
        userdata: state.register.userdata,
        loder: state.loder,
    }
}

export default connect(mapStateToProps, { saveUser })(Signup)
