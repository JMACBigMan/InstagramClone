import firebase from 'react-native-firebase'
import uuid from 'uuid'
import '@react-native-firebase/storage';

const Firebase = {
    // auth
    loginWithEmail: (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    },
    signupWithEmail: (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
    },
    signOut: () => {
        return firebase.auth().signOut()
    },
    checkUserAuth: user => {
        return firebase.auth().onAuthStateChanged(user)
    },
    // firestore
    createNewUser: userData => {
        return firebase
            .firestore()
            .collection('users')
            .doc(`${userData.uid}`)
            .set(userData)
    },
    uploadFile: async (filePath) => {
        try {
            const storage = firebase.storage();
            const sessionId = new Date().getTime();
            const imageRef = storage.ref(`images/${sessionId}`);
            return imageRef.putFile(filePath).then(() => {
                return imageRef.getDownloadURL()

            })
            // const filename = `${Math.random()}.jpeg`; // Generate unique name
            // const uploadPath = `posts/${filename}`;
            // await firebase.storage().ref(uploadPath).putFile(filePath, {cacheControl: 'no-store',});
            // return uploadPath;
        } catch (e) {
            console.log('upload file error', e.message);
            return false;
        }
    
    },
    uploadPost: async (post) => {
        try {
            let user = firebase.auth().currentUser
            let downloadLink = await Firebase.uploadFile(post.photo)
            const id = `${user.uid}${Math.random()}`
            const uploadData = {
                uid: user.uid,
                id: id,
                postPhoto: downloadLink,
                postTitle: post.title,
                postDescription: post.description,
                likes: []
            }
            return firebase
                .firestore()
                .collection('posts')
                .doc(id)
                .set(uploadData)
        }catch(err) {
            console.warn(err, "ERR")
        }
    },
    getPosts: () => {
        // let user = firebase.auth().currentUser
        try {
            return firebase
                .firestore()
                .collection('posts')
                .get()
                .then(function (querySnapshot) {
                    let posts = querySnapshot.docs.map(doc => doc.data())
                    return posts
                })
                .catch(function (error) {
                    console.log('Error getting documents: ', error)
                })
        }catch(err) {
            console.warn(err, "ERROR");
        }
    },
    getUserPosts: () => {
        let user = firebase.auth().currentUser
        return firebase
            .firestore()
            .collection('posts')
            .where('uid', '==', user.uid)
            .get()
            .then(function (querySnapshot) {
                let posts = querySnapshot.docs.map(doc => doc.data())
                return posts
            })
            .catch(function (error) {
                console.log('Error getting documents: ', error)
            })
    },
    getUserDetails: () => {
        let user = firebase.auth().currentUser
        return firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then(function (doc) {
                let userDetails = doc.data()
                console.log('USER DETAILS ===========>>', doc.data())
                return userDetails
            })
            .catch(function (error) {
                console.log('Error getting documents: ', error)
            })
    },
    uploadAvatar: async avatarImage => {
        let user = firebase.auth().currentUser
        let downloadLink = await Firebase.uploadFile(avatarImage)

        return firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .update({
                avatar: downloadLink
            })
    }
}

export default Firebase