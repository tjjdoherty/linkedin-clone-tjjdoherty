import { firestore } from '../firebaseConfig';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { toast } from "react-toastify";

// adding the object as well as postsRef because object may include images, video, or emoji files in addition to just text in the status update. dbRef became postsRef

let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");

export const PostStatusData = (object) => {
    addDoc(postsRef, object)
        .then((response) => {
            toast.success("Posted!");
        })
        .catch((error) => {
            console.log(error);
        })
};

// use of on Snapshot - now when we post a status with the postUpdate recent lines of code, it is rendered immediately

export const getStatus = (setAllStatus) => {
    onSnapshot(postsRef, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return {...docs.data(), id: docs.id}
            })
        )
    })
}

export const postUserData = (object) => {
    addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
        console.log(err);
    });
}

export const getCurrentUser = (setCurrentUser) => {
    let currEmail = localStorage.getItem('userEmail')

    onSnapshot(userRef, (response) => {
        setCurrentUser(
            response.docs
            .map((docs) => {
                return { ...docs.data(), userID: docs.id }
            })
            .filter((item) => {
                return item.email === currEmail;
            })[0]
        )
    })
}