$(document).ready(function(){
  $('input#demoImageBtn').change(function(){
    $('form#demoForm').trigger('submit');
  });
  $('#demoDownload').click(function(){
    $('input#demoImageBtn').trigger('click');
  })
});