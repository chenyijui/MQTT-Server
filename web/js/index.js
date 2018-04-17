var index = (function () {
    //handle card Modal
    var _handleCardModal = {
        signoutModal: function() {
            $('#modal-signup').modal();
        }
    }
    //userInfo
    var _userInfo = null;
    $('#dropdown-info').on('click', _handleOpenUserModal);
    $('#nav-mydevice').on('click', _renderDeviceCard);
    $('#nav-mything').on('click', _renderThingCard);
    $('#btn-updateUserInfo').on('click', _handleUpdateUserInfo);
    $('#dropdown-logout').on('click', _handleLogout);
    $('#btn-creatDevice').on('click', _handleCreatDevice);
    $('#btn-creatThing').on('click', _handleCreatThing);
    $('#btn-updateThing').on('click', _handleUpdateCardThing);
    $('#btn-updateDevice').on('click', _handleUpdateCardDevice);
    $('#card-thing-content').on('click.delthing', '.btn-delthing', _handleDeleteCardThing);
    $('#card-thing-content').on('click.editthing', '.btn-editthing', _handleOpenEditThing);
    $('#card-thing-content').on('click.editdevice', '.btn-editdevice', _handleOpenEditDevice);
    $('#card-thing-content').on('click.deldevice', '.btn-deldevice', _handleDeleteCardDevice);
    $('#nav-thing').on('click', _handleOpenAllThing);
    $('#nav-device').on('click', _handleOpenAllDevice);
    $('#btn-searchAllthing').on('click', _handlesearchBar);
    $('#card-authdevice-content').on('click.delAuthdevice', '.btn-delAuthdevice', _handleDeleteAuthDevice);
    $('#card-authdevice-content').on('click.editAuthdevice', '.btn-editAuthdevice', _handleEditAuthDevice);
    $('#dropdown-authorized').on('click', _handlDropdownAuth);
    $('#dropdown-unauthorized').on('click', _handlDropdownUnauth);
   
    
    _getUserInfo()
    .done(function (data) {
        console.log(data);
        _userInfo = data;
        console.log(_userInfo );
        if(_userInfo._id) {           
            _renderThingCard ();
            // _renderDeviceCard ();
            $('.forSignin').removeClass('hide');
            $('.forNoSignin').addClass('hide');
            if(_userInfo.role == 'admin') {
                console.log(_userInfo.role == 'admin');
                $('.forAdmin').removeClass('hide');
            } 
        }else {
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
    function _renderAlldeviceCard () {
        console.log('_renderAlldeviceCard');
        $.ajax({
            url: 'http://127.0.0.1:3000/devices',
            type: 'get',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                $('#randerauthdevice').html('');
                console.log(data);
                for (let alldevice of data) {
                    $('#randerauthdevice').prepend(`
                        <div class="col-sm-6 col-lg-6 col-md-6 pt-1 ">
                            <div id="cardAuthdevice" class="card Authdevice" >
                                <div class="card-body bg-light">
                                    <button type="button" class="close mr-2" >
                                        <span data-authdeviceid="${alldevice._id}" data-authdevicename="${alldevice.devicename}" class="fa fa fa-close btn-delAuthdevice aria-hidden="true"></span>
                                    </button>												
                                    <h2 class="card-title mb-1 titleleft ">Name: 
                                        <span>${alldevice.devicename}</span>
                                    </h2>													
                                    <h5 class="card-subtitle mb-2 text-muted titleleft">devicetype: 
                                    <span>${alldevice.devicetype}</span>
                                    ${(alldevice.stateflag==1) ? ``:`<button type="button" class="close mr-2" >
                                    <span data-authdevicename="${alldevice.devicename}" data-authdeviceid="${alldevice._id}" class="fa fa-check-square btn-editAuthdevice " aria-hidden="true"></span>
                                </button>`}
                                    </h5>
                                    ${(alldevice.stateflag==1) ? `<h4 class="card-text mb-0 titleleft text-info"><span class="badge badge-info mt-2">Authorized</span></h4>`:`<h4 class="card-text mb-0 titleleft text-danger"><span class="badge badge-danger mt-2">Unauthorized</span></h4>`}
                                    <h5 class="card-text mb-0 titleleft">deviceId: <span class="span-color">${alldevice.deviceid}</span></h5>
                                    <h5 class="card-text  titleleft">deviceKey: <span class="span-color">${alldevice.devicekey}</span></h5>											
                                    <h6 class="card-subtitle mb-2 text-muted titleright ">create at: <span>${moment(alldevice.createdAt).format('YYYY/MM/DD HH:mm:ss')}</span></h6>
                                </div>
                            </div>
                        </div>
                    `)
                }
                $('#randermydevice div div').attr('id', '');
                $('#randerallthing div div').attr('id', '');
                $('#randermything div div').attr('id', '');
            }
        })
    }
    function _renderAllthingCard () {
        $.ajax({
            url: 'http://127.0.0.1:3000/things',
            type: 'get',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log('===================');
                console.log(data);
                $('#randerallthing').html('');
                for (let allthing of data) {
                    $('#randerallthing').prepend(`
                        <div class="col-sm-6 col-lg-6 col-md-6 pt-1">
                            <div id="cardallthing" class="card allthing">
                                <div class=" bg-light card-body">												
                                    <h2 class="card-title mb-1 titleleft ">Name: 
                                        <span>${allthing.thingname}</span>
                                    </h2>													
                                    <h5 class="card-subtitle mb-2 text-muted titleleft">thingtype: 
                                        <span>${allthing.thingtype}</span>
                                    </h5>
                                    <h5 class="card-text mb-0 titleleft">ThingId: <span class="text-warning">${allthing.thingid}</span></h5>
                                    <h5 class="card-text  titleleft">ThingKey: <span class="text-danger">${allthing.thingkey}</span></h5>											
                                    <h6 class="card-subtitle mb-2 text-muted titleright ">create at: <span>${moment(allthing.createdAt).format('YYYY/MM/DD HH:mm:ss')}</span></h6>
                                </div>
                            </div>
                        </div>
                    `)
                }
                $('#randermydevice div div').attr('id', '');
                $('#randermything div div').attr('id', '');
            },
            error: function(jqXHR) {
                console.log(jqXHR);
            }
        })
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
                        <div id="cardmything" class="card mything" >
                            <div class="card-body">												
                                <h2 class="card-title mb-1 titleleft ">Name: 
                                    <span>${cardthing.thingname}</span>
                                    <button type="button" class="close mr-2" >
                                        ${_userInfo ? `<span data-thingname="${cardthing.thingname}" data-thingid="${cardthing._id}" class="fa fa fa-close btn-delthing" aria-hidden="true"></span>` : '' }
                                    </button>
                                </h2>													
                                <h5 class="card-subtitle mb-2 text-muted titleleft">thingtype: 
                                    <span>${cardthing.thingtype}</span>
                                    <button type="button" class="close mr-2">
                                        ${_userInfo ? `<span data-thingid="${cardthing._id}" class="fa fa-pencil btn-editthing" ></span>` : ''}
                                    </button>
                                </h5>
                                <h5 class="card-text mb-0 titleleft">ThingId: <span class="text-warning">${cardthing.thingid}</span></h5>
                                <h5 class="card-text  titleleft">ThingKey: <span class="span-color">${cardthing.thingkey}</span></h5>											
                                <h6 class="card-subtitle mb-2 text-muted titleright ">create at: <span>${moment(cardthing.createdAt).format('YYYY/MM/DD HH:mm:ss')}</span></h6>
                            </div>
                        </div>
                    </div>
                    `)
                }
                $('#randermydevice div div').attr('id', '');
                $('#randerallthing div div').attr('id', '');
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
                            <div id="cardmydevice" class="card mydevice" >
                                <div class="card-body">												
                                    <h2 class="card-title mb-1 titleleft ">Name: 
                                        <span>${randerdevice.devicename}</span>
                                        <button type="button" class="close mr-2" >
                                            ${_userInfo ? `<span data-deviceid="${randerdevice._id}" data-devicename="${randerdevice.devicename}" class="fa fa fa-close btn-deldevice" aria-hidden="true"></span>`:''}
                                        </button>
                                    </h2>													
                                    <h5 class="card-subtitle mb-2 text-muted titleleft">devicetype: 
                                        <span>${randerdevice.devicetype}</span>
                                        <button type="button" class="close mr-2">
                                            ${_userInfo ? `<span data-deviceid="${randerdevice._id}" ice.devicename}" class="fa fa-pencil btn-editdevice" ></span>`:''}
                                        </button>
                                    </h5>
                                    <h5 class="card-text mb-0 titleleft">deviceId: <span class="text-warning">${randerdevice.deviceid}</span></h5>
                                    <h5 class="card-text  titleleft">deviceKey: <span class="span-color">${randerdevice.devicekey}</span></h5>											
                                    <h6 class="card-subtitle mb-2 text-muted titleright ">create at: <span>${moment(randerdevice.createdAt).format('YYYY/MM/DD HH:mm:ss')}</span></h6>
                                </div>
                            </div>
                        </div>
                    `)
                }
                $('#randermything div div').attr('id', '');
                $('#randerallthing div div').attr('id', '');                
            },
            error: function (jqXHR) {
                console.log(jqXHR);
            }
        })
    }
    function _handleLogin () {
        $('#modal-creatbutton').addClass('hide');
        $('#card-mything-mydevice').addClass('hide');
        $('#page-signin').removeClass('hide');
    }
    function _handleOpenAllThing () {
        $('#card-alldevice').addClass('hide');
        $('#modal-creatbutton').addClass('hide');
        $('#card-mything-mydevice').addClass('hide');
        $('#card-allthing').removeClass('hide');
        _renderAllthingCard ();
    }
    function _handleOpenAllDevice () {
        $('#card-allthing').addClass('hide');
        $('#modal-creatbutton').addClass('hide');
        $('#card-mything-mydevice').addClass('hide');
        $('#card-alldevice').removeClass('hide');
        _renderAlldeviceCard ();
    }
    function _handleOpenEditDevice () {
        var id = $(this).data('deviceid');
        console.log('_handleOpenEditDevice: '+ id);
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
    function _handleOpenEditThing () {
        var id = $(this).data('thingid');
        console.log('_handleOpenEditThing: '+ id);
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
    function _handleOpenUserModal() {
		if (_userInfo._id) {
			$('#updateUserUsername').val(_userInfo.username);
			$('#updateUserName').val(_userInfo.name);
			$('#updateUserEmail').val(_userInfo.email);
			$('#modal-userInfo').modal();
		} else {
			alert('Login first');
		}
    }
    function _handlesearchBar (value) {
        var search_value = $('#allSearchText').val() || value;
        // $('#randerallthing div div').attr('id', 'cardallthing');
        // $('#randermything div div').attr('id', 'cardmything');
        // $('#randermydevice div div').attr('id', 'cardmydevice');
        console.log(search_value);
        var randermessage = $('#randerallthing div div').attr('id')||
                            $('#randermything div div').attr('id') ||
                            $('#randermydevice div div').attr('id') ||
                            $('#randerauthdevice div div').attr('id') ;
        console.log(randermessage);
        var selector ;
        switch (randermessage) {
            case 'cardallthing' :
                selector = $('#randerallthing>div');
                break;        
            case 'cardmydevice' :
                selector =$('#randermydevice>div');
                break;
            case 'cardmything' :
                selector =$('#randermything>div');
                break;
            case 'cardAuthdevice' :
                selector = $('#randerauthdevice>div')
                break;
            default :
                selector = $('#');
                break;
        } 
        selector.each(function (index, value) {
            var span = $(this).find("span");
            console.log(span);
            console.log("length:",span.length);
            var span_length = span.length;
            var flag = false;
            for(var i=0 ;i<span_length ; i++) {
                if(span[i].outerText.indexOf(search_value)>=0) {
                    console.log("find:",this);
                    $(this).removeClass('hide');
                    flag = true;
                    break
                }
            }
            $('#allSearchText').val('');
            flag ? $(this).removeClass('hide'):$(this).addClass('hide');
        });
    }
    function _handleEditAuthDevice () {
        if(confirm(`Authorized this [Devicename ${$(this).data('authdevicename')} ]`)) {
            var id = $(this).data('authdeviceid');
            console.log(id);
            $.ajax({
                url: `http://127.0.0.1:3000/devices/${id}/state`,
                type: 'get',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    console.log(data);
                    _renderAlldeviceCard ();
                },
                error:　function (jqXHR) {
                    console.log(jqXHR);
                }
            })
        }
    }
    function _handleDeleteAuthDevice () {
        if(confirm(`Delete this [Devicename ${$(this).data('authdevicename')} ]`)) {
            var id = $(this).data('authdeviceid');
            console.log(id);
            $.ajax({
                url: `http://127.0.0.1:3000/devices/${id}`,
                type: 'delete',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    console.log(data);
                    _renderAlldeviceCard ();
                },
                error:　function (jqXHR) {
                    console.log(jqXHR);
                }
            })
        }
    }
    function _handleDeleteCardDevice () {
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
    function _handleDeleteCardThing () {
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
    function _handleCreatDevice() {
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
    function _handleCreatThing () {
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
    function _handleUpdateCardDevice () {
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
    function _handleUpdateCardThing () {
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
    function _handleUpdateUserInfo () {
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
    function _handlDropdownAuth () {
        _handlesearchBar('Authorized');
    }
    function _handlDropdownUnauth () {
        _handlesearchBar('Unauthorized');
    }
    function _handleLogout (){
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
