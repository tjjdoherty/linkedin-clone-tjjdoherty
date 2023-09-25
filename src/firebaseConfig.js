// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHX2KypsVoLtkqYOiiEc2XCJdY0JGG88A",
  authDomain: "linkedin-clone-tjjdoherty.firebaseapp.com",
  projectId: "linkedin-clone-tjjdoherty",
  storageBucket: "linkedin-clone-tjjdoherty.appspot.com",
  messagingSenderId: "888162640053",
  appId: "1:888162640053:web:51ee5268579300b3f99efc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };

// i did have getAuth in AuthAPI but it should be done here to initialize firebase
