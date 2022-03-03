import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDQSQH4rlRpretiVvoH5Ha9O8MLyPWilkw",
  authDomain: "cohorte3-g41.firebaseapp.com",
  projectId: "cohorte3-g41",
  storageBucket: "cohorte3-g41.appspot.com",
  messagingSenderId: "272370917956",
  appId: "1:272370917956:web:6b238c84d4cc239a1e1211",
  measurementId: "G-P7XJ8D4HSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }