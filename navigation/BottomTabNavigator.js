import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator 
      initialRouteName={INITIAL_ROUTE_NAME} 
      tabBarOptions={{
        tabStyle: styles.tab,
        labelStyle: styles.tabLabel,
        style: styles.tabContainer,
        activeTintColor: '#1A4876'
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'My Pet',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="paw" style={styles.tabIcon} />,
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'My Friends',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user-friends" style={styles.tabIcon} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Explore';
    case 'Links':
      return 'Links to learn more';
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#FDF0CD',
    height: 84
  },
  tab: {
    paddingBottom: 8,
    borderColor: '#1A4876',
    borderTopWidth: 2
  },
  tabLabel: {
    fontFamily: 'sniglet',
    fontSize: 16
  },
  tabIcon: {
    color: '#FC6C85',
  }
});
