import {NavigationProp} from '@react-navigation/native';

export const NavigationRoutes = {
  HomeTabs: {
    DashboardScreen: 'DashboardScreen',
    CartScreen: 'CartScreen',
  },
};

type HomeStackParamList = {
  [K in keyof typeof NavigationRoutes.HomeTabs]: undefined;
};

export type RootStackParamList = HomeStackParamList;
export type StackNavigationTypes = NavigationProp<RootStackParamList>;
