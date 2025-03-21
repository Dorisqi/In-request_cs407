module.exports= {

  signup: function(fb, db, email, password, name, nickname){
    fb.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    });

    const userRef = db.collection('users');

    let setU = userRef.doc(email).set({
      name: name, nickname: nickname, email: email,
      LoginState: true, photostate: false
    });
  },

  login: function(fb, db, email, password, name, nickname){
    fb.auth().signInWithEmailAndPassword(email, password).then(error => {
  // log-in successful.
    const ref = db.collection('users').doc(email);
    ref.get().then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        ref.update({
          LoginState: true
        }).then(() => {
          console.log('login successful');
          // console.log('Data:', doc.data());
        });
      }
    }).catch(err => {
      // An error happened.
      console.log('Error logging in', err);
    });
  });
  },

  logout: function(fb, db, email, password, name, nickname){
    fb.auth().signOut().then(function() {
  // log-out successful.
    const ref = db.collection('users').doc(email);
    ref.update({
      LoginState: false
    }).then(() => {
      console.log('logout successful');
    });
  }).catch(err => {
    // An error happened.
    console.log('Error logging out', err);
  });
  },

  resetPassword: function(fb, email, password, name, nickname){

  },

  addTag: function(db, id, tag){
    const tagRef = db.collection('tags');

    let setTag = tagRef.doc(id).set({
      tag: tag
    });
  },


/*
  getAllTags: function(db, words，items){
    const cafeList = items;
    db.collection('tags').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {

      })
    })
  },
*/
  postRequest: function(db, r_title, r_content, email){
    const requestRef = db.collection('requests');

    let setReq = requestRef.doc(r_title).set({
      title: r_title, content: r_content, borrower: email,
      lendder: '', guarantor: '', price: 0, status: 'begin'
    });
  },

  getAllRequests: function(){

  }

}

function wordadd(words){
  words = 99999;
}
