import express from "express";
import router from "./routers";
const app = express();

app.use("/api", router);
// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
