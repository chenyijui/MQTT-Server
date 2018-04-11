var index = (function () {
    var _userInfo = null;
    $('#dropdown-info').on('click', _handelOpenUserModal);
    $('#btn-updateUserInfo').on('click', _handelUpdateUserInfo);
    $('#dropdown-signout').on('click', _handelSignout);
    // $('#btn-login').on('click', _handleLogin);


    
    // function _handleLogin() {
    //     var username = $('#username').val();
    //     var password = $('#password').val();
    //     $.ajax({
	// 		url: 'http://127.0.0.1:3000/signin',
	// 		type: 'post',
	// 		dataType: 'json',
	// 		contentType: 'application/json',
	// 		xhrFields: {
	// 			withCredentials: true
	// 		},
	// 		data: JSON.stringify({
	// 			username,
	// 			password
	// 		}), 
	// 		success: function (data) {
    //             console.log(data);
    //             location.href = '/';
    //             $('.forSignin').removeClass('hide');
	// 	        $('.forNoSignin').addClass('hide');
	// 		},
	// 		error: function (jqXHR, statusCode, c) {
	// 			console.log(jqXHR);
	// 			if (jqXHR.status == 500) {
	// 				alert('Wrong password.');
	// 			}
	// 		}
	// 	})
    // }
    _getUserInfo()
    .done(function (data) {
        console.log(data);
        _userInfo = data;
        console.log(_userInfo );
        if(_userInfo._id) {
            $('.forSignin').removeClass('hide');
		    $('.forNoSignin').addClass('hide');
        } else {
            $('.forSignin').addClass('hide');
            $('.forNoSignin').removeClass('hide');
            alert(JSON.stringify(_userInfo));
        }
    })
    .fail(function () {
		$('.forSignin').addClass('hide');
		$('.forNoSignin').removeClass('hide');
    });
    function _getUserInfo() {
		return (
			$.ajax({
				url: 'http://127.0.0.1:3000/info',
				type: 'get',
				dataType: 'json',
				contentType: 'application/json',
				xhrFields: {
					withCredentials: true
				}
			})
		);
    }
    function _handelOpenUserModal() {
		if (_userInfo._id) {
			$('#updateUserUsername').val(_userInfo.username);
			$('#updateUserName').val(_userInfo.name);
			$('#updateUserEmail').val(_userInfo.email);
			$('#modal-userInfo').modal();
		} else {
			alert('Login first');
		}
    }
    function _handelUpdateUserInfo () {
        var updateUserInfo = _userInfo;
        updateUserInfo.name = $('#updateUserName').val();
        updateUserInfo.email = $('#updateUserEmail').val();
        updateUserInfo.password = $('#updateUserPassword').val();
        console.log('updateUserInfo'+updateUserInfo);
        console.log(updateUserInfo);
        $.ajax ({
            url:'http://127.0.0.1:3000/info',
            type: 'put', 
			dataType: 'json',
			contentType: 'application/json', 
			data: JSON.stringify(updateUserInfo),
			xhrFields: {
				withCredentials: true
            },
            success: function (data) {
                console.log(data);
                _userInfo = data;
				$('#modal-userInfo').modal('hide');
            },
            error: function (jqXHR) {
				console.log(jqXHR);
				if (jqXHR.status == 403) {
					alert('please login');
				}
			}
        })
    }
    function _handelSignout (){
        console.log('123123213');
        $.ajax({
            url:'http://127.0.0.1:3000/logout',
            type: 'get',
            dataType:'josn',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(data){
            console.log(data);
        })
        .fail(function(data){
            console.log(data);
            console.log('error');
            location.href = '/';
            alert("Success signout");
        })
    }
})();
