const express = require("express")
const router = express.Router()
const admin = require("../Controller/adminControll");



// middleware
const tryCatchMiddleware = require("../Middlewares/tryCatchMiddleware ")
const verifyToken = require("../Middlewares/adminAuthMiddelware");
const imageUpload = require("../Middlewares/imageUpload/imageUpload");
// const imageUplod = require("../Middlewares/imageUplod/imageUpload")
router.use(express.json())
router
.post("/login",tryCatchMiddleware(admin.login))
//apk middleware  start
// apk middleware  end

.get("/users",tryCatchMiddleware(admin.allUsers))
.get("/user/:id", tryCatchMiddleware(admin.findById))
.post("/createProduct",imageUpload, tryCatchMiddleware(admin.createProduct))
.get("/products", tryCatchMiddleware(admin.allProducts))
.get("/products/:id",tryCatchMiddleware(admin.productsById))
.delete("/products",tryCatchMiddleware(admin.deleteProduct))
.put("/products", tryCatchMiddleware(admin.updateProduct))
.get("/orders",tryCatchMiddleware(admin.orderDtails))
.use(verifyToken)







module.exports = router