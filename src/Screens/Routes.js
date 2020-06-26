import * as React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { scale, moderateScale, verticalScale } from '../components/Scale';
import {
    DrawerItem,
    createDrawerNavigator,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { Feather, AntDesign } from 'react-native-vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from "./SplashScreen";
import Signin from "./Signin";
import Signup from "./Signup"
import Home from "./Home"
import Profile from "./Profile"
import Product_Details from "./Product_Details"

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
    const [progress, setProgress] = React.useState(new Animated.Value(0));
    const scale = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });
    const borderRadius = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, 16],
    });

    const animatedStyle = { borderRadius, transform: [{ scale }] };
    return (
        <LinearGradient style={{ flex: 1 }} colors={['#0093E9', '#36C2CF']}>
            <Drawer.Navigator
                // hideStatusBar
                drawerType="slide"
                overlayColor="transparent"
                drawerStyle={styles.drawerStyles}
                contentContainerStyle={{ flex: 1 }}
                drawerContentOptions={{
                    activeBackgroundColor: 'transparent',
                    activeTintColor: 'white',
                    inactiveTintColor: 'white',
                }}
                sceneContainerStyle={{ backgroundColor: 'transparent' }}
                drawerContent={props => {
                    setProgress(props.progress);
                    return <DrawerContent {...props} />;
                }}>
                <Drawer.Screen name="Screens">
                    {props => <Screens {...props} style={animatedStyle} />}
                </Drawer.Screen>
            </Drawer.Navigator>
        </LinearGradient>
    )
}

const Screens = ({ navigation, style }) => {
    return (
        <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
            <Stack.Navigator
                screenOptions={{
                    headerTransparent: true,
                    headerTitle: "EduFund",
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ marginLeft: scale(20) }}
                            onPress={() => navigation.openDrawer()}>
                            <Image
                                style={{ width: scale(18), height: scale(18), borderWidth: 0, }}
                                source={require('../assets/menu.png')}
                                resizeMode='contain' />
                        </TouchableOpacity>
                    ),
                }}>
                <Stack.Screen name="Home">{props => <Home {...props} />}</Stack.Screen>
                <Stack.Screen name="Profile">{props => <Profile {...props} />}</Stack.Screen>
                <Stack.Screen name="Product_Details">{props => <Product_Details {...props} />}</Stack.Screen>
            </Stack.Navigator>
        </Animated.View>
    );
};

const DrawerContent = props => {
    return (
        <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>


            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <DrawerItem
                    label="Home"
                    labelStyle={{ color: '#000', fontSize: scale(20) }}
                    style={styles.drawerItem}
                    onPress={() => props.navigation.navigate('Home')}
                    icon={() => <Image
                        style={{ width: scale(18), height: scale(18), borderWidth: 0, }}
                        source={require('../assets/browser.png')}
                        resizeMode='contain' />}
                />
                <DrawerItem
                    label="Profile"
                    labelStyle={{ color: '#000', fontSize: scale(20) }}
                    style={{ alignItems: 'flex-start', marginVertical: 0 }}
                    onPress={() => props.navigation.navigate('Profile')}
                    icon={() => <Image
                        style={{ width: scale(18), height: scale(18), borderWidth: 0, }}
                        source={require('../assets/user.png')}
                        resizeMode='contain' />}
                />

                {/* <DrawerItem
                    label="Logout"
                    labelStyle={{ color: '#000', fontSize: scale(20) }}
                    style={{ alignItems: 'flex-start', marginVertical: 0 }}
                    onPress={() => props.navigation.navigate('Logout')}
                    icon={() => <Image
                        style={{ width: scale(18), height: scale(18), borderWidth: 0, }}
                        source={require('../assets/logout.png')}
                        resizeMode='contain' />}
                /> */}
            </View>

        </DrawerContentScrollView>
    );
};

function UserStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Signin">
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    )
}
function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="SplashScreen">
                <Stack.Screen name="UserStack" component={UserStack} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="HomeStack" component={HomeStack} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5,
    },
    drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
    drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
    drawerLabel: { color: 'white', marginLeft: -16 },
    avatar: {
        borderRadius: 60,
        marginBottom: 16,
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
    },
});

export default App;