# 餐廳清單
收藏喜愛餐廳的網站。
## 網站畫面
![restaurant list](https://user-images.githubusercontent.com/103798145/170467853-9d03449f-9695-4a3d-ab15-d1860d3dde6e.jpg)
## 功能說明
+ 可瀏覽全部餐廳
+ 可在搜尋欄輸入餐廳名稱或種類來尋找餐廳
+ 可根據餐廳名稱、類別或地區排列餐廳
+ 可點擊任一餐廳，查看詳細資料
+ 按下地址後方的圖標，連接google map查看餐廳位置
+ 可編輯餐廳資訊
+ 可新增與刪除餐廳
## 環境建置
1. Node.js 16.15.0
2. Express 4.18.1
3. Express-handlebars 3.0.0
4. Bootstrap 4.3.1
5. Font-awesome 5.8.1
6. Mongoose 5.9.7
7. Dotenv 16.0.1
## 安裝流程
1. 使用終端機下載專案
```
git clone https://github.com/JuneChen1/restaurant_list.git
```
2. 進入專案資料夾
```
cd restaurant_list
```
3. 安裝套件
```
npm install
```
4. 安裝nodemon套件
```
npm install nodemon
```
5.設定環境變數連線MongoDB
```
MONGODB_URI=mongodb+srv://<account>:<password>@cluster0.9lnbo.mongodb.net/<database name>?retryWrites=true&w=majority
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
