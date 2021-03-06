import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import SignInScreen from './screens/SignInScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { AuthContext } from './authContext'

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  const [state, dispatch] = React.useReducer( (prevState, action) => {
    if(action.type === 'RESTORE_TOKEN'){
      return { 
        ...prevState,
        userToken:action.token,
        isLoading:false
      }
    } 
    else if (action.type === 'SIGN_IN'){
      return { 
        ...prevState,
        isSignout: false,
        userToken: action.token,
      }
    }
    else if(action.type === 'SIGN_OUT'){
      return { 
        ...prevState,
        isSignout: true,
        userToken: null,
      }
    }
    else if (action.type === 'SELECT_PET') {
      return {
        ...prevState,
        pet: action.pet
      }
    }},
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
    // Load any resources or data that we need prior to rendering the app
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'sniglet': require('./assets/fonts/Sniglet-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
    loadResourcesAndDataAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        //dummy token used rather than token from some server :(
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      selectPet: (pet) => {
        dispatch({ type: 'SELECT_PET', pet: pet })
      }
    }),
    []
  );

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <AuthContext.Provider value={ authContext }>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
              <Stack.Navigator>
                { state.userToken == null ? (
                  <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{
                      title: 'Sign in',
                      headerStyle: styles.headerStyle,
                      headerTitleContainerStyle: styles.headerTitleContainerStyle,
                      headerTitleStyle: styles.headerTitleStyle,
                      // When logging out, a pop animation feels intuitive
                      // You can remove this if you want the default 'push' animation
                      animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                    }}
                  />
                ) : state.pet == null ? (
                  <Stack.Screen
                    name="Root" 
                    component={WelcomeScreen} 
                    options={{
                      title: 'Welcome',
                      headerStyle: styles.headerStyle,
                      headerTitleContainerStyle: styles.headerTitleContainerStyle,
                      headerTitleStyle: styles.headerTitleStyle,
                    }} 
                  />
                ) : (
                  <Stack.Screen 
                    name="Root" 
                    component={BottomTabNavigator} 
                    options={{
                      title: 'Sign in',
                      headerStyle: styles.headerStyle,
                      headerTitleContainerStyle: styles.headerTitleContainerStyle,
                      headerTitleStyle: styles.headerTitleStyle,
                    }} 
                  />
                )}
              </Stack.Navigator>
          </NavigationContainer>
        </View>
      </AuthContext.Provider>
    );
  }
}
export { AuthContext }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF0CD',
  },
  headerStyle: {
    backgroundColor: '#FDF0CD',
    shadowOpacity: 0,
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#1A4876'
  },
  headerTitleStyle: {
    color: '#1A4876',
    fontFamily: 'sniglet'
  }
});
