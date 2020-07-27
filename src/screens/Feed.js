import React, { Component } from 'react'
import { View, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import { Text, Thumbnail } from 'native-base'
import { withFirebaseHOC } from '../utils'
import PinchableBox from '../components/PinchableBox'

class _Feed extends Component {
    state = { DATA: null, isRefreshing: false }

    componentDidMount() {
        this.fetchPosts()
    }

    fetchPosts = async () => {
        try {
            const posts = await this.props.firebase.getPosts()
            // console.log(posts)
            this.setState({ DATA: posts, isRefreshing: false })
        } catch (error) {
            console.warn(error)
        }
    }

    onRefresh = () => {
        this.setState({ isRefreshing: true })
        this.fetchPosts()
    }
    renderItem = ({ item }) => {
        console.log(item.postPhoto, "ITEM")
        return <View style={styles.card}>
            {
                item.postPhoto ?
                <PinchableBox imageUri={item.postPhoto} />
                :
                <PinchableBox imageUri={"https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
            }
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>
                    {item.postTitle}
                </Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Profile')}>
                    <Thumbnail
                        source={{
                            uri:
                                'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.cardContent}>
                <Text>{item.postDescription}</Text>
            </View>
        </View>
    }

    render() {
        console.warn(this.state.DATA, "DATA")

        if (this.state.DATA) {
            console.warn("TEUE")
            return (
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.state.DATA}
                        renderItem={this.renderItem}
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this.onRefresh()}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            )
        } else
            return (
                <View
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            )
    }
}

export default withFirebaseHOC(_Feed)

const styles = {
    container: {
        flex: 1,
    },
    card: {
        marginBottom: 25,
        width: '90%',
        height: 400,
    },
    cardHeader: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardTitle: {
        color: '#000'
    },
    cardAvatar: {
        marginRight: 16
    },
    cardContent: {
        padding: 10,
        borderWidth: 0.25,
        borderColor: '#eee'
    }
}