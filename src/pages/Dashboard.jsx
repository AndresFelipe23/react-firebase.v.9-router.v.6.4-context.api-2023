import { logout } from "../config/firebase";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
    // Limpiar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  const [nombre, setNombre] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const db = getFirestore();
      const docRef = doc(db, "users", getAuth().currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setNombre(docSnap.data().nombre);
      } else {
        console.log("No such document!");
      }
    };

    fetchUserData();
  }, []);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div class="text-center mt-2">
          <h2 class="font-semibold">{nombre}</h2>
          <p class="text-gray-500">{userEmail}</p>
        </div>

        <div class="p-4 border-t mx-8 mt-2">
          <button
            onClick={handleLogout}
            variant="contained"
            class="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
          >
            Logout
          </button>
        </div>
      </div>

      {/* <button
        onClick={handleLogout}
        variant="contained"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button> */}
    </>
  );
};

export default Dashboard;
