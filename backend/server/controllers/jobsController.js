const Jobs = require('../../models').jobs;
const { Op } = require("sequelize");

module.exports = {

    async create(req, res) {
        return Jobs.create(req.body).then((job) =>{
            console.log(job);
            res.status(201).send({
                status:'Success',
                message:'Job Successfully Created!',
                data: job
            })
        })
        .catch(err => res.status(400).send(err))
    },

    async employeerjoblist(req,res){
        return await Jobs.findAll({where:{postedby:req.body.id}}).then((jobs)=>{
            res.status(200).send({
                status:'Success',
                message:"",
                data:jobs
            })
        })
    },
    async listAll(req,res)
    {
        return await Jobs.findAll().then((jobs)=>{
            res.status(200).send({
                status:'Success',
                message:"",
                data:jobs
            })
        })
    },
    async usersJobList(req,res)
    {
        let id = req.body.userid;
        console.log(id);
        return await Jobs.findAll(
            {
                where:{
                    [Op.and]:[
                        {accepted:1},
                        {acceptedby:req.body.userid}
                    ]
                }
            }
        ).then((jobs)=>{
            res.status(200).send({
                status:'Success',
                message:"",
                data:jobs
            })
        })
    },

    /*  
        Post.findAll({
        where: {
            [Op.and]: [
            { authorId: 12 },
            { status: 'active' }
            ]
        }
        });
    
    */
}