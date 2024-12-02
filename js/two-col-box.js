jQuery(document).ready(function( $ ){
  $("#twocol-show-form-1").click(function() {
    if ($('#twocol-show-form-1').hasClass("clicked-once")) {
			$('#twocol-show-hide-1').slideUp(1000);
			$('#twocol-show-form-1').removeClass("clicked-once");
            $('#twocol-show-form-2').removeClass("clicked-once");
    }
    else {
			$('#twocol-show-form-1').addClass("clicked-once");
			$('#twocol-show-hide-1').slideDown(1000);
            $('#twocol-show-hide-2').slideUp(1000);
    }
  });
    
    $("#twocol-show-form-2").click(function() {
    if ($('#twocol-show-form-2').hasClass("clicked-once")) {
			$('#twocol-show-hide-2').slideUp(1000);
			$('#twocol-show-form-2').removeClass("clicked-once");
            $('#twocol-show-form-1').removeClass("clicked-once");
    }
    else {
			$('#twocol-show-form-2').addClass("clicked-once");
			$('#twocol-show-hide-2').slideDown(1000);
            $('#twocol-show-hide-1').slideUp(1000);
    }
  });
});