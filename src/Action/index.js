import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import firebase from '../Database/firebase';
import {
    REGISTER,
    HIDELODER,
    SHOWLODER,
    PRODUCT_DETAILS
} from '../utils/constant';
import { config } from "../utils/config"

export const loadingOn = (dispatch) => {
    dispatch({
        type: SHOWLODER,
    });
};

export const loadingOff = (dispatch) => {
    dispatch({
        type: HIDELODER,
    });
};

export const saveUser = (userdata, callback = () => { }) => async (dispatch, getState) => {
    loadingOn(dispatch)
    try {
        firebase
            .auth()
            .createUserWithEmailAndPassword(userdata.email, userdata.password)
            .then((res) => {
                firebase
                    .database()
                    .ref('users/' + userdata.displayName)
                    .set({ name: userdata.displayName, email: userdata.email, pwd: userdata.password, gender: userdata.Gender, age: userdata.Age })
                    .then((res) => {
                        dispatch({
                            type: REGISTER,
                            payload: userdata
                        })
                        callback()
                    })
                    .catch((error) => { console.log('Error getting documents:1 ', error) })
            })
            .catch(error => { alert(error.message); console.log('Error getting documents:1 ', error) })
    }
    catch (e) {
        console.log("Action_saveUser_error", e.response, e);
    }
    finally {
        loadingOff(dispatch)
    }
}

export const login = (data, callback = () => { }) => async (dispatch, getState) => {
    loadingOn(dispatch)
    try {
        firebase
            .auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then(async (res) => {
                console.log('res ', res)
                await AsyncStorage.setItem('logged', '1');
                callback()
            })
            .catch(error => { alert(error.message); console.log('Error getting documents:1 ', error) })
    }
    catch (e) {
        console.log("Action_saveUser_error", e.response, e);
    }
    finally {
        loadingOff(dispatch)
    }
}

export const getProduct_Details = (code, callback = () => { }) => async (dispatch, getState) => {
    loadingOn(dispatch)
    try {
        const response = await axios.get(config().url+code);
        // const response = await axios.get(`${url}/inventorymanagement/api/inventory/getAllInventoryDetails`);
        console.log("Action_getProduct_Details_response", response);
        if (response.data)
            dispatch({
                type: PRODUCT_DETAILS,
                payload: response.data
            })
        return response;
    }
    catch (e) {
        console.log("Action_getProduct_Details_error", e)
        alert(e);
    }
    finally {
        loadingOff(dispatch)
    }
}