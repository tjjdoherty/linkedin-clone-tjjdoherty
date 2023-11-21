import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { editProfile } from "./FirestoreAPI";

// with progress bar - I set setProgress(0) so that when you return to upload another photo later, the completed progress bar is still not sitting there.

export const uploadImage = (file, userId, setModalOpen, setProgress, setCurrentImage) => {
    const profilePicsRef = ref(storage, `profileImages/${file.name}`)
    const uploadTask = uploadBytesResumable(profilePicsRef, file)

    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((response) => {
                    editProfile(userId, { imageLink: response });
                    setProgress(0);
                    setCurrentImage({});
                    setModalOpen(false);
                });
            }
    );
};