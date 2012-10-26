$(document).ready(function(){
  $('input#demoImageBtn').change(function(){
    $('form#demoForm').trigger('submit');
  });
  $('#demoCapture').click(function(){
    $('input#demoImageBtn').trigger('click');
  })
});