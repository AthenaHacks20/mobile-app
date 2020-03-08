import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default class TalkButton extends React.Component {
    constructor(props) {
        super(props)
    }

    action = () => {
        console.log('ey');
    }

    render() {
        return (
            <Button 
                onPress={() => console.log('hey')}
                icon={<Ionicons name="ios-chatbubbles" size={32} style={styles.buttonIcon} />}
                buttonStyle={styles.button}
                raised
            />
        )
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        backgroundColor: "#FF6C78",
        borderColor: '#1A4876', 
        borderWidth: 2,
        height: 72,
        width: 72
    },
    buttonIcon: {
        color: 'white',
    }
})
