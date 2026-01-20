// // App.tsx
// import React from "react";
// import { Provider } from "react-redux";
// import {store} from "./Redux/Store"
// import RootNavigator from "./Navigation/RootNavigation";
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// const App = () => {
//   return (
//     <Provider store={store}>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <RootNavigator />
//       </GestureHandlerRootView>
//     </Provider>
//   );
// };

// export default App;
// App.tsx
// App.tsx - FIXED VERSION
import React from "react";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import RootNavigator from "./Navigation/RootNavigation";

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;

