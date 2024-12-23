import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword, sendEmailVerification, onAuthStateChanged, getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import store from "./store";
import { login as loginHandle, logout as logoutHandle } from "./store/Auth";

// Firebase konfigürasyonu
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
};



// Firebase'i başlatma
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const update = async (displayName, photoURL) => {
    try {
        const user = auth.currentUser;
        if (user) {
            await updateProfile(user, { displayName, photoURL });
            toast.success("Profil güncellendi.");
            return true;
        } else {
            toast.error("Kullanıcı giriş yapmamış.");
            return false;
        }
    } catch (error) {
        toast.error("Bir hata oluştu: " + error.message);
        return false;
    }
};


export const register = async (email, password) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        toast.error(error.message);
    }
};

export const login = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        toast.error(error.message);
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        toast.error(error.message);
    }
};

export const resetPassword = async (password) => {
    try {
        await updatePassword(auth.currentUser, password);
        toast.success("Parolanız güncellendi.");
        return true;
    } catch (error) {
        toast.error(error.message);
    }
};

export const emailVerification = async () => {
    try {
        await sendEmailVerification(auth.currentUser);
        toast.success(`Dogrulama maili ${auth.currentUser.email} adresine gönderildi, Lütfen kontrol ediniz.`);
    } catch (error) {
        toast.error(error.message);
    }
};

// Kullanıcı oturumu durumunu kontrol etme
onAuthStateChanged(auth, (user) => {
    if (user) {
        store.dispatch(loginHandle({
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            uid: user.uid
        }));
    } else {
        store.dispatch(logoutHandle());
    }
});

export default app;
