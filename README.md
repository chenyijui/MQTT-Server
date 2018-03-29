MQTT doc
===

### 架構
![](https://i.imgur.com/N8HSZc2.png)
Broker server 
http port:3000
mqtt port:1883

## 功能
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


| 	URI  			| HTTP Verb | Description   |finish|
| -------- 			| --------  | --------       |------|
| /signin       | POST      | "使用者"驗證 登入   |
| /signup      | POST      | "使用者"註冊      |O|
| /info    | GET       | 取得"某使用"者資料 |O|
| /users/:userId	| PUT		| 修改"某使用者"資料 |O|
| /users/:userId	| DELETE		| 刪除"某使用者"資料 |O|
| /device          | POST      |  新增device |O|
| /device/:deviceId        | GET       | 取得 "某個device"|O|
| /device/:deviceId        | PUT       | 修改 "某個device"|O|
| /device/:deviceId        | DELETE       | 刪除 "某個device"|O|
| /thing          | POST      |  新增thing |O|
| /thing/:thingId        | GET       | 取得 "某個thing"|O|
| /thing/:thingId        | PUT       | 修改 "某個thing"|O|
| /thing/:thingId        | DELETE       | 刪除 "某個thing"|O|

## Thing/device ID &Thing/device KEY

|  Thing   | value | 
| -------- | -------- | 
|  ThingId | h( userid + date + ”thing” ) | 
| ThingKey | h( ThingID + X )| 

|  Device   | value | 
| -------- | -------- | 
|  DeviceId | h( userid + devicetype+ date + ”device” )| 
| DeviceKey |h( DeviceID + Salt + X )| 



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
	"deviceid":(string),
	"devicekey":(string),
	"timestamp": '2017-06-16T06:25:08+00:00'
 }
 ...
]
```
