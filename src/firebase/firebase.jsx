import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Constants from 'expo-constants'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'
getUserInfo
import { Toast } from 'react-native-toast-message/lib/src/Toast'

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
}

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig)

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const db = getFirestore(app)

export async function registerNewUser (user) {
  try {
    const docRef = collection(db, 'users')
    const res = await addDoc(docRef, user)

    return res
  } catch (error) {
    console.log(error)
  }
}

export async function updateUser (docId, user) {
  try {
    const docRef = doc(db, 'users', docId)
    const res = await setDoc(docRef, user)
    return res
  } catch (error) {
    console.error(error)
  }
}

export async function getUserInfo (uid) {
  let user = {}
  try {
    const q = query(collection(db, 'users'), where('uid', '==', uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      user = doc.data()
    })

    return user
  } catch (error) {
    console.log(error)
  }
}

export async function login (auth, email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password)

    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Bienvenido ' + email,
    })
  } catch (error) {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Usuario o contrasena incorrectos',
    })
    console.log(error)
  }
}

export async function getRestaurants () {
  const restaurantes = []
  try {
    const querySnapshot = await getDocs(collection(db, 'restaurantes'))
    querySnapshot.forEach((doc) => {
      restaurantes.push(doc.data())
    })
    console.log('okey?:', restaurantes)
    return restaurantes.reverse()
  } catch (error) {}
}

export async function getMenu (id) {
  const menu = []
  try {
    const q = query(collection(db, 'menus'), where('id', '==', id))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      menu.push(doc.data())
    })
    console.log('menu de: ', id, ' ,-->', menu)
    return menu
  } catch (error) {
    console.log(error)
  }
}
