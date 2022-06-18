# 餐廳清單
收藏喜愛餐廳的網站。
## 網站畫面
![螢幕擷取畫面 2022-06-18 191052](https://user-images.githubusercontent.com/103798145/174435121-ec68d3cc-440f-42bb-bef5-cbf9632b582a.jpg)
## 功能說明
+ 使用 email 或 facebook 註冊帳號
+ 可新增與刪除餐廳
+ 可編輯餐廳資訊
+ 點擊任一餐廳，查看詳細資料
+ 按下地址後方的圖標，連接google map查看餐廳位置
+ 可在搜尋欄輸入餐廳名稱或種類來尋找餐廳
+ 可根據餐廳名稱、類別或地區進行排列
## 安裝流程
1. 請確認有安裝 Node.js 與 npm
2. 將專案 clone 到本地
```
git clone https://github.com/JuneChen1/restaurant_list.git
```
3. 安裝套件
```
npm install
```
4. 安裝nodemon套件
```
npm install nodemon
```
5. 將 .env.example 檔名更改為 .env，並修改相關變數
```
MONGODB_URI = mongodb+srv://<account>:<password>@cluster0.9lnbo.mongodb.net/<database name>?retryWrites=true&w=majority
FACEBOOK_ID = facebook 應用程式編號
FACEBOOK_SECRET = facebook 應用程式密鑰
```
6. 建立種子資料
```
npm run seed
```
7. 啟動伺服器
```
npm run dev
```
8. 當終端機出現以下訊息，代表伺服器已成功啟動
```
Express is running on http://localhost:3000
```
9. 開啟瀏覽器輸入 http://localhost:3000
## 環境建置
1. Node.js 16.15.0
2. Express 4.18.1
3. Express-handlebars 3.0.0
4. Bootstrap 4.3.1
5. Font-awesome 5.8.1
6. Mongoose 5.9.7
7. Dotenv 16.0.1
8. Bcryptjs2.4.3
9. Connect-flash 0.1.1
10. Express-session 1.17.1
11. Method-override 3.0.0
12. Passport 0.4.1
13. Passport-local 1.0.0
14. Ppassport-facebook 3.0.0
