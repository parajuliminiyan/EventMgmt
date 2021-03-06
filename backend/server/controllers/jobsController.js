const Jobs = require('../../models').jobs;
const { Op } = require("sequelize");

module.exports = {

    async create(req, res) {
        return Jobs.create(req.body).then((job) =>{
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

    async deleteJob(req,res)
    {
        await Jobs.destroy({
            where:{
                id:req.body.id
            }
        }).then((data)=>{
            res.send({
                status:'Success',
                message:'Job Deleted Successfully',
                data:data
            })
        })
    }

}