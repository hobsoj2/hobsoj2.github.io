$(function(){

	var contactForm = $('#contact-us-form'),
		successNotification = $('<div/>',{
							  class:'notification success',
							  style:'margin-bottom:28px',
							  text:'Your message has been sent.'
							  }).hide(),
		errorNotification = $('<div/>',{
							class:'notification error',
							style:'margin-bottom:28px',
							}).hide();

	contactForm.submit(function(e){
		var name = contactForm.find('#name'),
			email = contactForm.find('#email'),
			message = contactForm.find('#message'),
			nameVal = name.val(),
			emailVal = email.val(),
			messageVal = message.val(),
			formSubmit = true;

		e.preventDefault();

		successNotification.insertBefore(contactForm);
		errorNotification.insertBefore(contactForm);

		(nameVal === '' || !nameVal.match(/^[a-z\s]*$/i)) ? showError(name) : hideError(name); // jshint ignore:line

		(!emailVal.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) ? showError(email) : hideError(email); // jshint ignore:line

		(messageVal === '' || !messageVal.match(/^[a-z0-9,.+-:()@!?\s]*$/i)) ? showError(message) : hideError(message); // jshint ignore:line

		function showError(field){
			field.addClass('input-error');
			formSubmit = false;
		}

		function hideError(field){
			field.removeClass('input-error');
		}

		if (formSubmit){
			var formData = contactForm.serialize();
			submitForm(formData);
		}

		function submitForm(formData){
			$.ajax({
				type: 'POST',
				url: 'contact.php',
				data: formData,
				cache: 'false',
				timeout: 5000,
				complete: function(jqXHR, textStatus){
					if (textStatus == 'error'){
						errorNotification.text( textStatus + ' ' + jqXHR.statusText );
						errorNotification.slideDown(250);
					} else {
						successNotification.slideDown(250);
					}
				}
			});
		}
	});
});
