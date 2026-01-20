import React from "react"
import { View, 
    Text, SafeAreaView,
    StyleSheet,
} from "react-native"
import {IndianRupeeIcon, SearchIcon} from "lucide-react-native"
import colors from "../../Asset/Colors/colors"
// use for redux
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { color } from "@cloudinary/url-gen/qualifiers/background";
import InputText from "../../UIComponent/inputText";
import { TextInput } from "react-native-gesture-handler";
const cardViewOfTodaySales = () => {
    const shopDetails = useSelector((state: RootState) => state.shop.currentShop);
    
    return(
        <SafeAreaView>
            <View style={styles.TodaySaleCardContener}>
                <View style = {{display:'flex'}}>
                    <Text style={{color:colors.headingBlackColor, fontSize:24, fontWeight:'bold'}}>
                        {shopDetails?.shopName}</Text>

                    <Text style={{color:colors.subHeading, fontSize:14, fontWeight:'bold',width:200,
                    marginTop:5
                    }}>{shopDetails?.description}</Text>

                    <Text style={{color:colors.gradientColorone, fontSize:18, fontWeight:'bold',
                    alignContent:'center',justifyContent:'center',
                    marginTop:10,
                    }}><Text style={{color:colors.headingBlackColor, fontSize:18, fontWeight:'bold'}}>Today Sales </Text><IndianRupeeIcon size={14} color={colors.gradientColorone}/>5000.00</Text>
                </View>
                
                <View style={{
                    alignContent:'center',
                    width: 100,
                    height:100,
                    backgroundColor: colors.greenBackground,
                    borderRadius:"50%",
                    justifyContent:'center',
                    alignItems:'center',
                    borderColor:colors.gradientColorone,
                    borderWidth:4,
                }}>
                <IndianRupeeIcon color={colors.gradientColorone} size={55} strokeWidth={2} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const searchBar = () => {
    const [searchText, setSearchText] = React.useState('');
    return(
        <SafeAreaView>
            <View style={{margin:10,
                padding: 10,
            }}>
                <Text style={{fontSize:18, fontWeight:'bold', color:colors.subHeading}}>Payment History</Text>
               
                <View style={{
                    borderWidth:0.5, borderColor:colors.subHeading, borderRadius:8, padding:8,
                    display:'flex', flexDirection:'row', alignItems:'center',
                    alignContent:'center',
                    height:45,
                    marginTop:10
                    }}>
                        <SearchIcon color={colors.subHeading} size={20}  />
                        <TextInput
                        style={{flex:1, marginLeft:5, height:42, fontSize:16,}}
                        placeholder="Search Customer Name or Date"
                        value={searchText}
                        onChangeText={setSearchText}
                        />
                </View>
            </View>
        </SafeAreaView>
    )
}
const cardViewHistory = () => {
    return(
        <SafeAreaView>
            <View style={{display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                height:70,
                backgroundColor:colors.white,
                padding: 20,
                alignItems:'center',
                paddingHorizontal:18,
            }}>
                {/* icon of history */}
                <View style={{
                    width: 50, height:50, borderRadius:"50%", backgroundColor: colors.greenBackground ,
                    alignItems:'center', justifyContent:'center',
                }}>
                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:colors.gradientColorone, fontSize:18, fontWeight:'bold'}}>S</Text>
                        <Text style={{color:colors.gradientColorone, fontSize:18, fontWeight:'bold', marginLeft:2}}>D</Text>
                    </View>
                    
                </View>

                {/* user data */}
                <View style={{display:'flex', justifyContent:'center', marginLeft:20, flex:1}}>
                    <Text style={{color:colors.headingBlackColor, fontSize:16, fontWeight:'bold'}}>Krishna Ingle</Text>
                    <Text style={{color:colors.subHeading, fontSize:12, fontWeight:'medium', marginTop:5}}>Milk 1li</Text>
                    <Text style={{color:colors.subHeading, fontSize:12, fontWeight:'medium', marginTop:5}}>Sent on 5-12-2025, 12:35</Text>
                </View>

                {/* for payment */}
                <View style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:colors.gradientColorone, fontSize:18, fontWeight:'bold'}}>+<IndianRupeeIcon size={14} color={colors.gradientColorone} />500</Text>
                    <Text style={{color:colors.subHeading, fontSize:12, fontWeight:'medium', marginTop:5}}>Paid</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
export const TodaySalesScreen = ()=>{
    return(
        <SafeAreaView>
            <View style={{backgroundColor:colors.white}}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Sales & History</Text>
                </View>
                {cardViewOfTodaySales()}
                {searchBar()}
                {cardViewHistory()}
            </View>
        </SafeAreaView>
 )
}
const styles = StyleSheet.create({
    TodaySaleCardContener: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginTop: 20 ,
        margin: 10,
        padding: 20, 
        backgroundColor: colors.white,
    },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginLeft: 10,
  },
})