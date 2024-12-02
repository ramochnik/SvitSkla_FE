jQuery(document).ready(function( $ ){
  $("#four-col-show-form-1").click(function() {
			$('.button-row').addClass("d-none");
  });
  $("#four-col-show-form-1").click(function() {
    if ($('#four-col-show-form-1').hasClass("clickt-once")) {
			$('#four-col-show-hide-1').slideUp(1000);
			$('#four-col-show-form-1').removeClass("clickt-once");
    }
    else {
			$('#four-col-show-form-1').addClass("clickt-once");
			$('#four-col-show-hide-1').slideDown(1000);
    }
  });
});
