# 荷包軍記帳本
一個管理支出的簡易記帳本

## 前置要求
+ [Node.js](https://nodejs.org/en/)
+ [MongoDB](https://www.mongodb.com/)


## 如何使用 ? 
請按照以下步驟進行安裝

1. 下載專案
```
$ git clone https://github.com/wowsushi/expense-tracker.git
$ cd expense-tracker
```

2. 安裝相依套件
```
$ npm install
```

3. 建立種子檔案
```
$ npm run seeder
```

4. 設定.env檔，請前往[facebooks for developers](https://developers.facebook.com/)獲取必要數據
在跟目錄建立檔案`.env`，設定以下參數:
```
FACEBOOK_ID= {你的Facebook ID}
FACEBOOK_SECRET= {你的Facebook secret}
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

5. 執行程式 
```
$ npm run dev
```
若是看到以下訊息，就代表成功啟動，請點擊下方網址前往瀏覽
```
Express is listening on http://localhost:3000
db connected!
```

6. 測試帳號如下，登入後即可查看支出
```
第一組: 
帳號: user1@example.com
密碼: 12345678

第二組:
帳號: user2@example.com
密碼: 12345678
```

## 功能
+ 使用者可以瀏覽所有支出
+ 使用者可以刪除特定的支出
+ 使用者可以編輯特定的支出
+ 使用者可以篩選特定期間及類別的支出
+ 使用者可以查看每月支出分析頁面
+ 使用者可以登陸後瀏覽專屬的記帳本界面
+ 支援Facebook登錄

## Demo
[Visit here!](https://limitless-atoll-92986.herokuapp.com/)
![sample1](https://github.com/wowsushi/expense-tracker/blob/master/public/imgs/sample1.png?raw=true)
![sample2](https://github.com/wowsushi/expense-tracker/blob/master/public/imgs/sample2.png?raw=true)
![sample3](https://github.com/wowsushi/expense-tracker/blob/master/public/imgs/sample3.png?raw=true)


## 作者
Betty Chen

