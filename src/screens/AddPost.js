import React, { Component } from 'react'
import { Image, View, TouchableOpacity, TextInput } from 'react-native'
import { Text, Button, Input } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import { withFirebaseHOC } from '../utils'

class AddPost extends Component {
    state = { image: null, title: '', description: '' }

    onChangeTitle = title => {
        this.setState({ title })
    }
    onChangeDescription = description => {
        this.setState({ description })
    }

    onSubmit = async () => {
        try {
            const post = {
                photo: this.state.image,
                title: this.state.title,
                description: this.state.description
            }
            this.props.firebase.uploadPost(post)

            this.setState({
                image: null,
                title: '',
                description: ''
            })
        } catch (e) {
            console.error(e)
        }
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
                // const source = { uri: response.uri }
                // console.log(source)
                this.setState({
                    image: response.uri
                })
            }
        })
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 60 }}>
                <View>
                    {this.state.image ? (
                        <Image
                            source={{uri: this.state.image}}
                            style={{ width: '100%', height: 300 }}
                        />
                    ) : (
                        <TouchableOpacity style={{ marginTop: 20, height: 50, backgroundColor: '#3e3e3e', borderRadius: 30, width: '30%', alignSelf: 'center' }} onPress={this.selectImage}>
                            <Text style={{ textAlign: 'center', justifyContent: 'center', color: '#fff', height: 50, lineHeight: 50, alignItems: 'center' }}>
                                Add an image
                            </Text>
                        </TouchableOpacity>

                        )}
                </View>
                <View style={{ marginTop: 80, alignItems: 'center' }}>
                    <Text category='h4'>Post Details</Text>
                    <TextInput
                        style={{ marginTop: 10, width: '90%', fontSize: 16, height: 50, borderWidth: 2, borderColor: "#3e3e3e", borderRadius: 5 }}
                        placeholder='Enter title of the post'
                        value={this.state.title}
                        onChangeText={title => this.onChangeTitle(title)}
                    />
                    <TextInput
                        style={{ marginTop: 10, width: '90%', fontSize: 16, height: 50, borderWidth: 2, borderColor: "#3e3e3e", borderRadius: 5 }}
                        placeholder='Enter description'
                        value={this.state.description}
                        onChangeText={description => this.onChangeDescription(description)}
                    />
                  <TouchableOpacity style={{ marginTop: 20, width: '90%', height: 50, backgroundColor: '#3e3e3e', borderRadius: 5 }} onPress={this.onSubmit}>
                        <Text style={{ textAlign: 'center', justifyContent: 'center', color: '#fff', height: 50, lineHeight: 50, alignItems: 'center' }}>
                            Add post
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default withFirebaseHOC(AddPost)