const express=require("express");
const { getMeal, addMeal } = require("../controllers/mealController");
const authMiddleware = require("../middlewares/authMiddleware")
const router=express.Router();

router.get("/get",getMeal)
router.post("/add", authMiddleware, addMeal)

module.exports=router;