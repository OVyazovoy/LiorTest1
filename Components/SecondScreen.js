import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "",
            value: "",
            query: "",
            list: [],
        }
    }

    getData() {
        // this.setState({ responseValue: 'мы начали загрузку' });
        let url = 'http://192.168.0.101:3000/key';

        if (this.state.query) {
            url += `?keyName=${this.state.query}`;
        } else {
            return null;
        }

        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    list: res
                });
            })
    }

    render() {
        let navParams = this.props.navigation.state.params;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.titleText}>Second Screen</Text>
                <Text style={styles.area}>
                    последние введеные данные
                    <Text>{`${navParams.key}: ${navParams.value}`}</Text>
                </Text>

                <TextInput
                    style={{ height: 40, width: '50%', borderColor: 'gray' }}
                    onChangeText={(query) => this.setState({ query })}
                    value={this.state.query}
                />
                <Button
                    title="Get value"
                    onPress={() => this.getData()}
                />
                {this.state.list.length > 0
                    ? this.state.list.map((i) => (<Text>{i.value}</Text>))
                    : (<Text>значение которое мы получим</Text>)}
                <Button
                    title="Go Back"
                    onPress={() => this.props.navigation.navigate('First')}
                />

            </View>
        );
    }
}


const styles = {
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 50,
    },
    area: {
        alignItems: 'center',
        borderWidth: 2,
        padding: 5,
        width: '50%',
    }
}