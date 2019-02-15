// guardar datos del usuario logeado
const settingsPage = (email, username, birthdate, sport) => {
  firebase.database().ref("users/" + firebase.auth().currentUser.uid).update({
      email: email,
      userName: username,
      birthdate: birthdate,
      sport: sport
    })
    .then(() => {
      alert(username + " sus datos se registraron correctamente");
    })
    .catch((error) => {
      console.error("Error > " + error.message);
    });
}
//funcion registrar publicacion
const registerPost = (postText, postStatus,email) => {
    let posts;
    if(postStatus === "Privado"){
      const newPostKey = firebase.database().ref('posts/').child('postPrivate').push().key;
      posts = firebase.database().ref(`posts/postPrivate/${firebase.auth().currentUser.uid}/${newPostKey}`);
    }else{
      const newPostKey = firebase.database().ref('posts/').child('postPublic').push().key;
      posts = firebase.database().ref(`posts/postPublic/${newPostKey}`);
    }
    posts.set({
      post : postText,
      status : postStatus,
      email: email
    }).then(() => {
      alert(firebase.auth().currentUser.email + " se ha publicado");
    })
    .catch((error) => {
      console.error("Error > " + error.message);
    });
    location.reload();
};

const readPostPrivate = (onPostChange) => {
  const postRef = firebase.database().ref(`posts/postPrivate/${firebase.auth().currentUser.uid}`);
  postRef.on('child_added', (post) => {
    onPostChange(post);
  });
};

const readPostPublic = (onPostChange) => {
  const postRef = firebase.database().ref(`posts/postPublic`);
  postRef.on('child_added', (post) => {
    onPostChange(post);
  });
};

  const  editPost =(post,key)=>{
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/post/${key}`).update({
        post:post
    })
    .then(() => {
        alert(username + " su publicación se edito correctamente");
    })
    .catch((error)  => {
        console.error("Error > " + error.message);
    });
  }
//Borrar un post
//Me posiciono en post a eliminar
const deletePost = (key) => {
//  console.log("hola");
  let botonId=key.target.getAttribute("id").substring(10,50);
  let alert = confirm('Seguro deseas eliminar tu comentario?');
  if (alert === true) {
    //Direccion o ruta del post que quiero eliminar
    firebase.database().ref(`posts/postPublic/${botonId}`).remove();
    location.reload();
  } else {
    return null;
  }

}
const registerComentPostPublic = (keyPost, comentPost) => {
  const newPostKey = firebase.database().ref('coment').child('comentPost').push().key;
    firebase.database().ref(`coments/${keyPost}/comentPost/${newPostKey}`).set({
      comentPost : comentPost,
    }).then(() => {
      alert(firebase.auth().currentUser.email + " se ha publicado");
    })
    .catch((error) => {
      console.error("Error > " + error.message);
    });
    location.reload();
}

const readComentPost = (onPostChange,keyPost) => {
  const comentPostRef = firebase.database().ref(`coments/${keyPost}/comentPost/`);
  comentPostRef.on('child_added', (post) => {
    onPostChange(post);
  });
};
