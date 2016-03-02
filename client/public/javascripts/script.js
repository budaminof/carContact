$(function(){
  console.log('jquery script');

  $('.registrationForm').hide();

  $('.messages').hide();

  $('.showRegisterForm').on('click', function(){
    $('.registrationForm').show();
    $('.showRegisterForm').hide();
  });

});
