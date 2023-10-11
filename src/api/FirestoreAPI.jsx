import { firestore } from '../firebaseConfig';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { toast } from "react-toastify";

// adding the object as well as dbRef because object may include images, video, or emoji files in addition to just text in the status update.


let dbRef = collection(firestore, "posts");
export const PostStatusData = (status) => {
    let object = {
        status: status
    };
    addDoc(dbRef, object)
        .then((response) => {
            toast.success("Posted!");
        })
        .catch((error) => {
            console.log(error);
        })
};

// we initially were console logging the array showing status posts, but if we create an AllStatus state, we can show it in the homeComponent later

export const getStatus = (setAllStatus) => {
    onSnapshot(dbRef, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return {...docs.data(), id: docs.id}
            })
        )
    })
}