import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

import { getFirestore } from "firebase/firestore"; // Importa getFirestore
import { doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // Inicializa Firestore

export const login = ({email, password}) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const register = async ({ nombre, apellido, edad, ciudad, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
  
    // Crear un objeto con los datos del usuario
    const userData = { nombre, apellido, edad, ciudad, email };

//TODO Guarda los datos del usuario en Firestore
  await setDoc(doc(db, "users", user.uid), {
    nombre,
    apellido,
    edad,
    ciudad,
    email
  });
  
    return user;
  };

export const logout = () => {
    return signOut(auth)
}

