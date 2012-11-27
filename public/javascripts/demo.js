$(function() {

  window.scrollTo(0, 1);
  
  delete $.blockUI.defaults.css.border;
  delete $.blockUI.defaults.css.backgroundColor;

  $('input#demoImageBtn').on('change', function(event) {
    var div = document.createElement('div')
      , spinner = new Spinner({
            color: '#fff'
          , lines: 13
          , length: 5
          , width: 2
          , radius: 6
          , corners: 1.0
          , rotate: 0
          , trail: 60
          , speed: 1.0
        }).spin(div);
    
    $.blockUI({ message: div });
    
    $(document.body).one('click touchstart', function() {
      $('form#demoForm').trigger('submit');      
    });
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