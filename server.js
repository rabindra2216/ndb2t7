let express = require("express");
//const { studentsData } = require("./studentData");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header(
"Access-Control-Allow-Methods",
"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
);
res.header(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept"
);
next();
});
var port=process.env.PORT || 2410;
app.listen(port, () =>console.log(`Node app listening on port ${port}!`));
let {employees}=require('./employeesData')

app.get("/employees", function (req, res) {
    let dept=req.query.department;
    let design=req.query.designation;
    let gen=req.query.gender;
    let arr=employees;
    if(dept) arr=arr.filter(st=>st.department===dept);
    if(design) arr=arr.filter(st=>st.designation===design);
    if(gen) arr=arr.filter(st=>st.gender===gen);
    console.log('Filter Arr=',arr);
      res.send(arr);
    });

    app.get("/employees/:empCode", function (req, res) { 
            let empcode=+req.params.empCode;
            let product=employees.find(st=>st.empCode===empcode);
            if(product) res.send(product);
            else res.status(404).send('No Employee Found')
    
        });  

        app.post("/employees", function (req, res) {
            let body = req.body; 
            console.log(body);
            let newCustomer = {...body };
            employees.push(newCustomer);
            res.send(newCustomer);
            });
    
    app.put("/employees/:empCode",function(req,res){ 
        let body=req.body;
        let id=+req.params.empCode;
        let index =employees.findIndex((st)=> st.empCode === id);
        if(index>=0){
        let updatedStudent = {...body };
        employees[index] = updatedStudent;
        res.send(updatedStudent);
        }
        else res.status(404).send('No Employees found!');
        });

app.delete("/employees/:empCode",function(req,res){
    let id=+req.params.empCode;
       let index=employees.findIndex(st=>st.empCode===id);
        if (index>=0){
       let deletedEmp=employees.splice(index,1);
        res.status(404).send(deletedEmp);
        }
        else res.send('Employee Not Found!')
});
