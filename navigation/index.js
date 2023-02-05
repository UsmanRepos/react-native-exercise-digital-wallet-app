import { View, Image } from 'react-native';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs'

import { isIphoneX } from 'react-native-iphone-x-helper'
import { Home, SignUp, Scan } from '../screens'
import { COLORS, icons } from '../constants'
import { TabBarButton } from '../components'

const stack = createNativeStackNavigator()
const tab = createBottomTabNavigator()

const TabBar = ({ props }) => {
    if (isIphoneX) {
        <View>
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    left: 0,
                    height: 30,
                    backgroundColor: COLORS.white
                }}
            >
            </View>
            <BottomTabBar  {...props} />
        </View>
    } else {
        return (
            <BottomTabBar  {...props} />
        )
    }
}
const Tabs = () => (
    <tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                position: "absolute",
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: "transparent",
                elevation: 0
            }
        }}
    >
        <tab.Screen
            name='home'
            component={Home}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.more}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? COLORS.white : COLORS.secondary
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarButton  {...props} />
                ),
                tabBar: (props) => (
                    <TabBar props={props} />
                )

            }}
        />
        <tab.Screen
            name='scan'
            component={Scan}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.scan}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? COLORS.white : COLORS.secondary
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarButton  {...props} />
                )
            }}
        />
        <tab.Screen
            name='user'
            component={Home}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icons.user}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? COLORS.white : COLORS.secondary
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarButton  {...props} />
                )
            }}
        />

    </tab.Navigator>
);

const Stack = () => (
    <stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        initialRouteName='signUp'
    >
        <stack.Screen
            name='signUp'
            component={SignUp}
        />
        <stack.Screen
            name='home'
            component={Tabs}
        />

    </stack.Navigator>
);

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
};

const Index = () => {
    return (
        <NavigationContainer theme={theme}>
            <Stack />
        </NavigationContainer>
    );
};

export default Index;
