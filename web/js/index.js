var index = (function () {
    //handel card Modal
    var _handelCardModal = {
        signoutModal: function() {
            $('#modal-signup').modal();
        }
    }
    //userInfo
    var _userInfo = null;
    $('#dropdown-info').on('click', _handelOpenUserModal);
    $('#btn-updateUserInfo').on('click', _handelUpdateUserInfo);
    $('#dropdown-logout').on('click', _handelLogout);
    $('#btn-creatDevice').on('click', _hendeCreatDevice);
    $('#btn-creatThing').on('click', _hendecreatThing);
    $('#card-thing-content').on('click.delthing', '.btn-delthing', _hendeDeleteCardThing);




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
            _renderThingCard ();   
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
				xhrFields: {
					withCredentials: true
				}
			})
		);
    }
    function _renderThingCard () {
        $.ajax({
            url: 'http://127.0.0.1:3000/info/things',
            type: 'get',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log('===================');
                console.log(data);
                $('#randermything').html('');
                for (let cardthing of data) {
                    $('#randermything').prepend(`
                    <div class="col-sm-6 col-lg-6 col-md-6 pt-1">
                        <div class="card mything" >
                            <div class="card-body">												
                                <h2 class="card-title mb-1 titleleft ">Name: 
                                    <span>${cardthing.thingname}</span>
                                    <button type="button" class="close mr-2" >
                                        ${_userInfo ? `<span data-thingname="${cardthing.thingname}" data-thingid="${cardthing._id}" class="btn-delthing" aria-hidden="true">&times;</span>` : '' }
                                    </button>
                                </h2>													
                                <h5 class="card-subtitle mb-2 text-muted titleleft">thingtype: 
                                    <span>${cardthing.thingtype}</span>
                                    <button type="button" class="close mr-2">
                                        ${_userInfo ? `<span data-thingid="${cardthing._id}" class="fa fa-pencil btn-editthing ml-0.5" ></span>` : ''}
                                        <span class="fa fa-pencil btn-editthing ml-0.5" ></span>
                                    </button>
                                </h5>
                                <p class="card-text mb-0 titleleft">ThingId: <span>${cardthing.thingid}</span></p>
                                <p class="card-text  titleleft">ThingKey: <span>${cardthing.thingkey}</span></p>											
                            </div>
                        </div>
                    </div>
                    `)
                } 
            },
            error: function(jqXHR) {
                console.log(jqXHR);
            }
        })
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
    function _hendeDeleteCardThing () {
        if(confirm(`Delete this [Thingname ${$(this).data('thingname')} ]?`)) {
            var thingid = $(this).data('thingid');
            $.ajax({
                url: `http://127.0.0.1:3000/things/${thingid}`,
                type: 'delete',
                dataType:'json',
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    console.log(data);
                    _renderThingCard();
                },
                error: function () {
                    console.log(jqXHR);
                    if (jqXHR.status == 401) {
                        alert('no login');
                    }
                }
            })
        }
    }
    function _hendeCreatDevice() {
        var devicename = $('#creatDeviceDevicename').val();
        var devicetype = $('#creatDeviceDevicetype').val();
        var devicepw = $('#creatDeviceDevicepw').val();
        console.log(devicename);
        console.log(devicetype);
        $.ajax({
            url:'http://127.0.0.1:3000/devices',
            type:'post',
            dataType: 'json',
            contentType: 'application/json',
            xhrFields: {
				withCredentials: true
			},
            data: JSON.stringify({
                devicename,
                devicetype,
                devicepw
            }),
            success: function(data) {
                $('#modal-creatdevice').modal('hide');
                var devicename = $('#creatDeviceDevicename').val('');
                var devicetype = $('#creatDeviceDevicetype').val('');
                var devicepw = $('#creatDeviceDevicepw').val('');
                console.log(data);
            },
            error: function (jqXHR) {
                console.log(jqXHR);
                console.log();
				if (jqXHR.status == 404) {
					alert(jqXHR.responseJSON.message);
                }
            }
        })
    }
    function _hendecreatThing () {
        var thingname = $("#creatThingThingname").val();
        var thingtype = $('#creatThingThingtype').val();
        $.ajax({
            url: 'http://127.0.0.1:3000/things',
            type: 'post',
            dataType:'json',
            contentType: 'application/json',
            xhrFields: {
				withCredentials: true
            },
            data: JSON.stringify({
                thingname,
                thingtype
            }),
            success: function (data) {
                $('#modal-creatthing').modal('hide');
                var thingname = $("#creatThingThingname").val('');
                var thingtype = $('#creatThingThingtype').val('');
                _renderThingCard ();
                console.log(data);
            },
            error: function (jqXHR) {
                console.log(jqXHR);
                console.log();
				if (jqXHR.status == 404) {
					alert(jqXHR.responseJSON.message);
                }
            }
        })

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
    function _handelLogout (){
        console.log('123123213');
        $.ajax({
            url:'http://127.0.0.1:3000/logout',
            type: 'get',
            dataType:'josn',
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(data){
            console.log(data);
            location.href = '/';
            console.log('error');
        })
        .fail(function(data){
            console.log(data);
            location.href = '/';
            alert("Success signout");
            
            
            
        })
    }
})();
