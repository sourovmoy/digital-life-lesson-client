import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Keep a reference to the actual Firebase user
  const [firebaseUser, setFirebaseUser] = useState(null);

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    console.log("SignIn called with:", email);
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("SignIn successful:", result.user.email);
      return result;
    } catch (error) {
      console.error("SignIn error:", error.code, error.message);
      setLoading(false);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logOut = async () => {
    console.log("🚪 AuthProvider logOut called - STACK TRACE:");
    console.trace("Logout called from:");
    setLoading(true);
    try {
      const result = await signOut(auth);
      console.log("✅ Firebase signOut successful");
      return result;
    } catch (error) {
      console.error("❌ Firebase signOut error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (name, photo) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      
      // Force reload the user to get updated profile
      await auth.currentUser.reload();
      
      // Don't manually set user here, let onAuthStateChanged handle it
      // This ensures we keep the Firebase user object with all its methods
      console.log("Profile updated successfully, onAuthStateChanged will update user state");
      
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };

  // onAuthStateChange
  useEffect(() => {
    console.log("Setting up onAuthStateChanged listener");
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("🔥 Auth state changed:", {
        email: currentUser?.email || "No user",
        uid: currentUser?.uid || "No UID",
        displayName: currentUser?.displayName || "No name",
        hasGetIdToken: typeof currentUser?.getIdToken === 'function',
        userType: currentUser?.constructor?.name || 'Unknown',
        timestamp: new Date().toISOString()
      });
      
      if (currentUser) {
        try {
          // Test if getIdToken works
          if (typeof currentUser.getIdToken === 'function') {
            const testToken = await currentUser.getIdToken();
            console.log("✅ getIdToken test successful, token length:", testToken?.length || 0);
          } else {
            console.error("❌ currentUser.getIdToken is not a function!");
          }
          
          // Ensure we have the latest user data including profile updates
          await currentUser.reload();
          console.log("✅ User reloaded successfully");
          
          // Store both the Firebase user and a reference
          setFirebaseUser(currentUser);
          setUser(currentUser);
          
          console.log("📝 Set Firebase user object with methods intact");
          
        } catch (error) {
          console.error("❌ Error in auth state change:", error);
          // Even if there's an error, set the current user
          setFirebaseUser(currentUser);
          setUser(currentUser);
        }
      } else {
        console.log("❌ No current user, setting user to null");
        setFirebaseUser(null);
        setUser(null);
      }
      
      console.log("🏁 Setting loading to false");
      setLoading(false);
    });
    
    return () => {
      console.log("🧹 Cleaning up onAuthStateChanged listener");
      return unsubscribe();
    };
  }, []);
  
  if (loading) {
    return <LoadingSpinner />;
  }

  const authInfo = {
    user: firebaseUser || user, // Prefer the Firebase user reference
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
