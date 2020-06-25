import React from 'react';
import { ActivityIndicator,BackHandler, ScrollView, Button, View, Text, StyleSheet, ImageBackground, Image, StatusBar, Animated } from 'react-native';
import { scale, moderateScale, verticalScale } from '../../components/Scale';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { getProduct_Details } from '../../Action'
import {
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryPie,
    VictoryVoronoiContainer,
    VictoryAxis,
    VictoryLine,
    VictoryLabel,
    VictoryTooltip,
    VictoryScatter,
    VictoryGroup,
    VictoryLegend,
    VictoryStack
} from "victory-native";

class Product_Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.route.params.code,
        }
    }

    componentDidMount = async () => {
        console.log("product", this.state.code);
        

    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
    
      componentWillUnmount() {
    
        //this.listener.remove();
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
                <ScrollView style={{marginTop:verticalScale(75)}}>
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

                    <View style={{ width: scale(328), }}>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={10}>

                        <VictoryBar
                            style={{
                                data: { stroke: "#36C2CF" },
                                parent: { border: "1px solid #36C2CF" }
                            }}
                            data={this.props.graphdata}
                        />
                    </VictoryChart>
                    {/* <VictoryPie
                        data={this.props.graphdata}
                    /> */}
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

const customiseGraphdata = (item) => {
    let data = [];
    for (var i = 0; i <= 4; i++) {
        const Object = {};
        var dateString1 = item[i].date;
        var dateParts = dateString1.split("-");
        var dateObject1 = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        //Object[`x`] = item[i].date
        Object[`x`] = dateObject1.getDate() + " " + month[dateObject1.getMonth()] + ", " + dateObject1.getUTCFullYear()
        Object[`y`] = parseFloat(item[i].nav).toFixed(3)
        data.push(Object);
    }
    console.log("data", data);
    return data
}


function mapStateToProps(state) {
    return {
        userdata: state.register.userdata,
        loder: state.loder,
        productdata: state.product.productdata,
        graphdata: customiseGraphdata(state.product.productdata.data)
    }
}

export default connect(mapStateToProps, { getProduct_Details })(Product_Details)