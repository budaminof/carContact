$(function(){

  if(Object.keys(localStorage).length > 0 ){
    for(var key in localStorage){
      if(key == "email"){$('#emailForm')[0].value = localStorage[key];}
      if(key == "firstname"){$('#firstnameForm')[0].value = localStorage[key];}
      if(key == "lastname"){$('#lastnameForm')[0].value = localStorage[key];}
      if(key == "plate"){$('#licenseplateForm')[0].value = localStorage[key];}
      if(key == "state"){$('#stateForm')[0].value = localStorage[key];}
      if(key == "phone"){$('#phonenumberForm')[0].value = localStorage[key];}
    }
  }

  $('.registrationForm').hide();

  $('.messages').hide();

  $('.plateMessageGroup').hide();

  $('.plateMessageError').hide();
  $('.registrationError').hide();

  $('.FAQ').hide();

  $('.leftColumnImage').on('click', function(){
    $('.plateMessageGroup').show();
    $('.plateAndStateForm').show();
    $('.mainBodyFadeOut').fadeOut(500);
  });

  $('.centerColumnImage').on('click', function(){
    $('.registrationForm').show();
    $('.mainBodyFadeOut').fadeOut(500);
  });

  $('.rightColumnImage').on('click', function(){
    $('.FAQ').show();
    $('.mainBodyFadeOut').fadeOut(500);
  });

  $('.cancelButtonMessages').on('click', function(){
    $('.plateMessageGroup').hide();
    $('.messages').hide();
    $('.mainBodyFadeOut').fadeIn(500);
  });

  $('.cancelButtonRegister').on('click', function(){
    $('.registrationForm').hide();
    $('.mainBodyFadeOut').fadeIn(500);
    $('.registrationError').hide();
    var email = $('#emailForm')[0].value;
    var firstName = $('#firstnameForm')[0].value;
    var lastName = $('#lastnameForm')[0].value;
    var plate = $('#licenseplateForm')[0].value;
    var state = $('#stateForm')[0].value;
    var phone = $('#phonenumberForm')[0].value;
    if(email){localStorage.setItem("email", email);}
    if(firstName){localStorage.setItem("firstname", firstName);}
    if(lastName){localStorage.setItem("lastname", lastName);}
    if(plate){localStorage.setItem("plate", plate);}
    if(state){localStorage.setItem("state", state);}
    if(phone){localStorage.setItem("phone", phone);}

  });

  $('.cancelButtonFAQ').on('click', function(){
    $('.FAQ').hide();
    $('.mainBodyFadeOut').fadeIn(500);
  });



  //********** FORM VALIDATION **************//
  //********** PLATE SEARCH *****************//
  $('#plateSearch').on('blur', function(){
    var plate = $('#plateSearch')[0].value;
    if(plate == ""){
      $('#plateSearch').css("border", "1px solid red");
    } else {
      $('#plateSearch').css("border", "");
    }
  });

  $('#plateState').on('blur', function(){
    var plate = $('#plateState')[0].value;
    if(plate == ""){
      $('#plateState').css("border", "1px solid red");
    } else {
      $('#plateState').css("border", "");
    }
  });

  //********* REGISTRATION ***************//
  $('#emailForm').on('blur', function(){
    var plate = $('#emailForm')[0].value;
    if(plate == ""){
      $('#emailForm').css("border", "1px solid red");
    } else {
      $('#emailForm').css("border", "");
    }
  });

  $('#passwordForm').on('blur', function(){
    var plate = $('#passwordForm')[0].value;
    if(plate == ""){
      $('#passwordForm').css("border", "1px solid red");
    } else {
      $('#passwordForm').css("border", "");
    }
  });

  $('#firstnameForm').on('blur', function(){
    var plate = $('#firstnameForm')[0].value;
    if(plate == ""){
      $('#firstnameForm').css("border", "1px solid red");
    } else {
      $('#firstnameForm').css("border", "");
    }
  });

  $('#lastnameForm').on('blur', function(){
    var plate = $('#lastnameForm')[0].value;
    if(plate == ""){
      $('#lastnameForm').css("border", "1px solid red");
    } else {
      $('#lastnameForm').css("border", "");
    }
  });

  $('#licenseplateForm').on('blur', function(){
    var plate = $('#licenseplateForm')[0].value;
    if(plate == ""){
      $('#licenseplateForm').css("border", "1px solid red");
    } else {
      $('#licenseplateForm').css("border", "");
    }
  });

  $('#stateForm').on('blur', function(){
    var plate = $('#stateForm')[0].value;
    if(plate == ""){
      $('#stateForm').css("border", "1px solid red");
    } else {
      $('#stateForm').css("border", "");
    }
  });

  $('#phonenumberForm').on('blur', function(){
    var plate = $('#phonenumberForm')[0].value;
    if(plate == ""){
      $('#phonenumberForm').css("border", "1px solid red");
    } else {
      $('#phonenumberForm').css("border", "");
    }
  });

});
