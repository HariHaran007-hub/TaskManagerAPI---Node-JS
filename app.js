const express = require('express')
const taskRoutes = require('./routes/tasks')
const {connectDB} = require('./db/connect')

require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const app = express()
const port = process.env.PORT || 3000

//End points => Routes
//app.get('api/v1/tasks) -get all the tasks
//app.post('api/v1/tasks') -create new task
//app.get('api/v1/tasks/:id') -get single task
//app.patch('api/v1/tasks/:id') -update task
//app.delete('api/v1/tasks/:id') -delete task

//Used for rendering the front-end(HTML, CSS, Java-Script)
app.use(express.static('./public'))

//middleware
app.use(express.json())//If we dont use it then it will not in the form req.body

//routes
app.use('/api/v1/tasks', taskRoutes)

app.use(notFound)//If the end point was typed wrongly then this will show

app.use(errorHandlerMiddleware)//For avoid try-catch blocks in controllers



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




