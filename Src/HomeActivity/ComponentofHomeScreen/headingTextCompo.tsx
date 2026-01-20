
import React from "react";
import { View,SafeAreaView, Text ,StyleSheet} from "react-native";
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from "react-native-linear-gradient";
const HeadingText =()=>{
    return(
        <SafeAreaView style={style.container}>
            <View >
      <MaskedView maskElement={
        <Text style={style.text}>Hey User .</Text>
      }> 
        <LinearGradient
          colors={['#0EDA0E', '#046307']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0}}
          locations={[0,0.3]}
        >
          <Text style={[style.text, { opacity: 0 }]}>Hello Gradient</Text>
        </LinearGradient>
      </MaskedView>
    </View>
            <View>
                <Text style={style.subTitle}>
                    Find your Fresh Product .
                </Text>
            </View>

        </SafeAreaView>
    );
};

const style=StyleSheet.create({
  container: {
    marginLeft:18,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle:{
    color:'#8A8585'
    
  },
      gradientText: {
        fontSize: 24,
        fontWeight: 'bold',
      },
});
export default HeadingText;