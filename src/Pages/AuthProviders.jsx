import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../firebase/firebase.config';

export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      console.log('logged in user', loggedUser);
      setUser(loggedUser);
      setIsLoggedIn(loggedUser !== null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const setUserAndName = (user, name) => {
    setUser({ ...user, name });
  };

  const setUserAndPhoto = (user, photoURL) => {
    updateProfile(user, { photoURL })
      .then(() => {
        setUser({ ...user, photoURL });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const authInfo = {
    user,
    isLoggedIn,
    createUser,
    signIn,
    signInWithGoogle,
    logout,
    setUserAndName,
    setUserAndPhoto,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
