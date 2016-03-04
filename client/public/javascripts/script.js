$(function(){
  $('.registrationForm').hide();

  $('.messages').hide();

  $('.plateMessageGroup').hide();

  $('.FAQ').hide();

  $('.leftColumnImage').on('click', function(){
    $('.plateMessageGroup').show();
    $('.plateAndStateForm').show();
    $('.mainBodyFadeOut').fadeOut(500);
  });

  $('#messagesButton').on('click', function(){
    $('.messages').show();
    $('.plateAndStateForm').hide();
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
