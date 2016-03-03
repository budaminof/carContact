$(function(){
  console.log('jquery script');

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

  $('.cancelButtonRegister').on('click', function(){
    $('.registrationForm').hide();
    $('.mainBodyFadeOut').fadeIn(500);
  });

  $('.cancelButtonMessages').on('click', function(){
    $('.plateMessageGroup').hide();
    $('.mainBodyFadeOut').fadeIn(500);
  });

  $('.cancelButtonFAQ').on('click', function(){
    $('.FAQ').hide();
    $('.mainBodyFadeOut').fadeIn(500);
  });

});
