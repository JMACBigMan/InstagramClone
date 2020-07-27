import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Button, Avatar, Icon, Thumbnail } from 'native-base'

import { withFirebaseHOC } from '../utils'
import Gallery from '../components/Gallery'

class _Profile extends Component {
    state = {
        images: [],
        userDetails: {}
    }

    componentDidMount() {
        this.fetchUserDetails()
        this.fetchPosts()
    }

    fetchPosts = async () => {
        try {
            const posts = await this.props.firebase.getUserPosts()
            let images = posts.map(item => {
                return item.postPhoto
            })

            this.setState({ images })
            // console.log(this.state.images)
        } catch (error) {
            console.log(error)
        }
    }

    fetchUserDetails = async () => {
        try {
            const userDetails = await this.props.firebase.getUserDetails()
            // console.log('USER DETAILS ===========>>', userDetails)
            this.setState({ userDetails })
        } catch (error) {
            console.log(error)
        }
    }

    handleSignout = async () => {
        try {
            await this.props.firebase.signOut()
            this.props.navigation.navigate('Auth')
        } catch (error) {
            console.log(error)
        }
    }

    handleEditAvatarNavigation = () => {
        this.props.navigation.navigate('EditAvatar')
    }

    render() {
        const { images, userDetails } = this.state
        return (
            <View style={styles.root}>
                <View style={[styles.header, styles.bordered]}>
                    <View style={{ height: 100, flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
                        {
                            this.state.userDetails && this.state.userDetails.avatar &&  
                            <Thumbnail
                                source={
                                    { uri: this.state.userDetails.avatar }}
                            />
                        }
                        <View style={styles.add}>
                            <TouchableOpacity onPress={this.handleEditAvatarNavigation}>
                                <Icon name='eye' width={20} height={20} fill='#111' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.text}>
                        {userDetails ? userDetails.name : "N/A"}
                    </Text>
                </View>
                <View style={[styles.userInfo, styles.bordered]}>
                    <View style={styles.section}>
                        <Text category='s1' style={styles.space}>
                            {images.length}
                        </Text>
                        <Text appearance='hint' category='s2'>
                            Posts
            </Text>
                    </View>
                    <View style={styles.section}>
                        <Text category='s1' style={styles.space}>
                            0
            </Text>
                        <Text appearance='hint' category='s2'>
                            Followers
            </Text>
                    </View>
                    <View style={styles.section}>
                        <Text category='s1' style={styles.space}>
                            0
            </Text>
                        <Text appearance='hint' category='s2'>
                            Following
            </Text>
                    </View>
                </View>

                <TouchableOpacity style={{ marginTop: 20, width: '90%', height: 50, backgroundColor: '#3e3e3e', borderRadius: 5, alignSelf: 'center' }} onPress={this.handleSignout}>
                    <Text style={{ textAlign: 'center', justifyContent: 'center', color: '#fff', height: 50, lineHeight: 50, alignItems: 'center' }}>
                        LOGOUT
                    </Text>
                </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 20, width: '90%', height: 50, backgroundColor: '#3e3e3e', borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={{ textAlign: 'center', justifyContent: 'center', color: '#fff', height: 50, lineHeight: 50, alignItems: 'center' }}>
                            MESSAGE
                        </Text>
                    </TouchableOpacity>

                <Gallery items={images} />
            </View>
        )
    }
}

export default withFirebaseHOC(_Profile)

const styles = {
    root: {
        backgroundColor: '#e4e4e4',
        marginTop: 10
    },
    header: {
        alignItems: 'center',
        paddingTop: 25,
        paddingBottom: 17
    },
    userInfo: {
        flexDirection: 'row',
        paddingVertical: 18,
    },
    bordered: {
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    section: {
        flex: 1,
        alignItems: 'center',
    },
    space: {
        marginBottom: 3,
        color: '#222'
    },
    separator: {
        backgroundColor: '#e4e4e4',
        alignSelf: 'center',
        flexDirection: 'row',
        flex: 0,
        width: 1,
        height: 42
    },
    buttons: {
        flexDirection: 'row',
        paddingVertical: 8
    },
    button: {
        flex: 1,
        alignSelf: 'center'
    },
    text: {
        color: '#222'
    },
    add: {
        position: 'absolute',
        bottom: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
}