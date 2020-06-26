import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import firebase from '../Database/firebase';
import {
    REGISTER,
    HIDELODER,
    SHOWLODER,
    PRODUCT_DETAILS,
    GET_ALL_USERS,
    UPDATE_USER
} from '../utils/constant';
import { config } from "../utils/config"
import { v4 as uuidv4 } from 'uuid';

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
        const id = uuidv4();
        console.log("id", id);
        firebase
            .auth()
            .createUserWithEmailAndPassword(userdata.email, userdata.password)
            .then((res) => {
                console.log("createUserWithEmailAndPassword", res);
                firebase
                    .database()
                    .ref('users/' + id)
                    .set({ name: userdata.displayName, email: userdata.email, pwd: userdata.password, gender: userdata.Gender, age: userdata.Age, uuid: id })
                    .then((res) => {
                        console.log("database", res);
                        firebase
                            .firestore()
                            .collection('users')
                            .doc(id)
                            .set({ name: userdata.displayName, email: userdata.email, pwd: userdata.password, gender: userdata.Gender, age: userdata.Age, uuid: id })
                            .then((res) => {
                                console.log("firestore", res);
                                dispatch({
                                    type: REGISTER,
                                    payload: userdata
                                })
                                callback()
                            })

                            .catch((error) => { console.log('firestore', error) })
                    })
                    .catch((error) => { console.log('database', error) })

                    .catch(error => { alert(error.message); console.log('createUserWithEmailAndPassword', error) })
            })
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
                await AsyncStorage.setItem('email', data.email);
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
        const response = await axios.get(config().url + code);
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

export const getallUser = () => async (dispatch, getState) => {
    loadingOn(dispatch)
    try {
        const id = uuidv4();
        console.log("id", id);
        firebase
            .firestore()
            .collection('users')
            .get()
            .then(function (query) {
                let allusers = query.docs.map(doc => doc.data())
                console.log("post", allusers);
                dispatch({
                    type: GET_ALL_USERS,
                    payload: allusers
                })
                return allusers
            })
            .catch(error => { alert(error.message); console.log('createUserWithEmailAndPassword', error) })
    }
    catch (e) {
        console.log("Action_saveUser_error", e.response, e);
    }
    finally {
        loadingOff(dispatch)
    }
}

export const user_update = (userdata, callback = () => { }) => async (dispatch, getState) => {
    loadingOn(dispatch)
    try {
        console.log("d",userdata);
        firebase
            .database()
            .ref('users/' + userdata.uuid)
            .update({ name: userdata.name, email: userdata.email, pwd: userdata.pwd, gender: userdata.gender, age: userdata.age, uuid: userdata.uuid })
            .then((res) => {
                console.log("database", res);
                firebase
                    .firestore()
                    .collection('users')
                    .doc(userdata.uuid)
                    .set({ name: userdata.name, email: userdata.email, pwd: userdata.pwd, gender: userdata.gender, age: userdata.age, uuid: userdata.uuid })
                    .then((res) => {
                        console.log("firestore", res);
                        dispatch({
                            type: UPDATE_USER,
                            payload: userdata
                        })
                        callback()
                    })

                    .catch((error) => { console.log('firestore', error) })
            })
            .catch((error) => { console.log('database', error) })
    }
    catch (e) {
        console.log("Action_saveUser_error", e.response, e);
    }
    finally {
        loadingOff(dispatch)
    }
}


    //     firebase
            //         .auth()
            //         .createUserWithEmailAndPassword(userdata.email, userdata.password)
            //         .then((res) => {
            //             firebase
            //                 .database()
            //                 .ref('users/' + userdata.displayName)
            //                 .set({ name: userdata.displayName, email: userdata.email, pwd: userdata.password, gender: userdata.Gender, age: userdata.Age })
            //                 .then((res) => {
            //                     dispatch({
            //                         type: REGISTER,
            //                         payload: userdata
            //                     })
            //                     callback()
            //                 })
            //                 .catch((error) => { console.log('Error getting documents:1 ', error) })
            //         })
            //         .catch(error => { alert(error.message); console.log('Error getting documents:1 ', error) })
            // }
            // catch (e) {
            //     console.log("Action_saveUser_error", e.response, e);