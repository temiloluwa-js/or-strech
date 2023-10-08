const tagController = require("../controllers/tagController");
const router = require("express").Router();
router.post("/createTag", tagController.createTag);
router.put("/updateTag", tagController.updateTag);
router.delete("/deleteTag", tagController.deleteTag);
router.get("/tagDetails", tagController.viewTagDetails);
router.get("/listAllTags", tagController.listAllTags);
router.get("/listTags", tagController.listTags);
router.get("/exportTags", tagController.exportTags);
router.get("/search", tagController.findTags);
module.exports = router;
