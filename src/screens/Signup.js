import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { Button, Input, Icon } from 'native-base'
import { withFirebaseHOC } from '../utils'

class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    onChangeName = name => {
        this.setState({ name })
    }
    onChangeEmail = email => {
        this.setState({ email })
    }
    onChangePassword = password => {
        this.setState({ password })
    }

    handleOnSignup = async () => {
        const { name, email, password } = this.state

        try {
            const response = await this.props.firebase.signupWithEmail(
                email,
                password
            )

            if (response.user.uid) {
                const { uid } = response.user
                const userData = { email, name, uid }
                await this.props.firebase.createNewUser(userData)
                this.props.navigation.navigate('App')
            }
        } catch (error) {
            console.warn(error)
            alert('Could not signup.')
        }
    }

    handleLogin = () => {
        this.props.navigation.navigate('Login')
    }
    render() {
        const { name, email, password } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 30 }}>
                <View style={{ alignItems: 'center', marginTop: 60 }}>
                    <Icon
                        name='person-add-outline'
                        width={200}
                        height={200}
                        fill='#333'
                    />
                </View>
                <View style={{ marginTop: 50 }}>
                    <TextInput
                        style={{ marginTop: 10, fontSize: 16, height: 50, borderWidth: 2, borderColor: "#3e3e3e", borderRadius: 5 }}
                        value={name}
                        onChangeText={this.onChangeName}
                        placeholder='Name'
                    />
                </View>
                <View style={{ marginTop: 50 }}>
                    <TextInput
                        style={{ marginTop: 10, fontSize: 16, height: 50, borderWidth: 2, borderColor: "#3e3e3e", borderRadius: 5 }}
                        value={email}
                        onChangeText={this.onChangeEmail}
                        placeholder='Email'
                    />
                </View>
                <View style={{ marginTop: 50 }}>
                    <TextInput
                        style={{ marginTop: 10, fontSize: 16, height: 50, borderWidth: 2, borderColor: "#3e3e3e", borderRadius: 5 }}
                        value={password}
                        onChangeText={this.onChangePassword}
                        placeholder='Password'
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={{ marginTop: 20, height: 50, backgroundColor: '#3e3e3e', borderRadius: 5 }} onPress={this.handleOnSignup}>
                    <Text style={{ textAlign: 'center', justifyContent: 'center', color: '#fff', height: 50, lineHeight: 50, alignItems: 'center' }}>
                        Signup
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}>
                    <Text style={{ textAlign: 'center', fontSize: 14, color: '#abb4bd' }}>
                        Already have an account?{' '}
                    </Text>
                    <TouchableOpacity
                        onPress={this.handleLogin}
                        style={{
                            paddingHorizontal: 1
                        }}>
                            <Text>
                                Login
                            </Text>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default withFirebaseHOC(Signup)