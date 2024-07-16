import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Box from '@/src/components/reusables/Box';
import DashBoardScreen from '@/src/screens/Tabs/DashBoardScreen';
import MarketDataScreen from '@/src/screens/Tabs/MarketDataScreen';
import ProfileScreen from '@/src/screens/Tabs/ProfileScreen';
import {useTheme} from '@/src/hooks/useTheme.hook';
import {scale} from '@/src/constants/scaler.constants';
import ThemedButton from '../components/reusables/ThemedButton';
import {useSafeNavigation} from '../hooks/useSafeNavigation';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';

const MainTab = createBottomTabNavigator();

const routesConfig = [
  {
    name: 'DashboardScreen',
    component: DashBoardScreen,
    icon: 'home',
    activeIcon: 'home-sharp',
  },
  {
    name: 'MarketDataScreen',
    component: MarketDataScreen,
    icon: 'stats-chart',
    activeIcon: 'stats-chart-sharp',
  },
  {
    name: 'ProfileScreen',
    component: ProfileScreen,
    icon: 'person',
    activeIcon: 'person-sharp',
  },
];

export default function TabStack() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useSafeNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const theme = useTheme();
  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        title: '',
        tabBarStyle: {
          backgroundColor: theme.primary,
          height: isKeyboardVisible ? 0 : scale(70),
        },
        tabBarActiveTintColor: theme.text,
      }}>
      {routesConfig.map((tab, index) => (
        <MainTab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({focused}) => {
              const animatedStyles = useAnimatedStyle(() => {
                return {
                  transform: [
                    {
                      scale: withSpring(focused ? 1.2 : 1),
                    },
                  ],
                };
              });
              return (
                <ThemedButton
                  onPress={() => navigation.navigate(tab.name)}
                  type="text">
                  <Box
                    borderWidth={1}
                    borderColor={focused ? theme.text : theme.background}
                    radius={40}
                    pa={10}
                    height={45}
                    width={45}
                    align="center"
                    justify="center">
                    <Animated.View style={animatedStyles}>
                      <Icon
                        name={focused ? tab.activeIcon : tab.icon}
                        size={20}
                        color={focused ? theme.text : theme.background}
                      />
                    </Animated.View>
                  </Box>
                </ThemedButton>
              );
            },
          }}
        />
      ))}
    </MainTab.Navigator>
  );
}
