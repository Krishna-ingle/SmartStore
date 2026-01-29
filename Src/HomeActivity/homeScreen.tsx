import React, { useEffect, useRef, useState } from "react";
import {
    View,
    SafeAreaView,
    Text,
    FlatList
} from "react-native"
import stylesHomeScreen from "./Style/HomeScreenStyle";
// import ProfileNotificatonComp from "./ComponentofHomeScreen/profileNotificationComponent";
import HeadingText from "./ComponentofHomeScreen/headingTextCompo";
import SearchBarCom from "./ComponentofHomeScreen/SearchBarcomponent";
import CartButton from "./ComponentofHomeScreen/CartBox&Icon";
import AddvertisementcardView from "./ComponentofHomeScreen/addvertisementCardViews";
import offerData from "../Asset/Icon/OfferData"; 
import { CategoriesCardview } from "./ComponentofHomeScreen/categoriesCardview";
import categoriesData from "../Asset/Icon/CategoriesData";
import { ProductCardView } from "./ComponentofHomeScreen/productCardView";
const HomeScreen = ()=>{

    const flatListRef = useRef<FlatList>(null);
    const [currentIndex , setCurrentIndex] = useState(0);
    // Auto-Scroll Logic
    useEffect(()=>{
      const totalItems = offerData.length;

      const interval = setInterval(()=>{
        let nextIndex = currentIndex+1;
        if(nextIndex>=totalItems) nextIndex=0;

        flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
        });

        setCurrentIndex(nextIndex);
      },3000); 
      
      return() => clearInterval(interval);
    },[currentIndex]);


    return(
        <SafeAreaView style ={{backgroundColor:'#ffffff', height:'100%'}}>
            {/* profile and notification compo */}
            <View style={{height:40}}>
                {/* <ProfileNotificatonComp/> */}
            </View>
            {/* Heading component */}
            <HeadingText/>

            {/* search and cart compo */}
            <View style={stylesHomeScreen.SearchBarandCartContainer}>
            <SearchBarCom/>
            <CartButton/>
            </View>

            {/* addvertisement Cardview */}
           <View style={stylesHomeScreen.addvertisementSection}>
            <FlatList
            ref={flatListRef}
            data={offerData}
            renderItem={({item})=>(
                <AddvertisementcardView
                offerText={item.offerText}
                discount={item.discount}
                index ={item.id}
                />
            )}

            keyExtractor={(item)=>item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            />

            {/* for dotet animation  */}

             <View style={stylesHomeScreen.pagination}>
        {offerData.map((_, index) => (
          <View
            key={index}
            style={[
              stylesHomeScreen.dot,
              index === currentIndex ? stylesHomeScreen.activeDot : stylesHomeScreen.inactiveDot,
            ]}
          />
        ))}
      </View>
           </View> 


           {/* categories Icon Or liast */}
           <View>
            <Text style={stylesHomeScreen.Categoriestext}>Categories</Text>
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categoriesData}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>(
                <CategoriesCardview
                name={item.name}
                color={item.color}
                iconComponent={item.icon}
                />
            )}
            /> 
           </View>
            

            {/* products cardview section */}
            <View>
              <ProductCardView/>
            </View>
        </SafeAreaView>
    );
   
};
export default HomeScreen;
