var login = (function () {
	$('#btn-login').on('click', _handleLogin);
    function _handleLogin() {
        var username = $('#username').val();
        var password = $('#password').val();
        $.ajax({
			url: 'http://127.0.0.1:3000/signin',
			type: 'post',
			dataType: 'json',
			contentType: 'application/json',
			xhrFields: {
				withCredentials: true
			},
			data: JSON.stringify({
				username,
				password
			}), 
			success: function (data) {
                console.log(data);
				location.href = '/';
			},
			error: function (jqXHR, statusCode, c) {
				console.log(jqXHR);
				if (jqXHR.status == 500) {
					alert('Wrong password.');
				}
			}
		})
    }
})();
