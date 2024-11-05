const express=require('express')
const app=express();
const port=3000;
app.use(express.json());

let items = [ 
{ id: 1, name: "Book 1", description: "This is the first book." }, 
{ id: 2, name: "Book 2", description: "This is the second book." } ,
{ id: 3, name: "Book 3", description: "This is the third book."},
{ id: 4, name: "Book 4", description: "This is the fourth book."},
{ id: 5, name: "Book 5", description:"This is the fifth book."}
]; 

app.post('/post/items',(req,res)=>
{
    const newItem = {
        id : items.length + 1,
        name: "Book"+(items.length + 1),
        description: "This is a new book."
    }
    
    items.push(newItem);
    res.json(newItem);
})
app.get('/items',(req,res)=>{
    res.json(items);
})

app.get('/items/:id',(req,res)=>
{
    const searchid = req.params.id;
    res.json(items.filter(item=>item.id==searchid));
    
})

app.get('/items/search',(req,res)=>{
    const searchName = req.query.name;
    const searchId=req.query.id;

    res.json(items.filter(item=>item.name.toLowerCase().includes(searchName.toLowerCase()) || item.id==searchId));
})
app.put('/items/update:id',(req,res)=>{
    const updateItem = req.params.id;
    if(updateItem > 0 && updateItem <= items.length)
    {
    
       items[updateItem]=req.body;
       res.json(items);
    }
    else{
        res.status(404).json({message:"Item not found"});
    }

})
app.delete(('/items/delete:id'),(req,res)=>{

    const deleting =parseInt(req.params.id);
    if(deleting > 0 && deleting <= items.length)
    {
     items.splice(deleting,1);
     res.json(items);
    }

})

app.listen(port,()=>{
    console.log("Server is running on port "+port);
})
