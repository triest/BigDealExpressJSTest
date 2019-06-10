var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');



// определяем маршруты и их обработчики внутри роутера userRouter
//router.use("/create", userController.addUser);

router.get("/",userController.index);
router.get('/:id', userController.get);
router.get('/edit/:id',userController.editPage);
router.put('/:id', userController.update);
router.delete('/:id',userController.delete );
router.post('/',userController.create );
//add page
module.exports = router;
