const notFound = (req, res)=>{
    return res.status(404).send({error: 'Api not found' ,status : 'No'})
}

module.exports = notFound