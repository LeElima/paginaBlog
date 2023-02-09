import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';

import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBP0HlsMgJvNlIfnyaFb5HFs22VblxyWDE",
  authDomain: "paginablog-c4fb4.firebaseapp.com",
  projectId: "paginablog-c4fb4",
  storageBucket: "paginablog-c4fb4.appspot.com",
  messagingSenderId: "896678521739",
  appId: "1:896678521739:web:73702e91af57b9ff465d8e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp =firebase.firestore.FieldValue.serverTimestamp;

export{timestamp}
export default firebaseApp.firestore();