jQuery(document).ready(function ($) {
    // display the sign up modal after 5 seconds
    var popupTimer = new Timer();
    var popupTime = 5; // 5sec
    var api = $('#mobile').data('mmenu');

    popupTimer.start(popupTime).on('end', function () {
        $('#hof-modal:not(.thank-you-modal)').modal({
            show: true
        });
    });

    $('.thank-you-modal').modal({
        show: true
    });

    $('#hof-thank-you-modal, #hof-thank-you-modal .close').click(function () {
        $('#hof-thank-you-modal').modal('hide');
    });

    //pause modal if the mobile menu is opened
    $(".mmenu-btn").click(function () {
        if ($('nav#mobile').hasClass('mm-menu_opened')) {
            popupTimer.pause();
            console.log("The modal has been paused");
            $('.mmenu-btn').addClass("clickt-once");
            $("#sticky-note").css('visibility', 'visible');
            $("#sticky-note").css('display', 'block');
        }
    });

    //if visitor arrives from paradise, show message, pause modal
    var ref = document.referrer;
    if (ref.match(/^https?:\/\/([^\/]+\.)?paradisepictureframe\.com(\/|$)/i)) {
        popupTimer.pause();
        console.log('arrived from paradise and paused email modal');

        $('#paradise').modal('show');
        setTimeout(function () {
            $('#paradise').modal('hide');
        }, 8000);

        $("#sticky-note").css('visibility', 'visible');
        $("#sticky-note").css('display', 'block');

    }

    //sign up modal 
    $('#hof-modal').on('hidden.bs.modal', function () {
        $("#sticky-note").css('visibility', 'visible');
        $("#sticky-note").css('display', 'block');
    });

    $("#sticky-note a.close").click(function () {
        $("#sticky-note").css('visibility', 'none');
        $("#sticky-note").css('display', 'none');
    });
    $("#sticky-note a.click-pop").click(function () {
        $("#sticky-note").css('visibility', 'none');
        $("#sticky-note").css('display', 'none');

    });

    $("a.mmenu-btn").click(function () {
        $('#hof-modal').modal('hide');
    });

    //wrap return and replacement requests form block
    $('#gform_wrapper_21744').addClass('container');

    //default wordpress search button functionality
    $(".search-btn-1").click(function () {
        if ($('.search-btn-1').hasClass("clickt-once")) {
            $('input#search-btn').hide("slide", {
                direction: "right"
            }, 2000);
            $('.search-btn-1').removeClass("clickt-once");
        } else {
            $('.search-btn-1').addClass("clickt-once");
            $('input#search-btn').show("slide", {
                direction: "left"
            }, 2000);
        }
    });

    $(".search-btn-2").click(function () {
        if ($('.search-btn-2').hasClass("clickt-once")) {
            $('input#s2').hide("slide", {
                direction: "right"
            }, 2000);
            $('.search-btn-2').removeClass("clickt-once");
        } else {
            $('.search-btn-2').addClass("clickt-once");
            $('input#s2').show("slide", {
                direction: "left"
            }, 2000);
        }
    });

    $(window).on('load', function () {
        //add all the super cool isotope stuff to search results
        function gridMasonry() {
            var grid = $(".grid")
            if (grid.length) {

                grid.isotope({
                    itemSelector: '.grid-item',

                    layoutMode: 'fitRows',
                });

            }
        }
    });


    //wrap gravity form with bootstrap container
    if ($("body").hasClass("gutenberg")) {
        $('.gf_browser_chrome.gform_wrapper.gravity-theme.gform-theme--no-framework').addClass('container my-5');
    }

    // formatting search results page
    if (window.location.href.indexOf("?s=") > -1) {
        //find matches for post types on search results page and show corresponding buttons
        if (document.getElementById('results-grid').getElementsByClassName('product-result')[0]) {} else {
            $("#product-sort").css('display', 'none');
        }

        if (document.getElementById('results-grid').getElementsByClassName('page-result')[0]) {} else {
            $("#page-sort").css('display', 'none');
        }

        if (document.getElementById('results-grid').getElementsByClassName('post-result')[0]) {} else {
            $("#post-sort").css('display', 'none');
        }
    }

    //fade modal on form submit
    $(document).bind('gform_confirmation_loaded', function (event, form_id) {
        $('.modal-open .modal').delay(5000).fadeOut(600);
        setTimeout(function () {
            $('.modal-open .modal').modal("hide");
        }, 5000);

    });

    //if is password protect form page, add bootstrap container
    if ($(".post-password-form").length > 0) {
        $(".post-password-form").addClass("container");
        $("p:last-of-type").append("</div>");
        $("input[type='submit']").addClass("btn");
    }

    // Print image button for coupons
    $.fn.copyToClipboard = function () {
        // Loop through each element in the jQuery collection
        return this.each(function () {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val($(this).text()).select();
            document.execCommand("copy");
            $temp.remove();
        });
    };

    // modal fix 
    $('.modal-body .gform_wrapper.gravity-theme.gform-theme--no-framework.container.my-5').removeClass('my-5');


    // Fix any mixed content
    $("img").each(function () {
        var src = $(this).attr("src");
        if (src && src.startsWith("http://")) {
            $(this).attr("src", src.replace("http://", "https://"));
        }
    });

    // Prepend and append share buttons and date blog
    $('ul.list-inline').insertAfter('.single .entry-meta');
    $('div.date').insertAfter('.single .entry-meta');
    $('ul.list-inline-2').insertBefore('.rp4wp-related-posts');

    // Archive & Blog pages number selectors and switch order
    $('.archive .entry-title, .blog .entry-title').each(function (i) {
        $(this).addClass('title-' + (i + 1));
    });
    $('.archive .entry-meta, .blog .entry-meta').each(function (i) {
        $(this).addClass('meta-' + (i + 1));
    });

    for (var i = 1; i <= 30; i++) {
        $('.title-' + i).insertAfter(".meta-" + i);
    }

    // Replace mobile icons
    var iconReplacements = {
        "i.fa.fa-bars": "<i class='ti-align-justify'></i>",
        "i.fa.fa-search": "<i class='ti-search'></i>",
        "i.ua-icon-circle-with-plus": "<i class='ti-arrow-circle-down'></i>",
        "body .gform_wrapper img.ui-datepicker-trigger": "<i class='ti-calendar'></i>",
        "i.fa.fa-times, i.uabb-close-icon.fas.fa-times": "<i class='ti-close'></i>",
        "i.fa.fa-map-marker": "<i class='ti-location-pin'></i>"
    };

    $.each(iconReplacements, function (selector, replacement) {
        $(selector).replaceWith(replacement);
    });

    // new store locator changes
    $("#wpsl-search-input").attr("placeholder", "Enter your city or zipcode");
    $('#wpsl-search-wrap').insertAfter(".opening-spiel");
    $("#wpsl-search-btn").click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#magic-anchor").offset().top
        }, 750);
    });

    //override disable button on cc error woo
    if ($('.woocommerce-checkout').length > 0) {
        $(document).on('change keyup', 'input', function () {
            $('#place_order').attr('disabled', false);
        })
    }

    // autofill woocommerce stars
    $(document).ready(function () {
        $('.stars').addClass('selected');
        $('.star-5').addClass('active');
    })

    // Disable coupon links on coupon category pages
    $(".tax-on-sale .post-thumb-img-content.post-thumb a").removeAttr("href");


    // Filter cards for card-columns
    $(".filter-button").click(function () {
        var value = $(this).attr('data-filter');
        if (value == "all") {
            $('.filter').removeClass('hidden').show('1000');
        } else {
            $('.filter[filter-item="' + value + '"]').removeClass('hidden');
            $(".filter").not('.filter[filter-item="' + value + '"]').addClass('hidden').hide('3000');
            $('.filter').filter('.' + value).show('3000');
        }
    });

    // Isotope for gallery
    var $grid = $('#isotope .grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-sizer'
        }
    });

    $grid.imagesLoaded(function () {
        $grid.isotope('layout');
    });

    $('.filter-button-group').on('click', 'li', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
            filter: filterValue
        });
        $('.filter-button-group li').removeClass('active');
        $(this).addClass('active');
    });

    $('.popup-link').magnificPopup({
        type: 'image'
    });

    // create tooltips on engrqaved plate add-on options
    $('.pewc-radio-image-wrapper.pewc-radio-checkbox-image-wrapper').addClass('hint--top');
    $('.engraved-plate-3x1 .pewc-item-field-wrapper label').attr('value', function () {
        return $(this).children('input').attr('value');
    });
    $('.engraved-plate-3x1 .pewc-radio-image-wrapper.pewc-radio-checkbox-image-wrapper').attr('aria-label', function () {
        return $(this).children('label').attr('value');

    });

    //upload and frame custom size changes
    $('.newupload .wpclv-term.hint--top').each(function (i) {
        $(this).addClass('size-' + (i + 1));
    });
    $('.product-bennet-upload-and-frame-custom-size .entry-summary span.woocommerce-Price-amount.amount').html('Price based on size');
    $('.archive .product_tag-newupload.product-type-external span.woocommerce-Price-amount.amount').html('Price based on size');

    //new framed mirror code 
    if ($('body.frame-sample').length) {
        var $carousel = $('.carousel').flickity({
            prevNextButtons: false,

            pageDots: true
        });
        // Flickity instance
        var flkty = $carousel.data('flickity');
        // elements
        var $cellButtonGroup = $('.button-group--cells');
        var $cellButtons = $cellButtonGroup.find('.button');

        // update selected cellButtons
        $carousel.on('select.flickity', function () {
            $cellButtons.filter('.is-selected')
                .removeClass('is-selected');
            $cellButtons.eq(flkty.selectedIndex)
                .addClass('is-selected');
        });

        // select cell on button click
        $cellButtonGroup.on('click', '.button', function () {
            var index = $(this).index();
            $carousel.flickity('select', index);
        });
        // previous
        $('.button--previous').on('click', function () {
            $carousel.flickity('previous');
        });
        // next
        $('.button--next').on('click', function () {
            $carousel.flickity('next');
        });
    }

    //manage colors on linked products & sizes
    //if the url contains the word diploma 
    if (window.location.href.indexOf("diploma") > -1) {

        $("[aria-label='Gold']").css('display', 'none');
        $("[aria-label='Silver']").css('display', 'none');

        //if the url is one of the 8.5x11s
        if (window.location.href.indexOf("8-5x11") > -1) {

            //show elements that have the aria-label set as 'Gold' or 'Silver'
            $("[aria-label='Gold']").css('display', 'block');
            $("[aria-label='Silver']").css('display', 'block');

        }
    }

});
