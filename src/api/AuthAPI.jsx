import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup 
} from 'firebase/auth';
import { auth } from "../firebaseConfig";

// let auth = getAuth(); -- this needed to be declared in firebaseConfig file not here

// noticed that this stage made the dev preview go blank, no error just pure white screen

export const LoginAPI = (email, password) => {
    try {
        let response = signInWithEmailAndPassword(auth, email, password);
        return response;
    } catch (err) {
        return err;
    }
};

export const RegisterAPI = (email, password) => {
    try {
        let response = createUserWithEmailAndPassword(auth, email, password);
        return response;
    } catch (err) {
        return err;
    }
};

export const GoogleSignInAPI = () => {
    try {
        let googleProvider = new GoogleAuthProvider;
        let result = signInWithPopup(auth, googleProvider);
        return result;
    } catch (err) {
        return err;
    }
};