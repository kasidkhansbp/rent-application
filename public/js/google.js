function onSignIn(googleUser) {
    console.log("entered onSignIn")
    //profile need to be global to be access in main.js to trigger login for posting an ad.
    profile = googleUser.getBasicProfile();
    $('.g-signin2').css('display','none');
    $('.reply-button').css('display','block');
    $('.g-loginData').css('display','block');
    $('#g-loginPic').attr('src',profile.getImageUrl());
    $('#g-accountDisplayName').text(profile.getGivenName());
    $('#g-emailAddress').text(profile.getEmail());
    var myUserEntity = {};
    myUserEntity.Id = profile.getId();
    myUserEntity.Name = profile.getName();
  //Store the entity object in localStorage where it will be accessible from all pages of your site.
  localStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));

  // The ID token you need to pass to your backend:
    id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

};

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  };