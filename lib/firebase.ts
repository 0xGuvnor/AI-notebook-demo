// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "notion-clone-b41dd.firebaseapp.com",
  projectId: "notion-clone-b41dd",
  storageBucket: "notion-clone-b41dd.appspot.com",
  messagingSenderId: "760667625369",
  appId: "1:760667625369:web:add9c83593b60b8300e508",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadToFirebase(url: string, name: string) {
  try {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();

    const fileName = name.replace(" ", "") + Date.now() + ".jpeg";
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, buffer, { contentType: "image/jpeg" });

    const firebaseUrl = await getDownloadURL(storageRef);

    return firebaseUrl;
  } catch (error) {
    console.error(error);
  }
}
