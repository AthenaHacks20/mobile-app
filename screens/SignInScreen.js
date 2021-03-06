import * as React from 'react';
import { Text, Platform, StyleSheet, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SnigletText } from '../components/StyledText';
import { AuthContext } from '../authContext';
import Logo from '../assets/images/header.png';

export default function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signIn } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
            <SnigletText style={styles.subheaderStyle}>Welcome to</SnigletText>
            <Image source={Logo} style={styles.logo} />
            <Input
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                containerStyle={styles.inputContainer}
                inputContainerStyle={{borderBottomWidth:0}}
                inputStyle={styles.textStyle}
            />
            <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                containerStyle={styles.inputContainer}
                inputContainerStyle={{borderBottomWidth:0}}
                inputStyle={styles.textStyle}
            />
            <Button 
                buttonStyle={styles.buttonContainer} 
                raised title="LOGIN" 
                onPress={() => signIn({ username, password })} 
                titleStyle={styles.textStyle}
            />
        </View>
      </ScrollView>
    </View>
  );
}

SignInScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'sniglet'
  },
  subheaderStyle: {
    fontSize: 24
  },
  container: {
    flex: 1,
    backgroundColor: '#FDF0CD',
  },
  inputContainer: {
    borderColor: '#1A4876',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: "center"
  },
  buttonContainer: { 
    backgroundColor: "#FF6C78",
    borderColor: '#1A4876', 
    borderWidth: 2,
    borderRadius: 24,
    paddingTop: 12,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 12
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: "center"
  },
  logo: {
    height: 125,
    resizeMode: 'contain',
    marginBottom: 48
  }
});
