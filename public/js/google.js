function onSignIn(googleUser) {
    console.log("entered onSignIn")
    var profile = googleUser.getBasicProfile();
    $('.g-signin2').css('display','none');
    $('.g-loginData').css('display','block');
    $('#g-loginPic').attr('src',profile.getImageUrl());
    $('#g-accountDisplayName').text(profile.getGivenName());
    $('#g-emailAddress').text(profile.getEmail());
};

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  };