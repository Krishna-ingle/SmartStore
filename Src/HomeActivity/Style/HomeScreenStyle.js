import { StyleSheet } from "react-native";

const stylesHomeScreen = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  SearchBarandCartContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addvertisementSection: {
    marginTop: 20,
  },


  // for dot animation 

  pagination: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },


  Categoriestext:{
    fontSize:16,
    color:'#555B55',
    marginLeft:10,
  }

});
export default stylesHomeScreen;