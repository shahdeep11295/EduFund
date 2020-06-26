import React from 'react';
import { ActivityIndicator, BackHandler, ScrollView, Button, View, Text, StyleSheet, ImageBackground, Image, StatusBar, Animated, Dimensions } from 'react-native';
import { scale, moderateScale, verticalScale } from '../../components/Scale';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { getProduct_Details } from '../../Action'
import {customiseGraphdata} from "../../utils/Customisedata"
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';

class Product_Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.route.params.code,
            type: "column2d",
            width: "100%",
            height: "100%",
            dataFormat: "json",
        }
    }

    componentDidMount = async () => {
        console.log("product", this.state.code);


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

    render() {
        console.log("loder", this.props.loder, this.props.productdata);
        if (this.props.loder) {
            return (
                <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ScrollView style={{ marginTop: verticalScale(75) }}
                showsVerticalScrollIndicator={false}>
                    <View style={{ width: scale(328), height: scale(190), backgroundColor: "#E3E7E7", borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ marginLeft: scale(16), marginRight: scale(16), }}>
                            <View style={{ flexDirection: "row", }}>
                                <Text style={{ fontSize: scale(15), width: "50%" }}>Fund House : </Text>
                                <Text style={{ fontSize: scale(15), width: "50%" }} numberOfLines={2}>{this.props.productdata.meta.fund_house}</Text>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: verticalScale(16), }}>
                                <Text style={{ fontSize: scale(15), width: "50%" }}>Scheme Name : </Text>
                                <Text style={{ fontSize: scale(15), width: "50%" }} numberOfLines={2}>{this.props.productdata.meta.scheme_name}</Text>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: verticalScale(16), }}>
                                <Text style={{ fontSize: scale(15), width: "50%" }}>Scheme Type : </Text>
                                <Text style={{ fontSize: scale(15), width: "50%" }} numberOfLines={2}>{this.props.productdata.meta.scheme_type}</Text>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: verticalScale(16), }}>
                                <Text style={{ fontSize: scale(15), width: "50%" }}>Scheme Category : </Text>
                                <Text style={{ fontSize: scale(15), width: "50%" }} numberOfLines={2}>{this.props.productdata.meta.scheme_category}</Text>
                            </View>
                        </View>
                    </View>

                    <BarChart
                        data={{
                            labels: this.props.xaxis,
                            datasets: [
                                {
                                    data: this.props.yaxis,

                                },
                            ],
                        }}
                        verticalLabelRotation={90}
                        width={Dimensions.get('window').width - 16}
                        height={475}
                        chartConfig={{
                            backgroundColor: '#1cc910',
                            backgroundGradientFrom: '#eff3ff',
                            backgroundGradientTo: '#efefef',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                    <LineChart
                        data={{
                            labels: this.props.xaxis,
                            datasets: [
                                {
                                    data: this.props.yaxis,
                                    strokeWidth: 2,
                                },
                            ],
                        }}
                        verticalLabelRotation={90}
                        width={Dimensions.get('window').width - 16}
                        height={475}
                        chartConfig={{
                            backgroundColor: '#1cc910',
                            backgroundGradientFrom: '#eff3ff',
                            backgroundGradientTo: '#efefef',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        style={{
                            marginVertical: 20,
                            borderRadius: 16,
                        }}
                    />

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
       xaxis: customiseGraphdata(state.product.productdata.data,"xaxis"),
       yaxis: customiseGraphdata(state.product.productdata.data,"yaxis"),
    }
}

export default connect(mapStateToProps, { getProduct_Details })(Product_Details)