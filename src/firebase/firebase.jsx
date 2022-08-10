import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import Constants from "expo-constants";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
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
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey2,
  authDomain: Constants.manifest.extra.authDomain2,
  projectId: Constants.manifest.extra.projectId2,
  storageBucket: Constants.manifest.extra.storageBucket2,
  messagingSenderId: Constants.manifest.extra.messagingSenderId2,
  appId: Constants.manifest.extra.appId2,
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const initFirebase = initializeApp(firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export async function registerNewUser(user) {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
  } catch (error) {
    console.log(error);
  }
}
