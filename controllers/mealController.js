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
                // searched: { week, day },
                // available: allMeals.map(m => ({ week: m.week, day: m.day }))
            });
        }

        res.status(200).json(meal);
    } catch (err) {
        console.error("Error in getMeal:", err);
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

module.exports={getMeal,addMeal}