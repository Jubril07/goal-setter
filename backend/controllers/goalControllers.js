const asyncHandler = require('express-async-handler')

const Goal =require('../models/goalModel')

// Get goals  
// route GET api/goals
const getGoals= asyncHandler(async(req,res)=>{
    const goals = await Goal.find()
     
    res.json(goals)
}) 

// Setgoals
// route POST api/goals
const setGoal= asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please enter a text field')
    }
    const goal = Goal.create(
        {
            text:req.body.text,
        }
    )
    res.json(goal)
})

// Update goals
// route PUT api/goals/:id
const updateGoal =asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found') 
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{new: true} )
    res.json(updatedGoal)
})


// Delete Goals
// route DELETE api/goals/:id
const deleteGoal= asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Please enter a valid goal id')
    }
    await goal.remove()
    
    res.status(200).json({id: req.params.id})
}) 


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}