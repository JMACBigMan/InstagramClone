import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Alert } from 'react-native'
import { Button, Text } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import { withFirebaseHOC } from '../utils'

class EditAvatar extends Component {
    state = {
        avatarImage: null
    }

    selectImage = () => {
        const options = {
            noData: true
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            } else {
                const source = { uri: response.uri }
                // console.log(source)
                this.setState({
                    avatarImage: response.uri
                })
            }
        })
    }

    onSubmit = async () => {
        try {
            const avatarImage = this.state.avatarImage
            if(avatarImage) {
                this.props.firebase.uploadAvatar(avatarImage)
    
                this.setState({
                    avatarImage: null
                })
            }else {
                Alert.alert("Please upload image first!");
            }
        } catch (e) {
            console.error(e)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text category='h2'>Edit Avatar</Text>
                <View>
                    {this.state.avatarImage ? (
                        <Image
                            source={{uri: this.state.avatarImage}}
                            style={{ width: 300, height: 300 }}
                        />
                    ) : (
                        <TouchableOpacity style={{ marginTop: 20, height: 50, backgroundColor: '#3e3e3e', borderRadius: 30, width: '30%', alignSelf: 'center' }} onPress={this.selectImage}>
                            <Text style={{ textAlign: 'center', justifyContent: 'center', color: '#fff', height: 50, lineHeight: 50, alignItems: 'center' }}>
                                Add an image
                            </Text>
                        </TouchableOpacity>
                        )}
                </View>
                        <TouchableOpacity style={{ marginTop: 20, height: 50, backgroundColor: '#3e3e3e', borderRadius: 30, width: '30%', alignSelf: 'center' }} onPress={this.onSubmit}>
                            <Text style={{ textAlign: 'center', justifyContent: 'center', color: '#fff', height: 50, lineHeight: 50, alignItems: 'center' }}>
                            Add profile pic
                            </Text>
                        </TouchableOpacity>
            </View>
        )
    }
}

export default withFirebaseHOC(EditAvatar)