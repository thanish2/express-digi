import express from "express";

const app = express();

const port = 3000;

//.use acts as a middleware and is run at every request
//express.json is used to convert json object recieved from client to javascript object..so req.body now has js object
app.use(express.json());

let teaData = [];
let nextId = 1;

//adding a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id)); // params to access smthng in the url
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

//update tea
app.put("/teas/:id",(req,res)=>{
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const {name,price}=req.body
  tea.name=name
  tea.price=price
  res.status(200).send(tea)
})

//delete tea
app.delete("/teas/:id",(req,res)=>{
  const index=teaData.findIndex(t=>t.id===parseInt(req.params.id))
  if(index==-1){
    return res.status(404).send("Tea not found")
  }
  teaData.splice(index,1)
  res.status(204).send("Deleted")
})

app.listen(port, () => {
  //if it succesfully listens to port then function will be executed
  console.log(`Server is running at port:${port}...`);
});
