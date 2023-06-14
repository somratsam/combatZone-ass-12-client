import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      console.log('logged in user', loggedUser);
      setUser(loggedUser);
      setIsLoggedIn(loggedUser !== null);

      // jwt....

      if (loggedUser) {
        axios
          .post('http://localhost:5000/jwt', { email: loggedUser.email })
          .then((data) => {
            console.log(data.data.token);
            localStorage.setItem('access-token', data.data.token);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching JWT:', error);
            
          });
      } else {
        localStorage.removeItem('access-token');
       
      }
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
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logout,
    setUserAndName,
    setUserAndPhoto,
  };

  console.log(user);

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
