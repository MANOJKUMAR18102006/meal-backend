const Meal=require("../models/Meal")

const getMeal = async (req, res) => {
    try {
        const { week, day } = req.query

        if (!week || !day) {
            return res.status(400).json({
                error: "week and day are required"
            });
        }
        
        const meal = await Meal.findOne({ week, day });
        
        if (!meal) {
            return res.status(404).json({ 
                error: "Meal not found"
            });
        }

        res.status(200).json(meal);
    } catch (err) {
        console.error("Error in getMeal:", err);
        res.status(500).json({ error: err.message });
    }
};

const getAllMeals = async (req, res) => {
    try {
        console.log('getAllMeals called');
        console.log('User data:', req.userData);
        const meals = await Meal.find().sort({ week: 1, day: 1 });
        console.log('Found meals:', meals.length);
        res.status(200).json(meals);
    } catch (err) {
        console.log('getAllMeals error:', err.message);
        res.status(500).json({ error: err.message });
    }
};

const updateMeal = async (req, res) => {
    try {
        const { id } = req.params;
        const { week, day, breakfast, lunch, dinner } = req.body;
        
        console.log('Update request for meal ID:', id);
        console.log('Update data:', { week, day, breakfast, lunch, dinner });
        console.log('User data:', req.userData);
        
        // Check if another meal exists with the same week/day (excluding current meal)
        const existingMeal = await Meal.findOne({ week, day, _id: { $ne: id } });
        if (existingMeal) {
            return res.status(400).json({ error: "Meal already exists for this week and day" });
        }
        
        const meal = await Meal.findByIdAndUpdate(
            id,
            { week, day, breakfast, lunch, dinner },
            { new: true, runValidators: true }
        );
        
        if (!meal) {
            console.log('Meal not found with ID:', id);
            return res.status(404).json({ error: "Meal not found" });
        }
        
        console.log('Meal updated successfully:', meal);
        res.status(200).json({ message: "Meal updated successfully", meal });
    } catch (err) {
        console.error('Update meal error:', err.message);
        res.status(500).json({ error: err.message });
    }
};

const deleteMeal = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Delete request for meal ID:', id);
        console.log('User data:', req.userData);
        
        const meal = await Meal.findByIdAndDelete(id);
        
        if (!meal) {
            console.log('Meal not found with ID:', id);
            return res.status(404).json({ error: "Meal not found" });
        }
        
        console.log('Meal deleted successfully:', meal);
        res.status(200).json({ message: "Meal deleted successfully" });
    } catch (err) {
        console.error('Delete meal error:', err.message);
        res.status(500).json({ error: err.message });
    }
};


const addMeal=async(req,res)=>{
    try{
        console.log("Request body:", req.body);
        console.log("User data:", req.userData);
        
        const{week,day,breakfast,lunch,dinner}=req.body
        const exist=await Meal.findOne({week,day});
        if(exist){
            return res.status(400).json({error:"Meal already exist"});
        }
        const meal = await Meal.create({ week,day,breakfast,lunch,dinner,createdby:req.userData.id});
        res.status(201).json({ message: "Meal created succesfully",meal});

    }catch(err){
        console.error("Error in addMeal:", err.message);
        res.status(500).json({error: err.message});
    }
}

module.exports={getMeal,addMeal,getAllMeals,updateMeal,deleteMeal}