import * as React from 'react';
import { View, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
import { SnigletText } from '../components/StyledText';
import { AuthContext } from '../authContext';

export default class WelcomeScreen extends React.Component {
    static contextType = AuthContext;

    petChoices = [
        {
            name: 'Giraffe',
            image: require('../assets/images/GIRAFFEE_PIC.png')
        },
        {
            name: 'Crocodile',
            image: require('../assets/images/CROC_PIC.png')
        },
        {
            name: 'Lion',
            image: require('../assets/images/LION_PIC.png')
        },
        {
            name: 'Hippo',
            image: require('../assets/images/HIPPO_PIC.png')
        },
        {
            name: 'Turtle',
            image: require('../assets/images/TURTLE_PIC.png')
        },
        {
            name: 'Bird',
            image: require('../assets/images/BIRD_PIC.png')
        }
    ];

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.headerContainer}>
                        <SnigletText style={styles.welcomeText}>Welcome, Sammy!</SnigletText>
                        <SnigletText style={styles.welcomeText}>What's your favorite animal?</SnigletText>
                    </View>
                    <View style={{flex: 1}}>
                        {
                            this.petChoices.map(choice => (
                                <TouchableNativeFeedback onPress={() => this.context.selectPet(choice.name)} key={choice.name}>
                                    <Card containerStyle={styles.card}>
                                        <View>
                                            <Image source={choice.image} style={styles.image} />
                                            <SnigletText style={styles.cardText}>{choice.name}</SnigletText>
                                        </View>
                                    </Card>
                                </TouchableNativeFeedback>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF0CD',
    },
    contentContainer: {
        paddingHorizontal: 32,
        paddingVertical: 32
    },
    headerContainer: {
        marginBottom: 16
    },
    welcomeText: {
        color: '#1A4876',
        fontSize: 24,
        textAlign: 'center'
    },
    card: {
        borderColor: '#1A4876',
        borderWidth: 2,
        borderRadius: 16
    },
    cardText: {
        color: '#1A4876',
        textAlign: 'center',
        fontSize: 20
    },
    image: {
        height: 128,
        width: 128,
        alignSelf: 'center',
        marginBottom: 16
    }
});
