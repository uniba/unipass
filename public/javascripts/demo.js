$(function() {

  window.scrollTo(0, 1);
  
  delete $.blockUI.defaults.css.border;
  delete $.blockUI.defaults.css.backgroundColor;

  $('input#demoImageBtn').on('change', function(event) {
    var div = document.createElement('div')
      , spinner = new Spinner({ color: '#fff' }).spin(div);
    
    $.blockUI({ message: div });
    $('form#demoForm').trigger('submit');
  });
  
  $('#demoCapture').on('click', function(event) {
    $('input#demoImageBtn').trigger('click');
    return false;
  });
  
  $('#demoDownload').on('click', function(event) {
    
  });
  
  $('.touchButton')
    .on('touchstart', function(event) {
      $(this).addClass('touched');
    })
    .on('touchend', function(event) {
      $(this).removeClass('touched');
    });
});