import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeApp } from "firebase/app";

// VITE_FIREBASE_API_KEY=AIzaSyC_sJisl0FC40nIJnAste1Mw3wThG5L3aE
// VITE_FIREBASE_AUTH_DOMAIN=fir-auth-328d4.firebaseapp.com
// VITE_FIREBASE_PROJECT_ID=fir-auth-328d4
// VITE_FIREBASE_STORAGE_BUCKET=fir-auth-328d4.appspot.com
// VITE_FIREBASE_MESSAGING_SENDER_ID=851578646682
// VITE_FIREBASE_APP_ID=1:851578646682:web:76c1424be56834b9172f23

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

console.log(firebaseApp);

export { firebaseApp };

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
