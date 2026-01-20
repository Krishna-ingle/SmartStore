import React from "react";
import { SafeAreaView,StyleSheet, Text, TextInput ,Image,View} from "react-native";
import SearchIcon from "../../Asset/Icon&img/searchIcon";

const SearchBarCom = ()=>{
    return(
        <SafeAreaView>
            <View style={style.SectionStyle}>
            <View style={style.ImageStyle}>
            <SearchIcon/>
            </View>
            <TextInput
        style={style.Searchbar}
        placeholder="Search fresh.."
        underlineColorAndroid="transparent"
         />
     </View>
        </SafeAreaView>
    );
}

const style =StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        backgroundColor: '#EEF0EE',
        height: 40,
        width:280,
        marginLeft:18,
        borderRadius: 10,
        paddingLeft:10,
    },
    Searchbar:{
        marginLeft:5,
        fontSize:16,
    },
    ImageStyle: {
        display:'flex',
        justifyContent:'center',
        height: 25,
        width: 25,
        marginTop:5,
    }
}
);
export default SearchBarCom;