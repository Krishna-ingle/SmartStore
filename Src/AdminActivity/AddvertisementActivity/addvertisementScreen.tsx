import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Alert, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { color } from "@cloudinary/url-gen/qualifiers/background";
import colors from "../../Asset/Colors/colors";
import {ArrowLeft} from "lucide-react-native";
import InputText from "../../UIComponent/inputText";
import Button from "../../UIComponent/button";
import DatePicker from "react-native-date-picker";
export const AdvertisementScreen = ()=>{
  
  const navigation = useNavigation() as any;

  //data input
    const [AdvertisementTitle, setAdvertisementTitle] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [open, setOpen] = useState(false);
    const [validate, setValidate] = useState(new Date());
    const [validateTime, setValidateTime] = useState('');
    
  return( 
    <SafeAreaView style={styles.container}>
      <View
          style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft color={colors.gradientColorone} size={24} strokeWidth={4} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Add Advertisement</Text>
              <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <InputText
          value={AdvertisementTitle}
          onChangeText={setAdvertisementTitle}
          placeholder="Advertisement Title"
          secureTextEntry={false}
          />
        </View>
        <View style={styles.section}>
          <InputText
          value={productName}
          onChangeText={setProductName}
          placeholder="Product Name"
          secureTextEntry={false}
          />
        </View>
        
      <View style={{flexDirection:'row', justifyContent:'space-between', 
        paddingHorizontal:18,marginTop:10}}>
          <View style={[styles.section,{width:'60%'}]}>
          <InputText
          value={brand}
          onChangeText={setBrand}
          placeholder="Brand Name"
          secureTextEntry={false}
          />
        </View>
        <View style={[styles.section,{width:'40%'}]}>
          <InputText
          value={unit}
          onChangeText={setUnit}
          placeholder="Unit"
          secureTextEntry={false}
          />
        </View>
      </View>

      <View style={styles.section}>
          <InputText
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          secureTextEntry={false}
          />
        </View>


      <View style={{flexDirection:'row', justifyContent:'space-between', 
        paddingHorizontal:10,marginTop:10}}>
          <View style={[styles.section,{width:'60%'}]}>
          <InputText
          value={price}
          onChangeText={setPrice}
          placeholder="Price"
          secureTextEntry={false}
          />
        </View>
        <View style={[styles.section,{width:'40%'}]}>
          <InputText
          value={discount}
          onChangeText={setDiscount}
          placeholder="Discount"
          secureTextEntry={false}
          />
        </View>
        </View>
        <Button 
        title={validate ? validate.toDateString() : "Select Validity Date"}
        onPress={() => setOpen(true)}
        />
        <DatePicker
        modal
        open={open}
        date={validate}
        mode="date"
        onConfirm={(d)=>{
          setOpen(false);
          setValidate(d);
        }}
        onCancel={()=> setOpen(false)}
        />
      </ScrollView>
    <Button 
      title="Add Advertisement"
      onPress={() => {
        Alert.alert("Advertisement added successfully!");
      }}
      
    />
    </SafeAreaView>
  )
} 

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.whiteBackground,
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
    color:colors.whiteBackground,
  },
  backIcon:{
    fontSize: 24,
    color: colors.white,
    fontWeight: '700',
  },
  headerTitle:{
    fontSize: 20,
    fontWeight: '700',
    color: colors.gradientColorone,
  },
  scrollView:{
    flex:1,
    width:'100%'

  },
  section:{
    width:'100%',
    alignItems:'center',
    marginTop:10,
  },
});
export default AdvertisementScreen;