// Hall of Frames Woocommerce adjustments
jQuery(document).ready(function ($) {
    //Password strength meter and enforcement
    if( $(document.body).hasClass('woocommerce-order-pay') ){
        $( document.body ).on( 'update_checkout', function(){
            verifyPassword();
        });
        $('#terms').on('change', function() {
            verifyPassword();
        });
        $(document).on('input', '.payment_method_authorize_net_cim_credit_card input', function() {
            verifyPassword();
        });
    }
    // Register Password control
    $('body.page-template-register .woocommerce-form-register__submit').prop('disabled',true);
    $('#reg_password').on('input', function() {
	    verifyPassword();
    });
    function verifyPassword(){
        $('#place_order, body.page-template-register .woocommerce-form-register__submit').prop('disabled',true);
        var isValidPassword = false;
        const accountPassword = $('#reg_password').val();	
	    const passwordMinLength = 7;
	    const hasUpperCase = /[A-Z]/.test(accountPassword);
	    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(accountPassword);
        const termsCheck = $('#terms').prop('checked');
        if( accountPassword || accountPassword === ''){ // Cases with password input
            const isLongEnough = accountPassword.length >= passwordMinLength;
            const hasUpperCaseOrSpecial = hasUpperCase || hasSpecialChar;
            $('#length').toggleClass('valid', isLongEnough).toggleClass('invalid', !isLongEnough);
            $('#uppercase-or-special').toggleClass('valid', hasUpperCaseOrSpecial).toggleClass('invalid', !hasUpperCaseOrSpecial);
            if( $(document.body).hasClass('woocommerce-order-pay') ){
                isValidPassword = isLongEnough && hasUpperCaseOrSpecial && termsCheck;
            }
            else{
                isValidPassword = isLongEnough && hasUpperCaseOrSpecial; 
            }
        }
        else{ // Cases with no password input
            isValidPassword = termsCheck;
        }

        if( isValidPassword ){
            $('#place_order,body.page-template-register .woocommerce-form-register__submit').prop('disabled', false);
        }
        else{
            setTimeout( function(){
                $('#place_order').prop('disabled', true);
            }, 400);
            $('body.page-template-register .woocommerce-form-register__submit').prop('disabled', true);
        }
    }

    // Checkout and Pay Order Validation Errors.
    if( $(document.body).hasClass('woocommerce-order-pay') || $(document.body).hasClass('woocommerce-checkout') ){
        const observeCheckoutErrors = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0 || mutation.type === 'childList') {
                    document.querySelectorAll('.woocommerce-error').forEach(errorElement => {
                        if (errorElement.querySelectorAll('li').length > 0) {
                            const blockUIOverlay = document.querySelector('.blockUI.blockOverlay');
                            if(blockUIOverlay){
                                blockUIOverlay.style.display = 'none';
                            }
                            errorElement.classList.add('modal-woocommerce-error');
                            if (!errorElement.querySelector('.modal-woocommerce-error-close')) {
                                const closeButton = document.createElement('button');
                                closeButton.className = 'modal-woocommerce-error-close';
                                closeButton.textContent = 'X';
                                errorElement.prepend(closeButton);
                                closeButton.addEventListener('click', function() {
                                    errorElement.remove();
                                    errorElement.classList.remove('modal-woocommerce-error');
                                });
                            }
                        }
                    });
                }
            });
        });
        
        observeCheckoutErrors.observe(document.body, {
            childList: true,
            subtree: true
        });        
    }
    
    //icons
    $("i.ubermenu-icon.fas.fa-shopping-cart").replaceWith("<i class='ti ti-shopping-cart'>");
    $("i.ubermenu-icon.fas.fa-shopping-cart").replaceWith("<i class='ti-shopping-cart'>");
    $("i.ua-icon-circle-with-plus").replaceWith("<i class='ti-arrow-circle-down'>");
    $("body .gform_wrapper img.ui-datepicker-trigger").replaceWith("<i class='ti-calendar'>");
    $("i.fa.fa-times").replaceWith("<i class='ti-close'>");
    $("i.uabb-close-icon.fas.fa-times").replaceWith("<i class='ti-close'>");
    $("i.fa.fa-map-marker").replaceWith("<i class='ti-location-pin'>");
    $("span.dashicons.dashicons-search").replaceWith("<i class='ti-search'>");

    //add classes to attributes
    $('select#pa_colors-family').parent().addClass('color-family');
    $('.woocommerce div.product form.cart .variations label').prepend("Select ");

    // order received bootstrap class addition and adjustment
    if (window.location.href.indexOf('order-received') > -1) {
        $('.woocommerce-order').addClass('container').css('padding-left', '30px!Important');
    }

    //additional info single products
    $('.addldetails').css('display', 'none');
    $('.details').css('display', 'none');
    $('.invdetails').css('display', 'none');

    $(".single-product #theLink").click(function () {
        $(".details").toggle();
    });
    $(".single-product #addlLink").click(function () {
        $(".addldetails").toggle();
    });
    $(".single-product #inventoryLink").click(function () {
        $(".invdetails").toggle();
    });

    $(".single-product #theLink").append("<i class='ti ti-angle-down'>");
    $(".single-product #addlLink").append("<i class='ti ti-angle-down'>");
    $(".single-product #inventoryLink").append("<i class='ti ti-angle-down'>");

    $("ul.variations").prepend("<p class='variation-labels'>More product options</p>");

    //upload and frame custom size changes
    $('.newupload .wpclv-term.hint--top').each(function (i) {
        $(this).addClass('size-' + (i + 1));
    });
    $('.product-bennet-upload-and-frame-custom-size .entry-summary span.woocommerce-Price-amount.amount').html('Price based on size');
    $('.archive .product_tag-newupload.product-type-external span.woocommerce-Price-amount.amount').html('Price based on size');

    // woo adjustments at checkout
    $('label[for="billing_phone"]').html('Personal Phone <span class="red">*</span>');
    $('#billing_email_field').insertAfter('#work_phone_field');
    $("input#billing_company").on("input", function () {
        $('#work_phone_field').css('display', 'block');
    });
    $('#billing_work_phone').keyup(function () {
        $(this).val($(this).val().replace(/(\d{3})\-?(\d{3})\-?(\d{4})/, '$1-$2-$3'))
    });

    $('#billing_phone').keyup(function () {
        $(this).val($(this).val().replace(/(\d{3})\-?(\d{3})\-?(\d{4})/, '$1-$2-$3'))
    });
    $('.page-sign-up').addClass('woocommerce');

    if (window.location.pathname == '/checkout/') {
        $(".header-main-layout-1 .ast-main-header-bar-alignment").append("<a href='/cart/'><i class='ti-shopping-cart'></i></a>");
        $('p#new_billing_field_field').insertAfter('p#checkbox_trigger_field');
        $(".woocommerce").addClass("col-sm-8 col-12 offset-sm-2 mt-5");
        $(".wpmc-nav-wrapper").addClass("mb-5");
        $('.woocommerce-additional-fields').each(function (i) {
            $(this).addClass('version-' + (i + 1));
        });
        $('.woocommerce-shipping-fields').each(function (i) {
            $(this).addClass('version-' + (i + 1));
        });
    }

    //woo fixes for ask a question button alignment
    if ($('body.single-product').length) {
        if ($(".quantity input").is(":hidden")) {
            $('button.single_add_to_cart_button.btn.btn-primary.alt').css('margin-left', '0');
            $('.btn.btn-primary.question-cart-btn').css('margin-left', '145px').css('top', '-31px!important');

        }
    }

    //if body has term class, change column layout
    if ($("body").hasClass("term-print-and-frame")) {
        $(".col-md-3.col-6.mb-4").removeClass('col-md-3').addClass('col-md-4');
    }

    //if body has publications class, change column layout
    if ($("body").hasClass("term-publications")) {
        $(".col-md-3.col-6.mb-4").removeClass('col-md-3').addClass('col-md-4');
    }

    //if body has mirrors class, change column layout
    if ($("body").hasClass("framed-mirrors")) {
        $(".col-md-3.col-6.mb-4").removeClass('mb-4');
    }

    // if filter button is clicked on mobile, show filter options
    $("#show-hide-filter").click(function () {
        if ($('#show-hide-filter').hasClass("clickt-once")) {
            $('.show-hidden-filter').slideUp(500);
            $('#show-hide-filter').removeClass("clickt-once");
        } else {
            $('#show-hide-filter').addClass("clickt-once");
            $('.show-hidden-filter').slideDown(500);
        }
    });

    // fix bootstrap woo conflict on checkout
    $('#customer_details .col-1').removeClass('col-1').addClass('col-6').css({
        "display": "inline-block",
        "vertical-align": "top"
    });
    $('#customer_details .col-2').removeClass('col-2').addClass('col-5').css('display', 'inline-block');
    $('.woocommerce-MyAccount-content .col-1').removeClass('col-1').addClass('col-12');
    $('.woocommerce-MyAccount-content .col-2').removeClass('col-2').addClass('col-12');
    $('.woocommerce-order-received .col-1').removeClass('col-1').addClass('col-12');
    $('.woocommerce-order-received .col-2').removeClass('col-2').addClass('col-12');
    $('.woocommerce-order-received .woocommerce').addClass('container').addClass('my-4');
});

jQuery(document).ready(function ($) {
    //size and color filters shop homepage
    $("#button-color").click(function () {
        if ($('#button-color').hasClass("clickt-once")) {
            $('#show-color').slideUp(400);
            $('#button-color').removeClass("clickt-once");
        } else {
            $('#button-color').addClass("clickt-once");
            $('#button-size').removeClass("clickt-once");
            $('#show-color').slideDown(400);
            $('#show-size').slideUp(400);

        }
    });
    $("#button-size").click(function () {
        if ($('#button-size').hasClass("clickt-once")) {
            $('#show-size').slideUp(400);
            $('#button-size').removeClass("clickt-once");
        } else {
            $('#button-color').addClass("clickt-once");
            $('#button-color').removeClass("clickt-once");
            $('#show-size').slideDown(400);
            $('#show-color').slideUp(400);

        }
    });

    //show the review tabs on product pages
    $(".reviews-show").click(function () {
        if ($('.reviews-show').hasClass("clickt-once")) {
            $('#reviews').removeClass("clickt-once");
            $('#reviews').slideUp(1000);
        } else {
            $('#reviews').addClass("clickt-once");
            $('#reviews').slideDown(1000);
        }
    });

    //change tooltips on publications products
    $('[aria-label*="Newspaper"]').attr("aria-label", "approximate newspaper page size");
    $('[aria-label*="Magazine"]').attr("aria-label", "approximate magazine page size");
    $('[aria-label*="analog"]').attr("aria-label", "if you have a paper copy of your article");
    $('[aria-label*="digital"]').attr("aria-label", "if you have a pdf of the article");
    $('[aria-label*="website"]').attr("aria-label", "if you have a link to the article and need it styled");

    //add class to related publication products loops to hide extraneous stuff
    $('a.simplefavorite-button.active').parent().addClass('active');

    //add "more" to some attribute options on single products
    $('.single-product .wpclv-attribute.attribute-approximate-size .wpclv-attribute-label').prepend('More').append('<div class="plural">s</div>');
    $('.single-product .wpclv-attribute.attribute-colors-family .wpclv-attribute-label').prepend('More').append('<div class="plural">s</div>');
    $('.single-product .wpclv-attribute.attribute-frame .wpclv-attribute-label').prepend('Choose Your');
    $('.single-product .wpclv-attribute.attribute-size .wpclv-attribute-label').prepend('More').append('<div class="plural">s</div>');
    $('.single-product .wpclv-attribute.attribute-layout .wpclv-attribute-label').prepend('Choose Your');

    //add "more" to some attribute options on taxonomy pages	
    $('.tax-product_cat .wpclv-attribute-label').prepend('More').append('<div class="plural">s</div>');

    if (window.location.href.indexOf("#tab-reviews") > -1) {
        $('#reviews').css('display', 'block');
    }

    //change tooltips on publications products
    $('[aria-label*="Newspaper"]').attr("aria-label", "approximate newspaper page size");
    $('[aria-label*="Magazine"]').attr("aria-label", "approximate magazine page size");
    $('[aria-label*="analog"]').attr("aria-label", "if you have a paper copy of your article");
    $('[aria-label*="digital"]').attr("aria-label", "if you have a pdf of the article");
    $('[aria-label*="website"]').attr("aria-label", "if you have a link to the article and need it styled");

    //add class to related publication products loops to hide extraneous stuff
    $('a.simplefavorite-button.active').parent().addClass('active');

    //disable add to cart button on magazine and newspaper items until customer agrees to terms
    $('#check').change(function () {
        $('.single_add_to_cart_button').prop("disabled", !this.checked);
        if ($(this).is(":checked")) {
            $('.product_cat_magazine-article .single_add_to_cart_button').removeClass("hint--top").removeAttr("aria-label", "Please read and check the box above to continue");
            $('.product_cat_newspaper-article .single_add_to_cart_button').removeClass("hint--top").removeAttr("aria-label", "Please read and check the box above to continue");
        } else {
            $('.product_cat_magazine-article .single_add_to_cart_button').addClass("hint--top").attr("aria-label", "Please read and check the box above to continue");
            $('.product_cat-newspaper-article .single_add_to_cart_button').addClass("hint--top").attr("aria-label", "Please read and check the box above to continue");
        }
    }).change()

    // cart: call a total what it is, a subtotal, and estimated tax an estimate
    //change labels in cart
    $(".woocommerce-cart tr.order-total th").replaceWith("<div class='subtotal'>Subtotal<div>");
    $(".woocommerce-cart tr.cart-subtotal th").replaceWith("<div class='subtotal'>Items total<div>");
    $(".woocommerce-cart tr.tax-total th").replaceWith("<div class='estimated'>Estimated Tax</div>")
    $(".woocommerce-cart tr.fee th").replaceWith("<div class='estimated'>Estimated Tax</div>")

    //checkout modifications
    if ($(".page-checkout").length > 0) {
        $('button#wpmc-skip-login').html('I am a new customer');
    }
    $('#checkbox_trigger_field').insertBefore('#order_comments_field');
    $('#new_billing_field_field').insertAfter('#checkbox_trigger_field');

    // add disclaimer to billing field section
    if ($('body.woocommerce-checkout').length) {
        $('.woocommerce-billing-fields h3').append('<p class="billing-details">Billing name and address must match your credit card information.</p>');
    }
    //edit customer profile screen to show orders at the top
    $('table.form-table.customer-order-history').insertBefore('#your-profile');
});