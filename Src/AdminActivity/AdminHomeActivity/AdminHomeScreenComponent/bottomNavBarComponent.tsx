import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Database, Clock } from 'lucide-react-native';

// Screen imports
import OrderScreen from '../../OrderActivity/orderScreen';
import BackUpScreen from '../../BackupActivity/BackUpScreen';
import { AdminHomeScreen } from '../AdminHomeActivities';
import colors from '../../../Asset/Colors/colors';
import { CustomShareMenu } from './ThreeDotMenuBtn'; // ✅ Import menu

const Tab = createBottomTabNavigator();

export const BottomNavBarComponent = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let IconComponent;
                    
                    switch (route.name) {
                        case 'Home':
                            IconComponent = Home;
                            break;
                        case 'Order':
                            IconComponent = Clock;
                            break;
                        case 'BackUp':
                            IconComponent = Database;
                            break;
                        default:
                            IconComponent = Home;
                    }
                    return <IconComponent size={size} color={color} />;
                },
                tabBarActiveTintColor: '#22c55e',
                tabBarInactiveTintColor: '#9ca3af',
                headerShown: true, // ✅ Keep this true
                
                // ✅ Add custom header with three-dot menu
                headerStyle: {
                    backgroundColor: colors.white,
                    elevation: 4,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                },
                headerTintColor: colors.gradientColorTow,
                headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 24,
                },
                
                // ✅ Add three-dot menu to header right
                headerLeft: () => <CustomShareMenu navigation={navigation}
                iconColor={colors.gradientColorTow} />,

                tabBarStyle: {
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 5,
                    backgroundColor: colors.white,
                    borderTopWidth: 0,
                    elevation: 5,
                    shadowColor: '#59f46b4e',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                }
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={AdminHomeScreen}
                options={{ headerTitle: 'Dashboard' }}
            />
            <Tab.Screen 
                name="Order"
                component={OrderScreen}
                options={{ headerTitle: 'Orders' }}
            />
            <Tab.Screen 
                name="BackUp" 
                component={BackUpScreen}
                options={{ headerTitle: 'Backup & History' }}
            />
        </Tab.Navigator>
    );
};
