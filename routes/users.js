var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController.js");
const filter = require("../controllers/filter.js");

router.get("/", userController.index);
router.get("/:id", filter.validateId, userController.get);
router.put(
  "/:id",
  filter.validateId,
  filter.validatePutName,
  userController.update
);
router.delete("/:id", filter.validateId, userController.delete);
router.post("/", filter.validateName, userController.create);

module.exports = router;
