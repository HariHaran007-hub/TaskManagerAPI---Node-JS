const express = require('express')
const taskRoutes = require('./routes/tasks')
const {connectDB} = require('./db/connect')

require('dotenv').config()
const app = express()
const port = 3000

app.use(express.static('./public'))

//middleware
app.use(express.json())//If we dont use it then it will not in the form req.body


//routes
app.use('/api/v1/tasks', taskRoutes)

//Post man test config successfull

//End points => Routes
//app.get('api/v1/tasks) -get all the tasks
//app.post('api/v1/tasks') -create new task
//app.get('api/v1/tasks/:id') -get single task
//app.patch('api/v1/tasks/:id') -update task
//app.delete('api/v1/tasks/:id') -delete task

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server is listenig to the port ${port} and DB connection successful!!`);
        })
    }catch(error){  
        console.log(error);
    }
}

start()




