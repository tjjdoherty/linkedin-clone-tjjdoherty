import { firestore } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

// adding the object as well as dbRef because object may include images, video, or emoji files in addition to just text in the status update.


let dbRef = collection(firestore, "posts");
export const PostStatusData = (status) => {
    let object = {
        status: status
    };
    addDoc(dbRef, object)
        .then((response) => {
            console.log("Document has been added successfully");
        })
        .catch((error) => {
            console.log(error);
        })
};