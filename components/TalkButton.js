import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

export default class TalkButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            turn: 0
        };
    }

    recordingOptions = null;
    

    action = async () => {
        // const permission = await Audio.requestPermissionsAsync();
        // if (!permission) return;

        const chats = [
            'Hi, how is your day going so far?',
            `I hope you're doing fine`,
            `Come play with me!`,
            'Please pet me more!'
        ];
        const r = Math.floor(Math.random() * (chats.length - 0 + 1) + 0);

        await this.speak(chats[r]);
        // await this.record(5000);
        // await this.analyzeRecording();

        // const info = await FileSystem.getInfoAsync(this.recording.getURI());
        // console.warn(`FILE INFO: ${JSON.stringify(info)}`);
    }

    speak = async (message) => {
        return new Promise((resolve, reject) => {
            Speech.speak(message, {
                onDone: () => resolve()
            });
        });
    }

    record = async (delay) => {
        if (!this.recordingOptions) {
            this.recordingOptions = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
            this.recordingOptions.android.extension = '.wav';
            this.recordingOptions.android.sampleRate = 16000;
            this.recordingOptions.android.bitRate = 16;
        }

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        });

        const recording = new Audio.Recording();
        try {
            await recording.prepareToRecordAsync(this.recordingOptions);
            await recording.startAsync();
        } catch (err) {
            console.error(err);
            try {
                await recording.stopAndUnloadAsync();
            } catch (err) {
                console.error(err);
            }
        }

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, delay);
        });

        try {
            await recording.stopAndUnloadAsync();
        } catch (err) {
            console.error(err);
        }
        this.recording = recording;
        return;
    }

    analyzeRecording = async () => {
        try {
            let res = await fetch('https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer',
                    'Ocp-Apim-Subscription-Key': 'ae8db725524f40c6ae400d089029b709',
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            });
            const token = await res.text();

            const info = await FileSystem.getInfoAsync(this.recording.getURI());
            const uri = info.uri;
            const data = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
            
            res = await fetch('https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Ocp-Apim-Subscription-Key': 'ae8db725524f40c6ae400d089029b709',
                    'Content-type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
                    'Accept': 'application/json;text/xml'
                },
                body: 'data:audio/wav;base64,' + data
            });
            res = await res.text();
            console.warn(res);
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        return (
            <Button 
                onPress={() => this.action()}
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
