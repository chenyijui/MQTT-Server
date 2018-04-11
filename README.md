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
#### 登入
- 取得使用者資料
- 新增使用者帳密
- 修改使用者資料
- 刪除使用者帳密

#### 使用者的 Thing
- 取得所有Thing ID & Thing key
- 新增使用者Thing ID,並發放Thing key
- 修改 使用者Thing ID
- 刪除使用者 Thing ID
#### 使用者的 Device
- 取得所有Device ID & Device key
- 新增 device ID 並發放Device key
- 修改 Device ID
- 刪除 Device ID
#### 
- 確認註冊的device

| 	URI  			| HTTP Verb | Description   |finish|
| -------- 			| --------  | --------       |------|
| /signin       | POST      | "使用者"驗證 登入   |O|
| /signup      | POST      | "使用者"註冊      |O|
| /logout    | GET       | 登出 清除 session|O|
| /info    | GET       | 取得"某使用"者資料 |O|
| /info/things    | GET       | 取得"某使用"者things資料 |O|
| /info/devices    | GET       | 取得"某使用"者devices資料 |O|
| /users	| PUT		| 修改"某使用者"資料 |O|
| /users/:userId	| DELETE		| 刪除"某使用者"資料 |O|
| /device          | POST      |  新增device |O|
| /device/:deviceId        | GET       | 取得 "某個device"|O|
| /device/:deviceId        | PUT       | 修改 "某個device"|O|
| /device/:deviceId        | DELETE       | 刪除 "某個device"|O|
| /thing          | POST      |  新增thing |O|
| /thing/:thingId        | GET       | 取得 "某個thing"|O|
| /thing/:thingId        | PUT       | 修改 "某個thing"|O|
| /thing/:thingId        | DELETE       | 刪除 "某個thing"|O|
| /device/:deviceId/state        | GET       | 確認 註冊成功的device||
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
	"things":[{ type:   Schema.Types.ObjectId, ref:   'thing' }
	"devices":[{ type:   Schema.Types.ObjectId, ref:   'device' }],
	"timestamp": '2017-06-16T06:25:08+00:00'
 }
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
	"stateflg":(number)
 }
 ...
]
```
# API
## 使用者
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
jeson object
    ```
    {message: "signing successfully"}
    ```
-	`404 (err)`
jeson object
    ```
    {message: "username or password error"}
    ```
-	`500 (err)`
jeson object
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
jeson object
    ```
    {message: "signup successfully"}
    ```
-	`404 (err)`
jeson object
    ```
    {message: '傳送格式錯誤'}
    ```
-	`202 (err)`
jeson object
    ```
    {message: "You have already registered."}
    ```
-	`500 (err)`
jeson object
    ```
    {message: "system error"}
    ```
	
### 新增Thing
POST `/thing`
#### req
```
{
	"thingname":(String)
}
```
#### res
-	`200 (OK)`
jeson object
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
jeson object
```
{message:'can not find user by UserId'}
```
-	`500(err)`
jeson object
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
jeson object
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
jeson object
```
{message:'can not find user by UserId'}
```
-	`500(err)`
jeson object
```
{message:'some error'}
```
### 取得"某使用"者things資料
GET `/info/things`
#### req
none
#### res
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

### 取得"某使用"者devices資料
GET `/info/devices`
#### req
none
#### res
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