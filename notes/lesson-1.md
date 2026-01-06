## Cài đặt

### Cài đặt package.json

```bash
npm init -y
```

### Chỉnh sửa file package.json

```json
{
    "name": "fpl-web503",
    "version": "1.0.0",
    "description": "",
    "main": "app.js",
    "scripts": {
        "dev": "nodemon app.js"
    }
}
```

### Cài đặt express

```bash
npm i express
```

### Cài đặt nodemon

```bash
npm i nodemon
```

### Tạo file .gitignore

```bash
node_modules
```

### Tạo file app.js

```js
const express = require("express");
const app = express();

app.get("/", () => {
    console.log("Home page");
});

app.listen(3000, () => {
    console.log("Server đang chạy cổng 3000");
});
```

### Chạy server

```bash
npm run dev
```
