import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import { useState } from "react";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
              const user = userCredential.user;
              console.log(user);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
            // ..
          });
    }
    const authInfo = {
      createUser,
      user,
      loading,
  };
    return <AuthContext value={authInfo}>
      {children}
  </AuthContext>;
};

export default AuthProvider;
