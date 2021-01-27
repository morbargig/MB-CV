import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

class FirebaseApi {
  constructor() {
    this.firebase = firebase
    this.firebase.initializeApp(firebaseConfig);
    this.username = "mor bargig"
  }

  newPdf = () => {
    this.firebase.database().ref(`CV/${this.username}/`).set({
      HebPDF: '',
      EngPDF: '',
      language: 'EngPDF',
      linkedin: '',
    });
  }

  getPdf = () => {
    return this.firebase.database().ref(`CV/${this.username}/`).once('value').then((snap) => {
      return snap.val()
    });
  }

  uplodadPdf = async (uploadedImage) => {
    try {
      const storageRef = this.firebase.storage().ref();
      const fileRef = storageRef
        .child(`/CV/${this.username}/${uploadedImage.name}`);

      const uploadTaskSnapshot = await fileRef.put(uploadedImage);

      return uploadTaskSnapshot.ref.getDownloadURL();
    }
    catch (error) {
      return console.log("ERR ===", error);
      // alert("Image uploading failed!");
    }
  }


  updatePdf = async (upDate) => {
    let data
    await this.firebase.database().ref(`CV/${this.username}/`).once('value').then((snap) => {
      data = snap.val()
    });

    for (let i in upDate) {
      if (upDate[i]) {
        data[i] = upDate[i]
      }
    }
    return this.firebase.database().ref(`CV/${this.username}`).set({
      HebPDF: data.HebPDF,
      EngPDF: data.EngPDF,
      language: data.language,
      linkedin: data.linkedin,
    });
  }
}


export default new FirebaseApi()

