const router = require('express').Router();
const {Employee} = require("../models/Employee");

//Get Employees
router.get("/api/v1/employees",(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    Employee.find().exec((err, employees) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, employees: employees});
    })
});

//POST Employees
router.post("/api/v1/add-employees", (req,res)=>{
    const newEmp = new Employee(req.body);
    newEmp.save((err)=>{
        if(err) return res.status(400).json({success:false, err});
        return res.status(201).json("New Employee resoucre is created.")
    })
});

//GET Employees By ID
router.get("/api/v1/employees/:id", (req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    id = req.params.id;
    Employee.findById(id, function(err, employee){
        if(err) return res.status(400).json({ success: false, error:err });
        return res.status(200).json({ success: true, employee});
    })
})

//UPDATE Employee By ID
router.put("/api/v1/edit-employees/:id", (req, res) => {
    Employee.findByIdAndUpdate(
        req.params.id, {$set: req.body},
        (err, post) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true });
        }
    );
});
//DELETE Employee By ID
router.delete("/api/v1/delete-employees/:id", (req,res)=>{
    Employee.findByIdAndRemove(req.params.id).exec((err,deleteItem)=>{
        if(err){
            res.send(err);
        }return res.json(`Employee resoucre is deleted`);
    });
});

module.exports = router;