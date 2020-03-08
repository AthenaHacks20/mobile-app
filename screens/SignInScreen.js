import * as React from 'react';
import { Text, Platform, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import { AuthContext } from '../authContext';


export default function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signIn } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
            <Text>Welcome to</Text>
            <Input
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                containerStyle={styles.inputContainer}
                inputContainerStyle={{borderBottomWidth:0}}
            />
            <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                containerStyle={styles.inputContainer}
                inputContainerStyle={{borderBottomWidth:0}}
            />
            <Button 
                buttonStyle= {styles.buttonContainer} 
                raised title="LOGIN" 
                onPress={() => signIn({ username, password })} 
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
  container: {
    flex: 1,
    backgroundColor: '#FDF0CD',
  },
  inputContainer: {
    borderColor: '#1A4876',
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 20,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: "center"
  },
  buttonContainer: { 
    backgroundColor: "#FF6C78",
    borderRadius: 5,
    borderColor: '#1A4876', 
    borderWidth: 2,
    borderRadius: 25,
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: "center"
  },

});
