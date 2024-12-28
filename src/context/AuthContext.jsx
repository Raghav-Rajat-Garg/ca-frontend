import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase"; // Import your Firebase configuration
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  FacebookAuthProvider,
} from "firebase/auth";
import PropTypes from "prop-types"; // For prop type validation
import { signInWithCredential } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // Google Sign-In
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };


  const signInWithFacebook = async () => {
    try {
      // Step 1: Attempt Facebook login
      const result = await signInWithPopup(auth, facebookProvider);
      setUser(result.user);
    } catch (error) {
      // Step 2: Handle the case where account exists with a different credential
      if (error.code === "auth/account-exists-with-different-credential") {
        const email = error.customData?.email;
        const pendingCredential = FacebookAuthProvider.credentialFromError(error);
  
        if (email && pendingCredential) {
          try {
            // Step 3: Fetch existing sign-in methods for this email
            const existingProviders = await fetchSignInMethodsForEmail(auth, email);
            console.log("Existing providers for this email:", existingProviders);
  
            if (existingProviders.length === 0) {
              // No existing provider, so link the Facebook account directly
              console.log("No existing providers. Proceeding to link Facebook account.");
              const tempUser = await signInWithCredential(auth, pendingCredential);
              setUser(tempUser.user);
              alert("Facebook account successfully linked!");
            } else {
              // Step 4: Handle based on the existing provider
              if (existingProviders.includes("google.com")) {
                console.log("Existing provider is Google. Signing in with Google...");
                const googleResult = await signInWithPopup(auth, googleProvider);
                console.log("Signed in with Google:", googleResult.user);
                // Link Facebook to the Google account
                await linkWithCredential(googleResult.user, pendingCredential);
                console.log("Successfully linked Facebook account to Google.");
                setUser(googleResult.user);
              } else if (existingProviders.includes("password")) {
                // If the provider is email/password
                console.log("Existing provider is email/password. Signing in with email/password...");
                const emailCredential = EmailAuthProvider.credential(email, "user-password"); // You need the actual password here
                const emailUser = await signInWithCredential(auth, emailCredential);
                console.log("Signed in with email/password:", emailUser.user);
                await linkWithCredential(emailUser.user, pendingCredential); // Link Facebook to email/password account
                console.log("Successfully linked Facebook account to email/password.");
                setUser(emailUser.user);
              } else {
                console.warn("Unhandled provider detected. Please contact support.");
              }
            }
          } catch (linkingError) {
            console.error("Error during linking accounts:", linkingError.message);
          }
        } else {
          console.error("No valid email or credential data found in the error.");
        }
      } else {
        console.error("Facebook Sign-In Error:", error.message);
      }
    }
  };
  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign-Out Error:", error.message);
    }
  };

  // Monitor Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Context Value
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithFacebook,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom Hook to Use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
