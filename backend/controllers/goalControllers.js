const asyncHandler = require('express-async-handler')

// Get goals 
// route GET api/goals
const getGoals= asyncHandler(async(req,res)=>{
    console.log(req.body)
    res.json({message:'Get goals'})
})

// Setgoals
// route POST api/goals
const setGoal= asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please enter a text field')
    }
    res.json({message:'Set goal'})
})

// Update goals
// route PUT api/goals/:id
const updateGoal =asyncHandler(async(req,res)=>{
    res.json({message:`Update goal ${req.params.id}`})
})


// Delete Goals
// route DELETE api/goals/:id
const deleteGoal= asyncHandler(async(req,res)=>{
    res.json({message:`Delete goal ${req.params.id}`})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}