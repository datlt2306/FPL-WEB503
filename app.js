// const createServer = require("http");

// const server = createServer(() => {
//     console.log("server");
// });

// server.listen(3000, () => {
//     console.log("Server đang chạy cổng 3000");
// });

// import express from 'express';
const express = require("express");
const app = express();

app.get("/", () => {
    console.log("Home page");
});
app.listen(3000, () => {
    console.log("Server đang chạy cổng 3000");
});
