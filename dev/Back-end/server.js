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

  },

  logout: function(fb, db, email, password, name, nickname){

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