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
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
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
