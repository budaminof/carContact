$(function(){
  console.log('jquery script');

  $('.registrationForm').hide();

  $('.showRegisterForm').on('click', function(){
    $('.registrationForm').show();
    $('.showRegisterForm').hide();
  });
  
});
