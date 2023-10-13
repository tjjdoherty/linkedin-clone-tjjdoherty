import { firestore } from '../firebaseConfig';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { toast } from "react-toastify";

// adding the object as well as dbRef because object may include images, video, or emoji files in addition to just text in the status update.

let dbRef = collection(firestore, "posts");
export const PostStatusData = (object) => {
    addDoc(dbRef, object)
        .then((response) => {
            toast.success("Posted!");
        })
        .catch((error) => {
            console.log(error);
        })
};

// use of on Snapshot - now when we post a status with the postUpdate recent lines of code, it is rendered immediately

export const getStatus = (setAllStatus) => {
    onSnapshot(dbRef, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return {...docs.data(), id: docs.id}
            })
        )
    })
}