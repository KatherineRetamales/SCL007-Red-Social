window.onload = () => {
  checkAuthState((user) => {
    if (user) {
      sign_off_btn.style.display = "block";
      start.style.display = "none";
      readPostFromDatabase();
    } else {
      start.style.display = "block";
      sign_off_btn.style.display = "none";
      setting_profile.style.display = "none";
      app.style.display = "none";
    }
  });

  //boton registrarse
  document.getElementById('register_btn').addEventListener('click',
    (event) => {
      event.preventDefault();
      const emailFromUser = text_email.value;
      const passwordFromUser = text_password.value;
      registerUser(emailFromUser, passwordFromUser);
      setting_profile.style.display = "block";
    })
  //guardar datos del perfil
  document.getElementById('save_settings').addEventListener('click',
    (evento) => {
      evento.preventDefault();
      const emailFromUser = firebase.auth().currentUser.email;
      const usernameFromUser = username.value;
      const birthdateFromUser = birthdate.value;
      const sportFromUser = sport.value;
      settingsPage(emailFromUser, usernameFromUser, birthdateFromUser, sportFromUser);
      setting_profile.style.display = "none";
      app.style.display = "block";
    })
  //boton iniciar sesion
  document.getElementById('login_btn').addEventListener('click',
    (event) => {
      event.preventDefault();
      const emailFromUser = text_email.value;
      const passwordFromUser = text_password.value;
      loginUser(emailFromUser, passwordFromUser);
      app.style.display = "block";
    })
  //boton iniciar sesion con google
  document.getElementById('sign_google_btn').addEventListener('click',
    (event) => {
      event.preventDefault();
      loginUserGoogle();
      app.style.display = "block";
    })
  //boton iniciar sesion con facebook
  document.getElementById('sign_facebook_btn').addEventListener('click',
    (event) => {
      event.preventDefault();
      loginUserFacebook();
      app.style.display = "block";
    })
  //boton cerrar sesion
  document.getElementById('sign_off_btn').addEventListener('click',
    (event) => {
      event.preventDefault();
      signOff();
    })
  //boton publicar 
  document.getElementById('state_button').addEventListener('click',
    (event) => {
      event.preventDefault();
      const contect = textareaContect.value;
      const radios = document.getElementsByName('state');
      const email = firebase.auth().currentUser.email;
      for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          statusRadio = radios[i].value;
          break;
        }
      }
      registerPost(contect, statusRadio, email);
    })

document.getElementById('my_profile').addEventListener('click',
(event) =>{
  event.preventDefault();

 
})
  const readPostFromDatabase = () => {
    postContainer.innerHTML = "";
    readPostPublic((post) => {
      obtPost = Object.values(post.val());
      console.log(obtPost[0]);
      postContainer.innerHTML +=
        `<h6>Publicación de:${post.val().email}</h6>
        <textarea class="post_txt">${post.val().post}</textarea>
        <h6>${post.val().status}</h6>
        <button type="button" id="coment_btn_${post.key}" class="comentPost">Comentar</button>
        <button type="button" id="delete_btn${post.key}" class="deletePost">Eliminar</button>
        <button type="button" id="edit_btn${post.key}" class="editPost" >Editar</button>`;

      //hago una coleccion de botones
      let coleccButton = document.getElementsByClassName("deletePost");
      for (let i = 0; i < coleccButton.length; i++) {
        coleccButton[i].addEventListener("click", deletePost);
      }

      let coleccButtonComent = document.getElementsByClassName("comentPost");
      for (let i = 0; i < coleccButtonComent.length; i++) {
        coleccButtonComent[i].addEventListener("click",comentPost = (key) => {
          const botonId = key.target.getAttribute("id").substring(11, 50);
          const modal = document.getElementById('myModal');
          const span = document.getElementsByClassName("close")[0];
          modal.style.display = "block";
          modal.innerHTML = `
            <div class="modal-content">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <input type="hidden" id="key_post_txt" value="${botonId}">
                    <textarea id="coment_post_txt" placeholder="¿Que quieres comentar?"></textarea><br>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <button id="coment_post_btn">Comentar</button>
                  </div>
               </div>
              </div>
            </div>`;
         
          window.onclick = function (event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }

          document.getElementById('coment_post_btn').addEventListener('click',
          (event) => {
            event.preventDefault();
            const keyPost = key_post_txt.value;
            const  comentPost= coment_post_txt.value;
            registerComentPostPublic(keyPost, comentPost);
            modal.style.display = "none";
          })
        });
      }
    });
  }

};
