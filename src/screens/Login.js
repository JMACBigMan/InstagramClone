import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { Button, Input, Icon } from 'native-base'
import { withFirebaseHOC } from '../utils'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    onChangeEmail = email => {
        this.setState({ email })
    }

    onChangePassword = password => {
        this.setState({ password })
    }

    handleOnLogin = async () => {
        const { email, password } = this.state
        try {
            const response = await this.props.firebase.loginWithEmail(email, password)

            if (response.user) {
                this.props.navigation.navigate('App')
            }
        } catch (error) {
            console.warn(error)
            alert('Could not login.')
        }
    }

    handleSignup = () => {
        this.props.navigation.navigate('Signup')
    }
    render() {
        const { email, password } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 30 }}>
                <View style={{ alignItems: 'center', marginTop: 60 }}>
                    <Icon name='log-in' width={400} height={400} fill='#333' />
                </View>
                <View style={{ marginTop: 50 }}>
                    <TextInput
                        style={{ marginTop: 10, fontSize: 16, height: 50, borderWidth: 2, borderColor: "#3e3e3e", borderRadius: 5 }}
                        value={email}
                        onChangeText={this.onChangeEmail}
                        placeholder='Email'
                        autoCapitalize='none'
                        autoCompleteType='email'
                        keyboardType='email-address'
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        style={{ marginTop: 10, fontSize: 16, height: 50, borderWidth: 2, borderColor: "#3e3e3e", borderRadius: 5 }}
                        placeholder='Password'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={this.onChangePassword}
                    />
                </View>
                    <TouchableOpacity style={{ marginTop: 20, height: 50, backgroundColor: '#3e3e3e', borderRadius: 5 }} onPress={this.handleOnLogin}>
                        <Text style={{ textAlign: 'center', justifyContent: 'center', color: '#fff', height: 50, lineHeight: 50, alignItems: 'center' }}>
                            Login
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
                        Don't have an account?{' '}
                    </Text>
                    <TouchableOpacity
                        onPress={this.handleSignup}
                        style={{
                            paddingHorizontal: 1
                        }}>
                            <Text>
                        Sign up

                            </Text>
          </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default withFirebaseHOC(Login)
