var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');
const filter = require('../controllers/filter.js');


// определяем маршруты и их обработчики внутри роутера userRouter
//router.use("/create", userController.addUser);

router.get("/",userController.index);
router.get('/:id',filter.validateId, userController.get);
router.put('/:id',filter.validateId,filter.validateName, userController.update);
router.delete('/:id',filter.validateId,userController.delete );
router.post('/',filter.validateName,userController.create );
//add page
module.exports = router;
