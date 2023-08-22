const express = require("express");
const router = express.Router();
const admin = require("../controller/admin");

router.get('/', admin.getAdminPage)
router.post('/updateUser/:id', admin.updateUser)
router.post('/products', admin.addProduct)
router.post('/deleteUser/:id', admin.deleteUser)
router.post('/deleteProduct/:id', admin.deleteProduct)

module.exports = router;
