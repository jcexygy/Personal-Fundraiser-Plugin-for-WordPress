	(function($) {
		$('.pfund-auth-net-donate a').click(function(e) {
			e.preventDefault();
			$('.pfund-auth-net-form').slideDown();
			$(this).hide();
		});
		
		$('form.pfund-auth-net-form').submit(function() {
			$form = $(this);
			$form.find('.error').remove();
			$('#pfund_donate_button').attr("disabled", "disabled").html('Processing...');
			
			var data = $(this).serialize() + '&action=pfund_auth_net_donation';
			var url = "/wp-admin/admin-ajax.php";
		
			$.post(url, data, function(json) {
				//console.log(json);
				if(json.success) {
					$form.find('#pfund_donate_button').after('<div class="success">Thanks for your donation!</div>');
					setTimeout(function() {
						window.location.href=window.location.href;
					}, 2500);
				} else {
					$form.find('#pfund_donate_button').after('<div class="error">' + json.error + '</div>');
					$('#pfund_donate_button').removeAttr("disabled").html('Donate');
				}
			}, 'json');
		
			return false;
		});
		
		$('a.pfund-secure-donations-link').click(function(e) {
			e.preventDefault();
			$('.pfund-secure-donations-text').slideDown();
		});
	
	})(jQuery);
