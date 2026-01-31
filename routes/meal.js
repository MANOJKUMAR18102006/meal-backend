const express=require("express");
const { getMeal, addMeal, getAllMeals, updateMeal, deleteMeal } = require("../controllers/mealController");
const authMiddleware = require("../middlewares/authMiddleware")
const router=express.Router();

router.get("/get",getMeal)
router.get("/all", authMiddleware, getAllMeals)
router.post("/add", authMiddleware, addMeal)
router.put("/update/:id", authMiddleware, updateMeal)
router.delete("/delete/:id", authMiddleware, deleteMeal)

module.exports=router;