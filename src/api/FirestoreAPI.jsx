import { firestore } from '../firebaseConfig';
import { addDoc, collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { toast } from "react-toastify";

// adding the object as well as postsRef because object may include images, video, or emoji files in addition to just text in the status update. dbRef became postsRef

// purpose of PostStatusData and postUserData - add items to the database
// purpose of getStatus and getCurrentUser - onSnapshot will listen for changes when new posts are added or new users are signed up. 
// As soon as that happens the setAllStatus/setCurrentUser will update

// these methods and currentUser starts being passed down as a state from layouts 
// e.g. profileLayout takes getCurrentUser from this API --> Profile page --> ProfileComponent

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
};

export const postUserData = (object) => {
    addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
        console.log(err);
    });
};

// line 47 localStorage getItem because in RegisterComponent, we did localStorage setItem userEmail
//setCurrentUser is not returning the email address, it's returning the full user object whose email address in local storage matches the email in the user object

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

export const editProfile = (userID, payload) => {
    let userToEdit = doc(userRef, userID)

    updateDoc(userToEdit, payload)
    .then(() => {
        toast.success("Updated Profile Details");
    })
    .catch((err) => {
        console.log(err);
    });

}