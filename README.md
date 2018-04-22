MQTT-Server doc
===

### 架構
![](https://i.imgur.com/N8HSZc2.png)
Broker server 
http port:3000
mqtt port:1883

Usage:
```
git clone https://github.com/chenyijui/MQTT-Server.git
cd MQTT-Server
npm install
npm start

```
open browser
(http://127.0.0.1:3000)
## MQTT-Server功能

### 使用者

#### 登入
- 取得使用者資料
- 新增使用者帳密
- 修改使用者資料

#### Thing
- 要求獲取 其他使用者 thing&id資訊
- 授權給予 特定使用者thing&id資訊
- 取得所有Thing ID & Thing key
- 新增使用者Thing ID,並發放Thing key
- 修改 使用者Thing 
- 刪除使用者 Thing
- 要求取得Thing id&key
- 取得 thing資料

#### Device
- 取得所有Device ID & Device key
- 新增 device ID 並發放Device key
- 修改 Device
- 刪除 Device

### Admin
- 授權 由使用者新增的device
- 刪除使用者帳密


| 	URI  			| HTTP Verb | Description   |finish|
| -------- 			| --------  | --------       |------|
| /signin       | POST      | "使用者"驗證 登入   |O|
| /signup      | POST      | "使用者"註冊      |O|
| /logout    | GET       | 登出 清除 session|O|
| /info    | GET       | 取得"某使用"者資料 |O|
| ~~/info/things~~    | GET       | 取得"某使用"者things資料 |O|
| /info/devices    | GET       | 取得"某使用"者devices資料 |O|
| /info	| PUT		| 修改"某使用者"資料 |O|
| /users/:userId	| DELETE		| 刪除"某使用者"資料 |O|
| /devices         | POST      |  新增device |O|
| /devices/:deviceId        | GET       | 取得 "某個device"|O|
| /devices/:deviceId        | PUT       | 修改 "某個device"|O|
| /devices/:deviceId        | DELETE       | 刪除 "某個device"|O|
| /thing          | POST      |  新增thing |O|
| /things/:thingId        | GET       | 取得 "某個thing"|O|
| /things/:thingId        | PUT       | 修改 "某個thing"|O|
| /things/:thingId        | DELETE       | 刪除 "某個thing"|O|
| /devices/:deviceId/state        | GET       | 授權由使用者新增的device|O|
| /things/:thingId/interest        | GET       |要求獲取 其他使用者 thing&id資訊|O|
| /info/:userId/view/thingId        | GET  |授權給予 特定使用者thing&id資訊|O|
| /info/view        | GET       |取得 使用者 所有thing資料|O|
## Thing/device ID &Thing/device KEY

|  Thing   | value | 
| -------- | -------- | 
|  ThingId | h( userid + date + ”thing” ) | 
| ThingKey | h( ThingID + X )| 

|  Device   | value | 
| -------- | -------- | 
|  DeviceId | h( userid + devicetype+ devicepw +date + ”device” )| 
| DeviceKey |h( DeviceID + Salt + X )| 
- X = server Secret Key



## Data Model
### user
```
[
 {
	"_id":(strring),
	"role": (admin or role),
	"name": (string),
	"email": (string),
	"username":(string),
	"password":(string),
	"things":[{ type:   Schema.Types.ObjectId, ref:   'thing' }]
	"devices":[{ type:   Schema.Types.ObjectId, ref:   'device' }],
	"view":[{ type:   Schema.Types.ObjectId, ref:   'things' }],
	"timestamp": '2017-06-16T06:25:08+00:00'}],
 ...
]
```

### thing
```
[
 {
	"_id":(strring),
	"thingid":(string),
	"thingname":(string),
	"thingkey":(string),
	"thingtype":(string),
	"description":(string),
	"owner":(string),
	interest[{ type:   Schema.Types.ObjectId, ref:   'user' }],
	"timestamp": '2017-06-16T06:25:08+00:00'
 }
 ...
]
```
### device
```
[
 {
	"_id":(strring),
	"devicetype":(string),
	"devicename":(string),
	"deviceid":(string),
	"devicepw":(string),
	"devicekey":(string),
	"timestamp": '2017-06-16T06:25:08+00:00'
	"stateflag":(number)
 }
 ...
]
```
# API

### 登入
POST `/signin`
#### Req
```
{
  "username": (string),
  "password": (string)
}
```
#### Res
-	`200 (ok)`
json object
    ```
    {message: "signing successfully"}
    ```
-	`404 (err)`
json object
    ```
    {message: "username or password error"}
    ```
-	`500 (err)`
json object
    ```
    {message: "system error"}
    ```
### 註冊
POST `/signup`
#### Req
```
{
	"role": (admin or role),
	"name": (string),
	"email": (string),
	"username":(string),
	"password":(string)
}
```
#### Res
-	`200 (ok)`
json object
    ```
    {message: "signup successfully"}
    ```
-	`404 (err)`
json object
    ```
    {message: '傳送格式錯誤'}
    ```
-	`202 (err)`
json object
    ```
    {message: "You have already registered."}
    ```
-	`500 (err)`
json object
    ```
    {message: "system error"}
    ```
### 登出
POST `/logout`
#### Req
none
#### Res
-	`200 (ok)`
json object
    ```
    {message: "success logout"}
    ```
-	`404 (err)`
json object
    ```
    {message: "can not logout"}
    ```
	
### 新增Thing
POST `/thing`
#### req
```
{
	"thingname":(String),
	"thingtype":(String)
}
```
#### res
-	`200 (OK)`
json object
```
{
	"_id": "5acd99f2041f512a209d279b",
	"thingname": "the one thing",
	"thingid": "2805b68063fc464c7a3d93d5b6162b60",
	"thingkey": "82cc9db24125377836ffd00cf63eba6e",
	"createdAt": "2018-04-11T05:15:30.730Z",
	"updatedAt": "2018-04-11T05:15:30.730Z",
	"__v": 0
}
```
-	`404 (err)`
json object
```
{message:'can not find user by UserId'}
```
-	`500(err)`
json object
```
{message:'some error'}
```

### 新增Device
POST `/device`
#### req
```
{
	"devicename":(String),
	"devicepw":  (String),
	"devicetype": (String)
}
```
#### res
-	`200 (OK)`
json object
```
{
	"_id": "5acda757952a9f10b406d596",
	"devicename": "the one device",
	"devicepw": "25d55ad283aa400af464c76d713c07ad",
	"devicetype": "Arduino",
	"deviceid": "e398f0a939930c5c0e012f3b83e99007",
	"devicekey": "c236fe64e37450f0eec0d347ce3dd5f6",
	"createdAt": "2018-04-11T06:12:39.357Z",
	"updatedAt": "2018-04-11T06:12:39.357Z",
	"__v": 0
}
```
-	`404 (err)`
json object
```
{message:'can not find user by UserId'}
```
-	`500(err)`
json object
```
{message:'some error'}
```
### 取得"某使用"者things資料
GET `/info/things`
#### req
none
#### res
-	`200`
json object
```
[
	{
		"_id": "5acd99f2041f512a209d279b",
		"thingname": "the one thing",
		"thingid": "2805b68063fc464c7a3d93d5b6162b60",
		"thingkey": "82cc9db24125377836ffd00cf63eba6e",
		"createdAt": "2018-04-11T05:15:30.730Z",
		"updatedAt": "2018-04-11T05:15:30.730Z",
		"__v": 0
	}
	...
]
````
-	`404 (err)`
json object
```
{message: 'can not find things with userid'}
```
-	`500(err)`
json object
```
{message:'some error'}
```
### 取得"某使用"者devices資料
GET `/info/devices`
#### req
none
#### res
-	`200`
json object
```
[
	{
		"_id": "5acda757952a9f10b406d596",
		"devicename": "the one device",
		"devicepw": "25d55ad283aa400af464c76d713c07ad",
		"devicetype": "Arduino",
		"deviceid": "e398f0a939930c5c0e012f3b83e99007",
		"devicekey": "c236fe64e37450f0eec0d347ce3dd5f6",
		"createdAt": "2018-04-11T06:12:39.357Z",
		"updatedAt": "2018-04-11T06:12:39.357Z",
		"__v": 0
	}
	...
]
````

-	`404 (err)`
json object
```
{message: 'can not find devices with userid'}
```
-	`500(err)`
json object
```
{message:'some error'}
```
### 修改 使用者 資料
PUT `/info`
#### req
```
{
	"name":(String),
	"password":  (String),
	"email": (String)
}
```
#### res
-	`200`
json object
```
 {
	"_id":(strring),
	"role": (admin or role),
	"name": (string),
	"email": (string),
	"username":(string),
	"password":(string),
	"things":[{ type:   Schema.Types.ObjectId, ref:   'thing' }]
	"devices":[{ type:   Schema.Types.ObjectId, ref:   'device' }],
	"timestamp": '2017-06-16T06:25:08+00:00'
 }
```
-	`403 (err)`
json object
```
{message: "please login"}
```
### 刪除 使用者 資料
DELETE `/users/:userId`
#### req
none
#### res
-	`200`
json object
```
{message: 'success remove'}
```
-	`500 (err)`
json object
```
{message:"can not remove"}
```
### 修改 Device 資料
PUT `/devices/:deviceId`
#### req
{
	"devicetype":(string),
	"devicepw":(string),
	"devicename":(string)
}
#### res
-	`200`
json object
```
 {
	"_id":(strring),
	"devicetype":(string),
	"devicename":(string),
	"deviceid":(string),
	"devicepw":(string),
	"devicekey":(string),
	"timestamp": '2017-06-16T06:25:08+00:00'
	"stateflag":(number)
 }
```
-	`403 (err)`
json object
```
{message: 'some error'}
```


### 刪除 Device 資料
DELETE `/devices/:deviceId`
#### req
none
#### res
-	`200`
json object
```
{message: 'success remove'}
```
-	`500 (err)`
json object
```
{message:"some error"}
```
### 修改 Thing 資料
PUT `/things/:thingId`
#### req
{
	"thingtype":(string),
	"thingpw":(string),
	"thingname":(string)
}
#### res
-	`200`
json object
```
 {
	"_id":(strring),
	"thingid":(string),
	"thingname":(string),
	"thingkey":(string),
	"thingtype":(string),
	"timestamp": '2017-06-16T06:25:08+00:00'
 }
```
-	`403 (err)`
json object
```
{message: 'some error'}
```

### 刪除 Thing 資料
DELETE `/things/:thingId`
#### req
none
#### res
-	`200`
json object
```
{message: 'success remove'}
```
-	`500 (err)`
json object
```
{message:"can not remove"}
```

### 授權 Device
GET `/devices/:deviceId/state`
#### req
none
#### res
-	`200`
json object
```
{message:"deviceId : 1"})
```
-	`403(err)`
```
{message:'can not find device'}
```
-	`500 (err)`
json object
```
{message:"can not remove"}
```

### 要求獲取 其他使用者 thing&id資訊
GET `/things/:thingId/interest`
#### req
none
#### res
-	`200`
json object
```
{message:'success'})
```
- `404`
```
{message:"has sent request"}
```
-	`500 (err)`
json object
```
{message:"some error"}
```

### 授權給予 特定使用者thing&id資訊
GET `/info/:userId/view/thingId`
#### req
none
#### res
-	`200`
json object
```
{message:'success'})
```

-	`500 (err)`
json object
```
{message:"some error"}
```

### 取得 使用者 所有thing資料
GET `/info/view`
#### req
none
#### res
-	`200`
json object
```
[
	{
		"interest": [],
		"_id": "5ad61e458dc53d0ac461d10a",
		"thingname": "White House",
		"thingtype": "humidity",
		"owner": "Tomato",
		"createdAt": "2018-04-17T16:18:13.091Z",
		"updatedAt": "2018-04-17T16:18:13.091Z"
	},
	{
		"interest": [],
		"_id": "5ad9888e17ec700ef46953e7",
		"thingname": "Room 33",
		"thingtype": "IOT",
		"owner": "admin",
		"createdAt": "2018-04-20T06:28:30.257Z",
		"updatedAt": "2018-04-20T06:28:30.257Z",
		"thingid": "546fad561555d21409aa65fcd9aa4d66",
		"thingkey": "dcbe74d541855b523ee65308a819c4ba"
	}
	...
]
```

-	`500 (err)`
json object
```
{message:"some error"}
```