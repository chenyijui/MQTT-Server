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
    $('#btn-creatDevice').on('click', _hendelCreatDevice);
    $('#btn-creatThing').on('click', _hendelCreatThing);
    $('#btn-updateThing').on('click', _handelUpdateCardThing);
    $('#btn-updateDevice').on('click', _handelUpdateCardDevice);
    $('#card-thing-content').on('click.delthing', '.btn-delthing', _hendelDeleteCardThing);
    $('#card-thing-content').on('click.editthing', '.btn-editthing', _handelOpenEditThing);
    $('#card-thing-content').on('click.editdevice', '.btn-editdevice', _handelOpenEditDevice);
    $('#card-thing-content').on('click.deldevice', '.btn-deldevice', _hendelDeleteCardDevice);
    // $('#btn-close').on('click', _handelCloseCard)
    // _handelUpdateCardThing


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
            _renderDeviceCard ();
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
    function _renderDeviceCard ()　{
        $.ajax({
            url: 'http://127.0.0.1:3000/info/devices',
            type: 'get',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log('DEVICE');
                console.log(data);
                $('#randermydevice').html('');
                for(randerdevice of data){
                    $('#randermydevice').prepend(`
                        <div class="col-sm-6 col-lg-6 col-md-6 pt-1">
                            <div class="card mydevice" >
                                <div class="card-body">												
                                    <h2 class="card-title mb-1 titleleft ">Name: 
                                        <span>${randerdevice.devicename}</span>
                                        <button type="button" class="close mr-2" >
                                            ${_userInfo ? `<span data-deviceid="${randerdevice._id}" data-devicename="${randerdevice.devicename}" class="btn-deldevice" aria-hidden="true">&times;</span>`:''}
                                        </button>
                                    </h2>													
                                    <h5 class="card-subtitle mb-2 text-muted titleleft">devicetype: 
                                        <span>${randerdevice.devicetype}</span>
                                        <button type="button" class="close mr-2">
                                            ${_userInfo ? `<span data-deviceid="${randerdevice._id}" ice.devicename}" class="fa fa-pencil btn-editdevice ml-0.5" ></span>`:''}
                                        </button>
                                    </h5>
                                    <p class="card-text mb-0 titleleft">deviceId: <span>${randerdevice.deviceid}</span></p>
                                    <p class="card-text  titleleft">deviceKey: <span>${randerdevice.devicekey}</span></p>											
                                </div>
                            </div>
                        </div>
                    `)
                }
            },
            error: function (jqXHR) {
                console.log(jqXHR);
            }
        })
    }
    function _handelOpenEditDevice () {
        var id = $(this).data('deviceid');
        console.log('_handelOpenEditDevice: '+ id);
        $('#modal-updatedevice').attr('data-deviceid', id);
        $.ajax({
            url: `http://127.0.0.1:3000/devices/${id}`,
            type:'get',
            dataType:'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);
                $('#updateDeviceDevicename').val(data.devicename);
                $('#updateDeviceDevicetype').val(data.devicetype);
                $('#modal-updatedevice').modal();
            },
            error: function (jqXHR) {
                console.log(jqXHR);
                if(jqXHR.status==404) {
                    alert(jqXHR.responseJSON.message);
                }
            }
        })        
    }
    function _handelOpenEditThing () {
        var id = $(this).data('thingid');
        console.log('_handelOpenEditThing: '+ id);
        $('#modal-updatething').attr('data-thingid', id);
        $.ajax({
            url: `http://127.0.0.1:3000/things/${id}`,
            type:'get',
            dataType:'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);
                $('#updateThingThingname').val(data.thingname);
                $('#updateThingThingtype').val(data.thingtype);
                $('#modal-updatething').modal();
            },
            error: function (jqXHR) {
                console.log(jqXHR);
                if(jqXHR.status==404) {
                    alert(jqXHR.responseJSON.message);
                }
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
    function _hendelDeleteCardDevice () {
        if(confirm(`Delete this [Devicename ${$(this).data('devicename')} ]`)) {
            console.log(this);
            var id = $(this).data('deviceid');
            $.ajax({
                url: `http://127.0.0.1:3000/devices/${id}`,
                type: 'delete',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    console.log(data);
                    _renderDeviceCard();
                },
                error:　function (jqXHR) {
                    console.log(jqXHR);
                }
            });
        }
    }
    function _hendelDeleteCardThing () {
        if(confirm(`Delete this [Thingname ${$(this).data('thingname')} ]`)) {
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
    function _hendelCreatDevice() {
        var devicename = $('#creatDeviceDevicename').val();
        var devicetype = $('#creatDeviceDevicetype').val();
        var devicepw = $('#creatDeviceDevicepw').val();
        console.log(devicename);
        console.log(devicetype);
        var stateflag = 1;
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
                stateflag,
                devicepw
            }),
            success: function(data) {
                $('#modal-creatdevice').modal('hide');
                var devicename = $('#creatDeviceDevicename').val('');
                var devicetype = $('#creatDeviceDevicetype').val('');
                var devicepw = $('#creatDeviceDevicepw').val('');
                _renderDeviceCard();
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
    function _hendelCreatThing () {
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
    function _handelUpdateCardDevice () {
        var deviceid = $('#modal-updatedevice').data('deviceid');
        console.log(deviceid);
        var devicename = $('#updateDeviceDevicename').val();
        var devicepw = $('#updateDeviceDevicepw').val();
        var devicetype = $('#updateDeviceDevicetype').val();
        $.ajax({
            url:`http://127.0.0.1:3000/devices/${deviceid}`,
            type: 'put',
            contentType: 'application/json',
            dataType: 'json',
            xhrFields:{
                withCredentials:true
            },
            data: JSON.stringify({
                devicename,
                devicepw,
                devicetype
            }),
            success: function (data) {
                $('#updateDeviceDevicename').val('');
                $('#updateDeviceDevicepw').val('');
                $('#updateDeviceDevicetype').val('');
                $('#modal-updatedevice').modal('hide');
                location.href = '/';
            },
            error: function (jqXHR) {
                console.log(jqXHR);
                if(jqXHR.status==500) {
                    alert(jqXHR.responseJSON.message);
                }
            }
        })
    }
    function _handelUpdateCardThing () {
        var thingid = $('#modal-updatething').data('thingid');
        console.log(thingid);
        var thingname = $('#updateThingThingname').val();
        var thingtype = $('#updateThingThingtype').val();
        $.ajax({
            url:`http://127.0.0.1:3000/things/${thingid}`,
            type: 'put',
            contentType: 'application/json',
            dataType: 'json',
            xhrFields:{
                withCredentials:true
            },
            data: JSON.stringify({
                thingname,
                thingtype
            }),
            success: function (data) {
                $('#updateThingThingname').val('');
                $('#updateThingThingtype').val('');
                $('#modal-updatething').modal('hide');
                location.href = '/';
            },
            error: function (jqXHR) {
                console.log(jqXHR);
                if(jqXHR.status==500) {
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
            contentType:'application/json',
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(data){
            console.log(data);
        })
        .fail(function(jqXHR){
            console.log(jqXHR);
            if (jqXHR.status == 200) {
                location.href = '/';
                alert("Success logout");
            }   
        })
    }
})();
