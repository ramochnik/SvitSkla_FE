(function($) {

	$( document ).ready( function() {

		var reset_fields = [];

		var pewc_conditions = {

			init: function() {

				this.initial_check();
				$( '.pewc-condition-trigger input' ).on( 'change input keyup paste', this.trigger_condition_check );
				$( 'body' ).on( 'change', '.pewc-condition-trigger select', this.trigger_condition_check );
				$( '.pewc-calculation-trigger input' ).on( 'change input keyup paste', this.trigger_calculation );

				$( document ).on( 'ptuwc_opened_config_row', function ( event, instance, active_row ) {
					pewc_conditions.initial_check();
				});

				if( pewc_vars.conditions_timer > 0 ) {
					$( '.pewc-field-triggers-condition' ).on( 'pewc_update_select_box', this.trigger_field_condition_check );
					$( '.pewc-field-triggers-condition input' ).on( 'change input keyup paste', this.trigger_field_condition_check );
					$( '.pewc-field-triggers-condition select' ).on( 'update change', this.trigger_field_condition_check );
					$( '.pewc-field-triggers-condition .pewc-calculation-value' ).on( 'calculation_field_updated', this.trigger_field_condition_check );
					// $( 'body' ).on( 'pewc_update_select_box', this.trigger_field_condition_check );
					$( 'form.cart .qty' ).on( 'change input keyup paste', this.trigger_quantity_condition_check );
					$( 'body' ).on( 'pewc_reset_field_condition', this.trigger_field_reset_condition_check );

					// since 3.11.9
					$( 'body' ).on( 'show_variation', this.trigger_attribute_condition_check );
					$( 'body' ).on( 'hide_variation', this.trigger_attribute_condition_check );

					// 3.20.1
					$( 'body' ).on( 'pewc_reset_fields', this.reset_fields );

					if( typeof pewc_cost_triggers !== 'undefined' && pewc_cost_triggers.length > 0 ) {
						var cost_interval = setInterval(
							this.trigger_cost_condition_check,
							pewc_vars.conditions_timer
						);
					}
				}

			},

			initial_check: function() {

				// Check the fields
				if( pewc_vars.conditions_timer > 0 ) {

					$( '.pewc-field-triggers-condition' ).each( function() {

						var field = $( this ).closest( '.pewc-item' );
						var parent = pewc_conditions.get_field_parent( field );
						var field_value = pewc_conditions.get_field_value( $( field ).attr( 'data-field-id' ), $( field ).attr( 'data-field-type' ), parent );
						var triggers_for = JSON.parse( $( field ).attr( 'data-triggers-for' ) );

						// Iterate through each field that is conditional on the updated field
						for( var g in triggers_for ) {
							conditions_obtain = pewc_conditions.check_field_conditions( triggers_for[g], field_value, parent );
							var action = $( '.pewc-field-' + triggers_for[g] ).attr( 'data-field-conditions-action' );
							pewc_conditions.assign_field_classes( conditions_obtain, action, triggers_for[g], parent );
						}

					});

				}

				// Check the groups
				$( '.pewc-condition-trigger' ).each( function() {
					var field = $( this );
					var groups = JSON.parse( $( field ).attr( 'data-trigger-groups' ) );
					for( var g in groups ) {
						conditions_obtain = pewc_conditions.check_group_conditions( groups[g] );
						var action = $( '#pewc-group-' + groups[g] ).attr( 'data-condition-action' );
						pewc_conditions.assign_group_classes( conditions_obtain, action, groups[g] );
					}
				});

				// 3.11.9, check all groups and fields using attributes on conditions
				pewc_conditions.trigger_attribute_condition_check();

			},

			trigger_calculation: function() {

				// Possibly add a delay here to ensure calculations are made
				var calculations = $( this ).closest( '.pewc-item' ).attr( 'data-trigger-calculations' );
				if( calculations ) {
					calculations = JSON.parse( calculations );
					for( var c in calculations ) {
						$( '.pewc-field-' + calculations[c] ).find( '.pewc-calculation-value' ).trigger( 'change' );
					}
				}

			},

			trigger_condition_check: function() {

				var field = $( this ).closest( '.pewc-item' );
				var groups = JSON.parse( $( field ).attr( 'data-trigger-groups' ) );
				pewc_conditions.trigger_group_conditions( groups );

				if( pewc_vars.reset_fields == 'yes' ) {
					pewc_conditions.reset_fields();
				}

			},

			trigger_group_conditions: function( groups ) {
				for( var g in groups ) {
					conditions_obtain = pewc_conditions.check_group_conditions( groups[g] );
					var action = $( '#pewc-group-' + groups[g] ).attr( 'data-condition-action' );
					pewc_conditions.assign_group_classes( conditions_obtain, action, groups[g] );
				}
				// let's do this if we need to toggle other groups or fields that are dependent on a field inside a toggled group
				$( 'body' ).trigger( 'pewc_reset_field_condition' );
			},

			get_field_parent: function( field ) {

				var parent = $( field ).closest( '.product' );
						if( $( parent ).length < 1 ) {
							parent = $( field ).closest( '.ptuwc-product-config-row' );
						}

				return parent;

			},

			get_field_group_id: function( field ) {

				var group_id = $( field ).closest( '.pewc-group-wrap' ).attr( 'data-group-id' );
				return group_id;

			},

			trigger_field_condition_check: function() {

				var field = $( this ).closest( '.pewc-item' );
				var parent = pewc_conditions.get_field_parent( field );

				var field_value = pewc_conditions.get_field_value( $( field ).attr( 'data-field-id' ), $( field ).attr( 'data-field-type' ), parent );
				var triggers_for = JSON.parse( $( field ).attr( 'data-triggers-for' ) );

				// Iterate through each field that is conditional on the updated field
				for( var g in triggers_for ) {
					conditions_obtain = pewc_conditions.check_field_conditions( triggers_for[g], field_value, parent );
					var group = $( '.pewc-field-' + triggers_for[g] ).closest( '.pewc-group-wrap' );
					var action = $( '.pewc-field-' + triggers_for[g] ).attr( 'data-field-conditions-action' );
					// if( $( group ).hasClass( 'pewc-group-hidden' ) ) {
					// 	// Ensure that any fields in a hidden group trigger their conditions
					// 	conditions_obtain = false;
					// 	action = 'show';
					// }
					pewc_conditions.assign_field_classes( conditions_obtain, action, triggers_for[g], parent );
				}

				if( pewc_vars.reset_fields == 'yes' ) {
					pewc_conditions.reset_fields();
				}

			},

			// Iterate through fields that have had their values reset
			// Ensures fields with dependent conditions will also get reset correctly
			trigger_field_reset_condition_check: function() {

				// Use a timer to allow complex pages to catch up
				var reset_timer = setTimeout(
					function() {
						$( '.pewc-reset' ).each( function() {
							$( this ).removeClass( 'pewc-reset' );
							var field = $( this );
							var parent = pewc_conditions.get_field_parent( field );
							var field_value = pewc_conditions.get_field_value( $( field ).attr( 'data-field-id' ), $( field ).attr( 'data-field-type' ), parent );
							var triggers_for = $( field ).attr( 'data-triggers-for' );
							if( triggers_for != undefined ) {

								var triggers_for = JSON.parse( $( field ).attr( 'data-triggers-for' ) );
								// Iterate through each field that is conditional on the updated field
								for( var g in triggers_for ) {
									conditions_obtain = pewc_conditions.check_field_conditions( triggers_for[g], field_value, parent );
									var action = $( '.pewc-field-' + triggers_for[g] ).attr( 'data-field-conditions-action' );
									pewc_conditions.assign_field_classes( conditions_obtain, action, triggers_for[g], parent );
								}
							}

						});
					}, 100
				);

			},

			trigger_quantity_condition_check: function() {

				if( typeof pewc_quantity_triggers === 'undefined' ) {
					return;
				}

				var triggers_for = pewc_quantity_triggers;
				// Iterate through each field that is conditional on the updated field
				for( var g in triggers_for ) {
					var parent = pewc_conditions.get_field_parent( $( '.pewc-field-'+triggers_for[g] ) );
					conditions_obtain = pewc_conditions.check_field_conditions( triggers_for[g], $( 'form.cart .quantity input.qty' ).val(), parent );
					var action = $( '.pewc-field-' + triggers_for[g] ).attr( 'data-field-conditions-action' );
					pewc_conditions.assign_field_classes( conditions_obtain, action, triggers_for[g], parent );
				}

			},

			trigger_cost_condition_check: function() {

				var triggers_for = pewc_cost_triggers;
				// Iterate through each field that is conditional on the updated field
				for( var g in triggers_for ) {
					conditions_obtain = pewc_conditions.check_field_conditions( triggers_for[g] );
					var action = $( '.pewc-field-' + triggers_for[g] ).attr( 'data-field-conditions-action' );
					pewc_conditions.assign_field_classes( conditions_obtain, action, triggers_for[g] );
				}

			},

			check_group_conditions: function( group_id ) {

				var conditions = JSON.parse( $( '#pewc-group-' + group_id ).attr( 'data-conditions' ) );
				var match = $( '#pewc-group-' + group_id ).attr( 'data-condition-match' );
				var is_visible = false;
				if( match == 'all' ) {
					is_visible = true;
				}
				for( var i in conditions ) {
					var condition = conditions[i];
					if( ! condition.field_type ) {
						condition.field_type = $( '.' + condition.field ).attr( 'data-field-type' );
					}

					var field = $( '.pewc-field-' + $( '.' + condition.field ).attr( 'data-field-id' ) );
					var parent = pewc_conditions.get_field_parent( field );
					var value = pewc_conditions.get_field_value( $( '.' + condition.field ).attr( 'data-field-id' ), condition.field_type, parent );
					if ( condition.field.substring(0, 3) == 'pa_' ) {
						value = $( '#'+condition.field ).val();
					}
					var meets_condition = this.field_meets_condition( value, condition.rule, condition.value );
					if( meets_condition && match =='any' ) {
						return true;
					} else if( ! meets_condition && match =='all' ) {
						return false;
					}
				}

				return is_visible;

			},

			check_field_conditions: function( field_id, field_value, parent ) {

				var field = $( parent ).find( '.pewc-field-' + field_id );
				if( $( field ).length < 1 ) {
					return false;
				}

				var conditions = JSON.parse( $( field ).attr( 'data-field-conditions' ) );
				var match = $( field ).attr( 'data-field-conditions-match' );
				var is_visible = false;
				if( match == 'all' ) {
					is_visible = true;
				}
				for( var i in conditions ) {
					var condition = conditions[i];
					if ( condition.field == 'quantity' ) {
						var field_value = $( 'form.cart .quantity input.qty' ).val();
					} else if ( condition.field.substring(0, 3) == 'pa_' ){
						var field_value = $( '#'+condition.field ).val();
					} else {
						var field_value = this.get_field_value( $( '.' + condition.field ).attr( 'data-field-id' ), condition.field_type, parent );
					}
					var meets_condition = this.field_meets_condition( field_value, condition.rule, condition.value );
					if( meets_condition && match == 'any' ) {
						return true;
					} else if( ! meets_condition && match =='all' ) {
						return false;
					}
				}

				return is_visible;

			},

			// Get the value of the specified field
			get_field_value: function( field_id, field_type, parent ) {

				if( typeof field_id == 'undefined' ) {
					return;
				}

				// var field_wrapper = $( '.' + field_id.replace( 'field', 'group' ) );
				var input_fields = ['text','number','advanced-preview'];

				var field = $( parent ).find( '.pewc-field-' + field_id );

				// since 3.11.5
				if ( field.hasClass( 'pewc-hidden-field') || field.closest( '.pewc-group-wrap' ).hasClass( 'pewc-group-hidden' ) ) {
					if ( ! field.hasClass( 'pewc-reset-me' ) ) {
						field.addClass( 'pewc-reset-me' ); // so that we can reset
					}
					return ''; // field is hidden so return a blank value
				}

				if( input_fields.includes( field_type ) ) {
					return $( field ).find( 'input' ).val();
				} else if( field_type == 'select' || field_type == 'select-box' ) {
					return $( field ).find( 'select' ).val();
				} else if( field_type == 'checkbox_group' ) {
					var field_value = [];
					$( field ).find( 'input:checked' ).each( function() {
						field_value.push( $( this ).val() );
					});
					return field_value;
				} else if( field_type == 'products' || field_type == 'product-categories' ) {
					var field_value = [];
					if ( field.hasClass( 'pewc-item-products-select' ) ) {
						return $( field ).find( 'select' ).val();
					}
					else {
						$( field ).find( 'input:checked' ).each( function() {
							field_value.push( Number( $( this ).val() ) );
						});
					}
					return field_value;
				} else if( field_type == 'image_swatch' ) {
					if( $( field ).hasClass( 'pewc-item-image-swatch-checkbox' ) ) {
						// Array
						var field_value = [];
						$( field ).find( 'input:checked' ).each( function() {
							field_value.push( $( this ).val() );
						});
						return field_value;
					} else {
						return $( field ).find( 'input:radio:checked' ).val();
					}
				} else if( field_type == 'checkbox' ) {
					if( $( field ).find( 'input' ).prop( 'checked' ) ) {
						return '__checked__';
					}
					return false;
				} else if( field_type == 'radio' ) {
					return $( field ).find( 'input:radio:checked' ).val();
				} else if( field_type == 'quantity' ) {
					return $( 'form.cart .quantity input.qty' ).val();
				} else if( field_type == 'cost' ) {
					return $( '#pewc_total_calc_price' ).val();
				} else if( field_type == 'upload' ) {
					return $( field ).find( '.pewc-number-uploads' ).val();
				} else if( field_type == 'calculation' ) {
					return $( field ).find( '.pewc-calculation-value' ).val();
				}

			},

			field_meets_condition: function( value, rule, required_value ) {

				if (value == undefined ) {
					return false;
				} else if( rule == 'is') {
					return value == required_value;
				} else if( rule == 'is-not' ) {
					return value != required_value;
				} else if( rule == 'contains' ) {
					if ( typeof required_value === 'string' && required_value.indexOf( ',' ) !== -1 ) {
						// 3.13.7, comma-separated product categories IDs
						return this.csv_required_value_in_field_value( value, required_value );
					} else {
						// sometimes value is an array of numbers (e.g. product IDs) so we have to parse required_value first
						return value.includes( required_value ) || value.includes( parseFloat( required_value ) );
					}
				} else if( rule == 'does-not-contain' ) {
					if ( typeof required_value === 'string' && required_value.indexOf( ',' ) !== -1 ) {
						// 3.13.7, comma-separated product categories IDs
						return ! this.csv_required_value_in_field_value( value, required_value );
					} else {
						return ! value.includes( required_value ) && ! value.includes( parseFloat( required_value ) );
					}
				} else if ( rule == 'cost-equals' ) {
					return parseFloat(value) == parseFloat(required_value);
				} else if( rule == 'greater-than' || rule == 'cost-greater' ) {
					return parseFloat(value) > parseFloat(required_value);
				} else if( rule == 'greater-than-equals' ) {
					return parseFloat(value) >= parseFloat(required_value);
				} else if( rule == 'less-than' || rule == 'cost-less' ) {
					return parseFloat(value) < parseFloat(required_value);
				} else if( rule == 'less-than-equals' ) {
					return parseFloat(value) <= parseFloat(required_value);
				}

			},

			// 3.13.7
			csv_required_value_in_field_value: function( field_value, required_value ) {
				var required_values = required_value.split( ',' );
				for ( var i in required_values ) {
					if ( ! field_value.includes( required_values[i] ) && ! field_value.includes( parseFloat( required_values[i] ) ) ) {
						return false;
					}
				}
				return true;
			},

			assign_group_classes: function( conditions_obtain, action, group_id ) {

				if( conditions_obtain ) {
					if( action == 'show' ) {
						$( '#pewc-group-' + group_id ).removeClass( 'pewc-group-hidden' );
						$( '#pewc-tab-' + group_id ).removeClass( 'pewc-group-hidden' );
						$( '#pewc-group-' + group_id ).removeClass( 'pewc-reset-group' );
						$( '#pewc-tab-' + group_id ).removeClass( 'pewc-reset-group' );
					} else {
						$( '#pewc-group-' + group_id ).addClass( 'pewc-group-hidden pewc-reset-group' );
						$( '#pewc-tab-' + group_id ).addClass( 'pewc-group-hidden pewc-reset-group' );
					}
				} else {
					if( action == 'show' ) {
						$( '#pewc-group-' + group_id ).addClass( 'pewc-group-hidden pewc-reset-group' );
						$( '#pewc-tab-' + group_id ).addClass( 'pewc-group-hidden pewc-reset-group' );

						// $( '#pewc-group-' + group_id ).find( '.pewc-field-triggers-condition' ).each( function() {
							// Check each field in this group, in case of conditions on the fields
							// $( this ).find( 'input' ).trigger( 'change' );
							// pewc_conditions.trigger_field_condition_check_by_id( $( this ).attr( 'data-field-id' ) );
						// });
					} else {
						$( '#pewc-group-' + group_id ).removeClass( 'pewc-group-hidden' );
						$( '#pewc-tab-' + group_id ).removeClass( 'pewc-group-hidden' );
						$( '#pewc-group-' + group_id ).removeClass( 'pewc-reset-group' );
						$( '#pewc-tab-' + group_id ).removeClass( 'pewc-reset-group' );
					}
				}

				// moved here since 3.11.5. Let's always trigger this because sometimes another field is dependent on a just-hidden field
				pewc_conditions.trigger_fields_within_hidden_groups( group_id );
				// also moved here since 3.11.5 because the replace main image function for image swatch depends on this
				$( 'body' ).trigger( 'pewc_group_visibility_updated', [ group_id, action ] );
				$( 'body' ).trigger('pewc_force_update_total_js'); // added in 3.11.9

				// Iterate through each field in the group to check for layered swatches
				$( '#pewc-group-' + group_id ).find( '.pewc-item' ).each( function( layer_index, element ) {
					pewc_conditions.hide_layered_images( $( this ), $( this ).attr( 'data-field-id' ) );
				});

			},

			trigger_fields_within_hidden_groups: function( group_id ) {

				$( '#pewc-group-' + group_id ).find( '.pewc-field-triggers-condition' ).each( function() {
					// Check each field in this group, in case of conditions on the fields
					var field = $( '.pewc-field-' + $( this ).attr( 'data-field-id' ) );
					var parent = pewc_conditions.get_field_parent( field );
					var field_value = pewc_conditions.get_field_value( $( field ).attr( 'data-field-id' ), $( field ).attr( 'data-field-type' ), parent );
					var triggers_for = JSON.parse( $( field ).attr( 'data-triggers-for' ) );

					// Iterate through each field that is conditional on the updated field
					for( var g in triggers_for ) {
						conditions_obtain = pewc_conditions.check_field_conditions( triggers_for[g], field_value, parent );
						var group = $( '.pewc-field-' + triggers_for[g] ).closest( '.pewc-group-wrap' );
						var action = $( '.pewc-field-' + triggers_for[g] ).attr( 'data-field-conditions-action' );
						// if( $( group ).hasClass( 'pewc-group-hidden' ) ) {
						// 	// Ensure that any fields in a hidden group trigger their conditions
						// 	conditions_obtain = false;
						// 	action = 'show';
						// }
						pewc_conditions.assign_field_classes( conditions_obtain, action, triggers_for[g], parent );
					}

				});

				if( pewc_vars.reset_fields == 'yes' ) {
					// pewc_conditions.reset_fields();
				}

			},

			assign_field_classes: function( conditions_obtain, action, field_id, parent ) {

				var field = $( parent ).find( '.pewc-field-' + field_id );
				$( 'body' ).trigger( 'pewc_field_visibility_updated', [ field.attr('data-id'), action ] );

				if( conditions_obtain ) {
					if( action == 'show' ) {
						$( field ).removeClass( 'pewc-hidden-field' );
						$( parent ).removeClass( 'pewc-hidden-field-' + $( '.pewc-field-' + field_id ).attr( 'data-field-id' ) );
					} else {
						if( ! $( '.pewc-field-' + field_id ).hasClass( 'pewc-hidden-field' ) ) {
							$( field ).addClass( 'pewc-hidden-field pewc-reset-me' );
							$( parent ).addClass( 'pewc-hidden-field-' + $( '.pewc-field-' + field_id ).attr( 'data-field-id' ) );
						}
					}
				} else {
					if( action == 'show' ) {
						if( $( field).hasClass( 'pewc-item-advanced-preview' ) ) {
							$( parent ).addClass( 'pewc-hidden-field-' + $( '.pewc-field-' + field_id ).attr( 'data-field-id' ) );
						}
						if( ! $( field).hasClass( 'pewc-hidden-field' ) ) {
							$( field ).addClass( 'pewc-hidden-field pewc-reset-me' );
						}
					} else {
						$( field).removeClass( 'pewc-hidden-field' );
						$( parent ).removeClass( 'pewc-hidden-field-' + $( '.pewc-field-' + field_id ).attr( 'data-field-id' ) );
					}
				}

				// Hide layered images
				if( $( field ).hasClass( 'pewc-layered-image' ) ) {
					pewc_conditions.hide_layered_images( field, field_id );
				}

			},

			hide_layered_images: function( field, field_id ) {

				var group_id = pewc_conditions.get_field_group_id( field );
				var is_field_hidden = $( field ).hasClass( 'pewc-hidden-field' );
				var is_group_hidden = $( '.pewc-group-wrap-' + group_id ).hasClass( 'pewc-group-hidden' );

				if( is_field_hidden || is_group_hidden ) {
					// Hide the layer too
					$( '.pewc-layer-' + field_id ).fadeOut( 150 );
				} else {
					$( '.pewc-layer-' + field_id ).fadeIn( 150 );
				}

			},

			reset_fields: function() {

				if( $( '.pewc-reset-me' ).length < 1 && $( '.pewc-reset-group' ).length < 1 ) {
					return;
				}

				$( '.pewc-reset-me' ).each( function() {

					var field = $( this );
					pewc_conditions.reset_field_value( field );
					$( field ).removeClass( 'pewc-reset-me' ).addClass( 'pewc-reset' );

				});

				$( '.pewc-reset-group' ).each( function() {

					$( this ).find( '.pewc-item' ).each( function() {

						var field = $( this );
						pewc_conditions.reset_field_value( field );

					});

				});

			},

			reset_field_value: function( field ) {

				// Iterate through all fields with pewc-reset-me class
				var inputs = ['date', 'name_price', 'number', 'text', 'textarea', 'advanced-preview'];
				var checks = ['checkbox', 'checkbox_group', 'radio'];
				var field_type = $( field ).attr( 'data-field-type' );
				var default_value = $( field ).attr( 'data-default-value' );
				$( field ).attr( 'data-field-value', default_value );

				if( inputs.includes( field_type ) ) {
					// 3.21.1, the trigger is needed by Text Preview, but could cause an infinite loop, so we check if the default value has already been added
					if ( ( default_value || default_value == '' ) && $( field ).find( '.pewc-form-field' ).val() != default_value ) {
						$( field ).find( '.pewc-form-field' ).val( default_value ).trigger( 'change' );
					}
				} else if( field_type == 'image_swatch' ) {
					// 3.17.2 version, removes the swatch from the main image if swatch field is hidden
					$( field ).find( '.pewc-radio-image-wrapper, .pewc-checkbox-image-wrapper' ).each(function(){
						if ( $(this).hasClass( 'checked' ) ) {
							$(this).removeClass( 'checked' ); // needed for swatch fields where "allow multiple" is enabled
							$(this).trigger( 'click' ); // this triggers the update_add_on_image() function in pewc.js
						}
						if ( $(this).find( 'input' ).val() == default_value ) {
							// this field has a default value, add checked class back
							$(this).addClass( 'checked' );
						} else {
							$(this).find( 'input' ).prop( 'checked', false );
						}
					});
				} else if( field_type == 'products' ) {
					$( field ).find( 'input' ).prop( 'checked', false );
					$( field ).find( '.pewc-form-field' ).val( '' );
					$( field ).find( '.pewc-radio-image-wrapper, .pewc-checkbox-image-wrapper' ).removeClass( 'checked' );
					// 3.13.0, put back default value
					if ( default_value ) {
						// convert new value to a valid ID string first (e.g. no spaces, lower case)
						var default_value2 = default_value.toLowerCase().replaceAll(' ', '_');
						$( '#' + $( field ).attr( 'data-id' ) + '_' + default_value2 ).prop( 'checked', true );
						$( '#' + $( field ).attr( 'data-id' ) + '_' + default_value2 ).closest( '.pewc-radio-image-wrapper, .pewc-checkbox-image-wrapper' ).addClass( 'checked' );
					}
				} else if( checks.includes( field_type ) ) {
					$( field ).find( 'input' ).prop( 'checked', false );
					if ( default_value ) {
						if ( field_type === 'checkbox' ) {
							$( field ).find( 'input' ).prop( 'checked', true ); // 3.17.2
						} else {
							// convert new value to a valid ID string first (e.g. no spaces, lower case)
							var default_value2 = default_value.toLowerCase().replaceAll(' ', '_');
							$( '#' + $( field ).attr( 'data-id' ) + '_' + default_value2 ).prop( 'checked', true );
						}
					}
				} else if( field_type == 'select' ) {
					if( default_value ) {
						$( field ).find( '.pewc-form-field' ).val( default_value );
					} else {
						$( field ).find( '.pewc-form-field' ).prop( 'selectedIndex', 0 );
					}
				} else if( field_type == 'calculation' ) {
					$( field ).attr( 'data-price', 0 ).attr( 'data-field-price', 0 );
					var action = $( field ).find( '.pewc-action' ).val();
					if( pewc_vars.conditions_timer > 0 ) {
						if( action == 'price' ) {
							$( '#pewc_calc_set_price' ).val( 0 );
							$( field ).find( '.pewc-calculation-value' ).val( 0 ).trigger( 'change' );
						} else {
							$( field ).find( '.pewc-calculation-value' ).val( 0 );
						}
					} else {
						// This is an older method with some performance issues
						$( field ).find( '.pewc-calculation-value' ).val( 0 ).trigger( 'change' );
						if( action == 'price' ) {
							$( '#pewc_calc_set_price' ).val( 0 );
						}
					}
				} else if ( field_type == 'color-picker' ) {
					// 3.17.2
					if ( default_value ) {
						$( field ).find( '.pewc-color-picker-field' ).val( default_value ).trigger( 'change' );
					} else {
						$( field ).find( '.pewc-color-picker-field' ).val( '' ).trigger( 'change' );
					}
				}

				// Does this trigger a group?
				if( $( field ).attr( 'data-trigger-groups' ) ) {
					var groups = JSON.parse( $( field ).attr( 'data-trigger-groups' ) );
					pewc_conditions.trigger_group_conditions( groups );
				}

				if ( $( field ).attr( 'data-field-value') != '' && ! $( field ).hasClass( 'pewc-active-field') ) {
					// this is added so that the summary panel can detect the field
					$( field ).addClass( 'pewc-active-field' );
				}
				// 3.12.2
				if ( $( field ).attr( 'data-field-value') == '' && $( field ).attr( 'data-field-price' ) != 0 ) {
					// maybe also reset price
					$( field ).attr( 'data-field-price', 0 );
				}
				// we force update_total_js so that the summary panel is also updated
				$( 'body' ).trigger('pewc_force_update_total_js');
				$( 'body' ).trigger( 'pewc_reset_field_condition' );

			},

			// since 3.11.9, not sure if this is necessary if the group already has the class?
			group_has_attribute_conditions: function( group ) {

				if ( group.attr( 'data-condition-action') != '' && group.attr( 'data-conditions-match' ) != '' && group.attr( 'data-conditions' ) != '' ) {
					var data_conditions = JSON.parse( group.attr( 'data-conditions' ) );
					if ( data_conditions.length > 0 ) {
						var has_attribute_condition = false;
						for ( var i in data_conditions ) {
							if ( data_conditions[i].field.substring( 0, 3 ) == 'pa_' ) {
								has_attribute_condition = true;
								break;
							}
						}
						return has_attribute_condition;
					}
				}
				return false;

			},

			// since 3.11.9
			trigger_groups_with_attribute_conditions: function( event, variation, purchasable ) {

				$( '.pewc-group-wrap.pewc-has-attribute-condition' ).each( function() {
					var group = $( this );

					// check if this group has conditions
					//if ( pewc_conditions.group_has_attribute_conditions( group ) ) {
						// this group is dependent on attributes, check now
						var group_id = parseFloat( group.attr( 'id' ).replace( 'pewc-group-', '' ) );
						conditions_obtain = pewc_conditions.check_group_conditions( group_id );
						var action = $( '#pewc-group-' + group_id ).attr( 'data-condition-action' );
						pewc_conditions.assign_group_classes( conditions_obtain, action, group_id );
					//}
				});

			},

			// since 3.11.9
			trigger_fields_with_attribute_conditions: function( event, variation, purchasable ) {

				$( '.pewc-item.pewc-field-has-attribute-condition' ).each( function() {

					var field = $( this );
					var field_id = field.attr( 'data-field-id' );
					var parent = pewc_conditions.get_field_parent( field );

					conditions_obtain = pewc_conditions.check_field_conditions( field_id, '', parent );
					var action = $( '.pewc-field-' + field_id ).attr( 'data-field-conditions-action' );

					pewc_conditions.assign_field_classes( conditions_obtain, action, field_id, parent );

					if( pewc_vars.reset_fields == 'yes' ) {
						pewc_conditions.reset_fields();
					}

				});

			},

			// since 3.11.9
			trigger_attribute_condition_check: function( event, variation, purchasable ) {

				pewc_conditions.trigger_groups_with_attribute_conditions( event, variation, purchasable );
				pewc_conditions.trigger_fields_with_attribute_conditions( event, variation, purchasable );

			}
		}

		pewc_conditions.init();

	});

})(jQuery);
