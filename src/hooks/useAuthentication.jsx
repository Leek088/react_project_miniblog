import { db } from '../firebase/config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        let userCredential;

        try {
            userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(userCredential.user, {
                displayName: data.displayName
            });
        }
        catch (error) {
            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage = "A sennha precisa de pelo menos 6 caracters.";
            }
            else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado.";
            }
            else {
                console.log(error.message);
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
            }

            setError(systemErrorMessage);
        }

        setLoading(false);
        return userCredential;
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading
    }
};