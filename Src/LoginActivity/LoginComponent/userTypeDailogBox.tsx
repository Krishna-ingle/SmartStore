
import React from "react";
import { SafeAreaView ,View,Text,Modal,StyleSheet, TouchableOpacity, Button} from "react-native";
import LinearGradient from "react-native-linear-gradient";
type prop={
    visible?:boolean;
    onClose: () => void;
}
const UserTypeDailogBox: React.FC<prop> = ({visible,onClose})=>{
    return(
    <SafeAreaView>
        <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
        style ={style.Modelcontainer}>
        <View style={style.MainContainer}>
            
            <View style={style.dailogCardView}>
                {/* <Button  title="cancel" onPress={onClose}/> */}
                <TouchableOpacity
                style={style.cancelBtn}
                onPress={onClose}>
                    <Text style={{
                    marginTop:5,
                    marginRight:20,
                    fontSize:24,     
                    fontWeight:'300',
                    color:'rgb(93, 93, 93)',}}>x</Text>
                </TouchableOpacity>
                <Text style={{textAlign:'center',
                marginTop:20,fontSize:16,
                color:'rgb(93, 93, 93)'
                }}>Select User Type</Text>

                <View style={style.UserTypeView}>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={['#49C749', '#008000']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={style.btnUser}>
                                <Text style={style.btnText}>Coustomer</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={['#49C749', '#008000']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={style.btnUser}>
                                <Text style={style.btnText}>Admin</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </Modal>
            
    </SafeAreaView>
    );
};

export default UserTypeDailogBox;
const style = StyleSheet.create({
    Modelcontainer:{
        
    },
    MainContainer:{
         flex:1,
         justifyContent:'center',
         alignItems:'center',
        backgroundColor: 'rgba(56, 55, 55, 0.13)',
    },
    dailogCardView:{
        width:"80%",
        height:250,
        backgroundColor:'rgb(255, 254, 254)',
        borderRadius:10,
    },
    UserTypeView:{
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-around",
        marginTop:70,
        
    },
    btnUser:{  
        padding:8,
        borderRadius:5
    },
    btnText:{
        color:'#ffffff',
        fontWeight:'500',
        fontSize:16
    },
    cancelBtn:{
        alignItems:'flex-end'

    }
});
