import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "",
            value: "",
            status: "",
        }
    }

    saveKey() {
        this.setState({
            status: "сохраняем"
        });

        fetch('http://192.168.0.101:3000/key', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: this.state.key,
                value: this.state.value,
            })
        }).then(() => {
            this.setState({
                status: "сохранили"
            });
        });

        setTimeout(() => {
            this.setState({
                status: ""
            });
        }, 2000)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{this.state.status}</Text>
                <Text style={styles.titleText}>First Screen</Text>

                <Text>Key</Text>
                <TextInput
                    style={{ height: 40, width: '50%', borderColor: 'gray' }}
                    onChangeText={(key) => this.setState({ key })}
                    value={this.state.key}
                />

                <Text>Value</Text>
                <TextInput
                    style={{ height: 40, width: '50%', borderColor: 'gray' }}
                    onChangeText={(value) => this.setState({ value })}
                    value={this.state.value}
                />

                <Button
                    style={styles.button}
                    title="Add"
                    onPress={() => this.saveKey()}
                />

                <Button
                    style={styles.button}
                    title="Go to Next"
                    onPress={() => this.props.navigation.navigate('Second',
                        { key: this.state.key, value: this.state.value }
                    )}
                />
            </View>
        );
    }
}


const styles = {
    buttonWrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    button: {
        width: "47%"
    },
    baseText: {
        fontFamily: 'Cochin',
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 50,
    },

}
