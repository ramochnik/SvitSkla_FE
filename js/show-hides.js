jQuery(document).ready(function ($) {
    $("#cta-show-form").click(function () {
        const getStartedFormWrapper = $( $(this).attr('href') );
        getStartedFormWrapper.show();
        getStartedFormWrapper.find('.gform_wrapper').show();
        if ($('#cta-show-form').hasClass("clickt-once")) {
            $('#cta-show-hide').slideUp(1000);
            $('#cta-show-form').removeClass("clickt-once");
        } else {
            $('#cta-show-form').addClass("clickt-once");
            $('#cta-show-hide').slideDown(1000);
        }
    });

    $('.click-show-form-2').each(function() {
        $(this).on('click', function () {
            $('#show-form-2').click();   
            setTimeout(function(){
                $('html, body').animate({
                    scrollTop: $('#show-hide-2').offset().top - 50
                }, 400);
            }, 300); 
        });
    });

    $("#biz-show-form-1").click(function () {
        if ($('#biz-show-form-1').hasClass("clicked-once")) {
            $('#biz-show-hide-1').slideUp(1000);
            $('#biz-show-form-1').removeClass("clicked-once");
            $('#cta-w-buttons button.btn').html("get started now");
        } else {
            $('#biz-show-form-1').addClass("clicked-once");
            $('#biz-show-form-2').removeClass("clicked-once");
            $('#biz-show-hide-1').slideDown(1000);
            $('#biz-show-hide-2').slideUp(1000);

        }
    });

    $("#biz-show-form-2").click(function () {
        if ($('#biz-show-form-2').hasClass("clicked-once")) {
            $('#biz-show-hide-2').slideUp(1000);
            $('#biz-show-form-2').removeClass("clicked-once");
        } else {
            $('#biz-show-form-2').addClass("clicked-once");
            $('#biz-show-form-1').removeClass("clicked-once");
            $('#biz-show-hide-2').slideDown(1000);
            $('#biz-show-hide-1').slideUp(1000);
        }
    });

    $(".page-business-services .herobtn2").click(function () {
        $('#biz-show-hide-2').slideDown(1000);
        $('#biz-show-form-2').addClass("clicked-once");
    });

    $("a.open-biz-form").click(function () {
        $('#biz-show-hide-2').slideDown(1000);
        $('#biz-show-form-2').addClass("clicked-once");
    });


    $("#four-col-show-hide .show-form").click(function () {
        $('.button-row').addClass("d-none");
    });

    // General show hide and contact bar slider boxes
    if (window.location.pathname !== "/pickup-delivery") {
        $('#show-form-button').click(function () {
            if ($('#show-form-button').hasClass("clicked-once")) {
                $('#show-hide-button').slideUp(500);
                $('#show-form-button').removeClass("clicked-once");
                $('#show-form-button').text("get started online");
            } else {
                $('#show-form-button').addClass("clicked-once");
                $('#show-form-button-2').removeClass("clicked-once");
                $('#show-hide-button').slideDown(500);
                $('#show-hide-button-2').slideUp(500);
                $('#show-form-button').text("never mind");
            }
        });
    }
    if (window.location.pathname === "/pickup-delivery") {
        $('#show-form-button').click(function () {
            if ($('#show-form-button').hasClass("clicked-once")) {
                $('#show-hide-button').slideUp(500);
                $('#show-form-button').removeClass("clicked-once");
                $('#show-form-button').text("schedule a free pickup");
            } else {
                $('#show-form-button').addClass("clicked-once");
                $('#show-form-button-2').removeClass("clicked-once");
                $('#show-hide-button').slideDown(500);
                $('#show-hide-button-2').slideUp(500);
                $('#show-form-button').text("never mind");
            }
        });
    }

    //Show hide 
    $('#show-form-button-2').click(function () {
        if ($('#show-form-button-2').hasClass("clicked-once")) {
            $('#show-hide-button-2').slideUp(500);
            $('#show-form-button-2').removeClass("clicked-once");
            $('#show-form-button-2').text("get started online");
        } else {
            $('#show-form-button-2').addClass("clicked-once");
            $('#show-form-button').removeClass("clicked-once");
            $('#show-hide-button-2').slideDown(500);
            $('#show-hide-button').slideUp(500);
            $('#show-form-button-2').text("never mind");
        }
    });
    $('#show-form-button-3').click(function () {
        if ($('#show-form-button-3').hasClass("clicked-once")) {
            $('#show-hide-button-3').slideUp(500);
            $('#show-form-button-3').removeClass("clicked-once");
            $('#show-form-button-3').text("get started online");
        } else {
            $('#show-form-button-3').addClass("clicked-once");
            $('#show-hide-button-3').slideDown(500);
            $('#show-form-button-3').text("never mind");
        }
    });
    $("#show-form").click(function () {
        if ($('#show-form').hasClass("clicked-once")) {
            $('#show-hide').slideUp(1000);
            $('#show-form').removeClass("clicked-once");

            $("#show-form h3.uabb-infobox-title").fadeOut(function () {
                $("#show-form h3.uabb-infobox-title").text(($("#show-form h3.uabb-infobox-title").text() == 'HIDE FORM') ? 'MEASURE YOUR SPACE' : 'HIDE FORM').fadeIn();
            })

            $(".fl-builder-content .fl-node-5ea11d324cc85 a.fl-button").html("book now");
            $("#virtual-appointment").parent().removeClass("clicked-instore");
        } else {
            $('#show-form').addClass("clicked-once");
            $('#show-form-2').removeClass("clicked-once");
            $('#show-hide').slideDown(1000);
            $('#show-hide-2').slideUp(1000);

            $("#show-form h3.uabb-infobox-title").fadeOut(function () {
                $("#show-form h3.uabb-infobox-title").text(($("#show-form h3.uabb-infobox-title").text() == 'MEASURE YOUR SPACE') ? 'HIDE FORM' : 'MEASURE YOUR SPACE').fadeIn();
            })
            $(".fl-builder-content .fl-node-5ea11d324cc85 a.fl-button").html("never mind");
            $("#virtual-appointment").parent().addClass("clicked-instore");

            if ($("#show-form-2 h3.uabb-infobox-title").text() === "HIDE FORM") {
                $("#show-form-2 h3.uabb-infobox-title").fadeOut(function () {
                    $("#show-form-2 h3.uabb-infobox-title").text('GET STARTED NOW').fadeIn();
                })
            }
        }
    });

    //new, adapted for gutenberg 
    $("#show-form-1").click(function () {
        if ($('#show-form-1').hasClass("clicked-once")) {
            $('#show-hide-1').slideUp(1000);
            $('#show-form-1').removeClass("clicked-once");

            $("#show-form-1 h3.uabb-infobox-title").fadeOut(function () {
                $("#show-form h3.uabb-infobox-title").text(($("#show-form h3.uabb-infobox-title").text() == 'HIDE FORM') ? 'MEASURE YOUR SPACE' : 'HIDE FORM').fadeIn();
            })

            $(".fl-builder-content .fl-node-5ea11d324cc85 a.fl-button").html("book now");
            $("#virtual-appointment").parent().removeClass("clicked-instore");
        } else {
            $('#show-form-1').addClass("clicked-once");
            $('#show-form-2').removeClass("clicked-once");
            $('#show-form-3').removeClass("clicked-once");
            $('#show-form-4').removeClass("clicked-once");
            $('#show-form-5').removeClass("clicked-once");

            $('#show-hide-1').slideDown(1000);
            $('#show-hide-2').slideUp(1000);
            $('#show-hide-3').slideUp(1000);
            $('#show-hide-4').slideUp(1000);
            $('#show-hide-5').slideUp(1000);

            $('#gform_wrapper_21819').css('display', 'block');

            $("#show-form-1 h3.uabb-infobox-title").fadeOut(function () {
                $("#show-form-1 h3.uabb-infobox-title").text(($("#show-form h3.uabb-infobox-title").text() == 'MEASURE YOUR SPACE') ? 'HIDE FORM' : 'MEASURE YOUR SPACE').fadeIn();
            })
            $(".fl-builder-content .fl-node-5ea11d324cc85 a.fl-button").html("never mind");
            $("#virtual-appointment").parent().addClass("clicked-instore");

            if ($("#show-form-2 h3.uabb-infobox-title").text() === "HIDE FORM") {
                $("#show-form-2 h3.uabb-infobox-title").fadeOut(function () {
                    $("#show-form-2 h3.uabb-infobox-title").text('GET STARTED NOW').fadeIn();
                })
            }
        }
    });

    $("#show-form-2").click(function () {
        if ($('#show-form-2').hasClass("clicked-once")) {
            $('#show-hide-2').slideUp(1000);
            $('#show-form-2').removeClass("clicked-once");
            $("#show-form-2 h3.uabb-infobox-title").fadeOut(function () {
                $("#show-form-2 h3.uabb-infobox-title").text(($("#show-form-2 h3.uabb-infobox-title").text() == 'GET STARTED NOW') ? 'HIDE FORM' : 'GET STARTED NOW').fadeIn();
            })

        } else {
            $('#show-form-2').addClass("clicked-once");
            $('#show-form').removeClass("clicked-once");
            $('#show-form-1').removeClass("clicked-once");
            $('#show-form-3').removeClass("clicked-once");
            $('#show-form-4').removeClass("clicked-once");
            $('#show-form-5').removeClass("clicked-once");

            $('#show-hide-2').slideDown(1000);
            $('#show-hide').slideUp(1000);
            $('#show-hide-1').slideUp(1000);
            $('#show-hide-3').slideUp(1000);
            $('#show-hide-4').slideUp(1000);
            $('#show-hide-5').slideUp(1000);

            $('#gform_wrapper_21819').css('display', 'block');

            $("#show-form-2 h3.uabb-infobox-title").fadeOut(function () {
                $("#show-form-2 h3.uabb-infobox-title").text(($("#show-form-2 h3.uabb-infobox-title").text() == 'HIDE FORM') ? 'GET STARTED NOW' : 'HIDE FORM').fadeIn();
            })

            if ($("#show-form h3.uabb-infobox-title").text() === "HIDE FORM") {
                $("#show-form h3.uabb-infobox-title").fadeOut(function () {
                    $("#show-form h3.uabb-infobox-title").text('MEASURE YOUR SPACE').fadeIn();
                })
            }
        }
    });


    $("#show-form-3").click(function () {
        if ($('#show-form-3').hasClass("clicked-once")) {
            $('#show-hide-3').slideUp(1000);
            $('#show-form-3').removeClass("clicked-once");
            $("#show-form-3 h3.uabb-infobox-title").fadeOut(function () {
                $("#show-form-3 h3.uabb-infobox-title").text(($("#show-form-3 h3.uabb-infobox-title").text() == 'GET STARTED NOW') ? 'HIDE FORM' : 'GET STARTED NOW').fadeIn();
            })
        } else {
            $('#show-form-3').addClass("clicked-once");
            $('#show-form-1').removeClass("clicked-once");
            $('#show-form-2').removeClass("clicked-once");
            $('#show-form-4').removeClass("clicked-once");
            $('#show-form-5').removeClass("clicked-once");

            $('#show-hide-3').slideDown(1000);
            $('#show-hide-1').slideUp(1000);
            $('#show-hide-2').slideUp(1000);
            $('#show-hide-4').slideUp(1000);
            $('#show-hide-5').slideUp(1000);

            $('#gform_wrapper_21819').css('display', 'block');

            $("#show-form-3 h3.uabb-infobox-title").fadeOut(function () {
                $("#show-form-3 h3.uabb-infobox-title").text(($("#show-form-3 h3.uabb-infobox-title").text() == 'HIDE FORM') ? 'GET STARTED NOW' : 'HIDE FORM').fadeIn();
            })
        }

    });

    $("#show-form-4").click(function () {
        if ($('#show-form-4').hasClass("clicked-once")) {
            $('#show-hide-4').slideUp(1000);
            $('#show-form-4').removeClass("clicked-once");
        } else {
            $('#show-form-4').addClass("clicked-once");

            $('#show-form-1').removeClass("clicked-once");
            $('#show-form-2').removeClass("clicked-once");
            $('#show-form-3').removeClass("clicked-once");
            $('#show-form-5').removeClass("clicked-once");

            $('#show-hide-4').slideDown(1000);
            $('#show-hide-1').slideUp(1000);
            $('#show-hide-2').slideUp(1000);
            $('#show-hide-3').slideUp(1000);
            $('#show-hide-5').slideUp(1000);

            $('#gform_wrapper_21819').css('display', 'block');
        }

    });

    $("#show-form-5").click(function () {
        if ($('#show-form-5').hasClass("clicked-once")) {
            $('#show-hide-5').slideUp(1000);
            $('#show-form-5').removeClass("clicked-once");
            $('.custom-design-note').css('display', 'block');
        } else {

            $('#show-form-5').addClass("clicked-once");

            $('#show-form-1').removeClass("clicked-once");
            $('#show-form-2').removeClass("clicked-once");
            $('#show-form-3').removeClass("clicked-once");
            $('#show-form-4').removeClass("clicked-once");

            $('#show-hide-5').slideDown(1000);
            $('.custom-design-note').css('display', 'none');
            $('#show-hide-1').slideUp(1000);
            $('#show-hide-2').slideUp(1000);
            $('#show-hide-3').slideUp(1000);
            $('#show-hide-4').slideUp(1000);

            $('#gform_wrapper_21819').css('display', 'block');
        }
    });

    // new for mobile forms
    $("#show-form-mobile-1").click(function () {
        if ($('#show-form-mobile-1').hasClass("clicked-once")) {
            $('#show-hide-mobile-1').slideUp(1000);
            $('#show-form-mobile-1').removeClass("clicked-once");

        } else {
            $('#show-form-mobile-1').addClass("clicked-once");
            $('#show-form-mobile-2').removeClass("clicked-once");
            $('#show-form-mobile-3').removeClass("clicked-once");
            $('#show-form-mobile-4').removeClass("clicked-once");
            $('#show-form-mobile-5').removeClass("clicked-once");

            $('#show-hide-mobile-1').slideDown(1000);
            $('#show-hide-mobile-2').slideUp(1000);
            $('#show-hide-mobile-3').slideUp(1000);
            $('#show-hide-mobile-4').slideUp(1000);
            $('#show-hide-mobile-5').slideUp(1000);

        }
    });

    $("#show-form-mobile-2").click(function () {
        if ($('#show-form-mobile-2').hasClass("clicked-once")) {
            $('#show-hide-mobile-2').slideUp(1000);
            $('#show-form-mobile-2').removeClass("clicked-once");

        } else {
            $('#show-form-mobile-2').addClass("clicked-once");
            $('#show-form-mobile-1').removeClass("clicked-once");
            $('#show-form-mobile-3').removeClass("clicked-once");
            $('#show-form-mobile-4').removeClass("clicked-once");
            $('#show-form-mobile-5').removeClass("clicked-once");

            $('#show-hide-mobile-2').slideDown(1000);
            $('#show-hide-mobile-1').slideUp(1000);
            $('#show-hide-mobile-3').slideUp(1000);
            $('#show-hide-mobile-4').slideUp(1000);
            $('#show-hide-mobile-5').slideUp(1000);

        }
    });


    $("#show-form-mobile-3").click(function () {
        if ($('#show-form-mobile-3').hasClass("clicked-once")) {
            $('#show-hide-mobile-3').slideUp(1000);
            $('#show-form-mobile-3').removeClass("clicked-once");

        } else {
            $('#show-form-mobile-3').addClass("clicked-once");
            $('#show-form-mobile-1').removeClass("clicked-once");
            $('#show-form-mobile-2').removeClass("clicked-once");
            $('#show-form-mobile-4').removeClass("clicked-once");
            $('#show-form-mobile-5').removeClass("clicked-once");

            $('#show-hide-mobile-3').slideDown(1000);
            $('#show-hide-mobile-1').slideUp(1000);
            $('#show-hide-mobile-2').slideUp(1000);
            $('#show-hide-mobile-4').slideUp(1000);
            $('#show-hide-mobile-5').slideUp(1000);

        }

    });

    $("#show-form-mobile-4").click(function () {
        if ($('#show-form-mobile-4').hasClass("clicked-once")) {
            $('#show-hide-mobile-4').slideUp(1000);
            $('#show-form-mobile-4').removeClass("clicked-once");
        } else {
            $('#show-form-mobile-4').addClass("clicked-once");

            $('#show-form-mobile-1').removeClass("clicked-once");
            $('#show-form-mobile-2').removeClass("clicked-once");
            $('#show-form-mobile-3').removeClass("clicked-once");
            $('#show-form-mobile-5').removeClass("clicked-once");

            $('#show-hide-mobile-4').slideDown(1000);
            $('#show-hide-mobile-1').slideUp(1000);
            $('#show-hide-mobile-2').slideUp(1000);
            $('#show-hide-mobile-3').slideUp(1000);
            $('#show-hide-mobile-5').slideUp(1000);

        }

    });

    $("#show-form-mobile-5").click(function () {
        if ($('#show-form-mobile-5').hasClass("clicked-once")) {
            $('#show-hide-mobile-5').slideUp(1000);
            $('#show-form-mobile-5').removeClass("clicked-once");
        } else {

            $('#show-form-mobile-5').addClass("clicked-once");

            $('#show-form-mobile-1').removeClass("clicked-once");
            $('#show-form-mobile-2').removeClass("clicked-once");
            $('#show-form-mobile-3').removeClass("clicked-once");
            $('#show-form-mobile-4').removeClass("clicked-once");

            $('#show-hide-mobile-5').slideDown(1000);
            $('#show-hide-mobile-1').slideUp(1000);
            $('#show-hide-mobile-2').slideUp(1000);
            $('#show-hide-mobile-3').slideUp(1000);
            $('#show-hide-mobile-4').slideUp(1000);

        }
    });

    $("#numbered-col-show-form-1").click(function () {
        if ($('#numbered-col-show-form-1').hasClass("clicked-once")) {
            $('#numbered-col-show-section-1').slideUp(1000);
            $('#numbered-col-show-form-1').removeClass("clicked-once");
        } else {
            $('#numbered-col-show-form-1').addClass("clicked-once");
            $('#numbered-col-show-form-2').removeClass("clicked-once");
            $('#numbered-col-show-form-3').removeClass("clicked-once");
            $('#numbered-col-show-form-4').removeClass("clicked-once");
            $('#numbered-col-show-form-5').removeClass("clicked-once");

            $('#numbered-col-show-section-1').slideDown(1000);
            $('#numbered-col-show-section-2').slideUp(1000);
            $('#numbered-col-show-section-3').slideUp(1000);
            $('#numbered-col-show-section-4').slideUp(1000);
            $('#numbered-col-show-section-5').slideUp(1000);
        }
    });
});