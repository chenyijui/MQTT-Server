var login = (function () {
	$('#btn-login').on('click', _handleLogin);
	$('#btn-signupUser').on('click', _hendelCreatSignout)


    function _hendelCreatSignout () {
        var username = $('#signupUserUsername').val();
        var name = $('#signupUserName').val();
        var email = $('#signupUserEmail').val();
        var password = $('#signupUserPassword').val();
        var role = 'user';
        $.ajax({
            url: 'http://127.0.0.1:3000/signup', 
			type: 'post', 
			dataType: 'json',
			contentType: 'application/json',
			xhrFields: {
				withCredentials: true
			},
			data: JSON.stringify({
				username,
				name,
                email,
                password,
                role
            }),
            success: function(data) {
                console.log(data);
                $('#modal-signup').modal('hide');
                alert('success');
            },
            error: function (jqXHR) {
				console.log(jqXHR);
				if (jqXHR.status == 401) {
					alert('Login first');
				}
			}
        })
    }

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
