import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyBGheV35ThQXYaB74sPDkyzUIcQRV1SKho",
    authDomain: "scheduler-c04f6.firebaseapp.com",
    databaseURL: "https://scheduler-c04f6-default-rtdb.firebaseio.com",
    projectId: "scheduler-c04f6",
    storageBucket: "scheduler-c04f6.appspot.com",
    messagingSenderId: "1016027802018",
    appId: "1:1016027802018:web:67fb27ccf4fbc4bc1faafb",
    measurementId: "G-R73L6X7LZV"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };

export const setData = (path, value) => (
  set(ref(database, path), value)
);