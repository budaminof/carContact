$(function(){
  console.log('jquery script');

  $('.registrationForm').hide();

  $('.messages').hide();

  $('.plateMessageGroup').hide();

  $('.FAQ').hide();

  $('.leftColumnImage').on('click', function(){
    $('.plateMessageGroup').show();
  })

  $('.centerColumnImage').on('click', function(){
    $('.registrationForm').show();
    //$( '.registrationForm' ).dialog({ modal: true });
  });

  $('.rightColumnImage').on('click', function(){
    $('.FAQ').show();
  });

  $('.cancelButtonRegister').on('click', function(){
    $('.registrationForm').hide();
  });

  $('.cancelButtonMessages').on('click', function(){
    $('.plateMessageGroup').hide();
  });

  $('.cancelButtonFAQ').on('click', function(){
    $('.FAQ').hide();
  });

});
