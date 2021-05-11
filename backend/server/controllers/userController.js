const User = require('../../models').Users;
const notifications = require('../../models').Notifications;
const Jobs = require('../../models').jobs;
const bcrypt = require('bcrypt');
const salt = 15;
module.exports = {

    async create(req, res) {
        const email = await User.findOne({where: {email: req.body.email}});
        if(req.body.firstName == '' || req.body.lastName == '' || req.body.email == '' || req.body.password == '')
        {
            return res.status(400).send({
                status:'Error',
                message:'Some Fields are Missing'
            });
        }
        if(!email)
        {
            return User.create({
                fullname: req.body.firstName + " " + req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,10),
                type: req.body.type ? req.body.type : 0
            })
            .then((user) =>{
                console.log(user);
                res.status(201).send({
                    status:'Success',
                    message:'User Successfully Created!',
                    data: user
                })
            })
            .catch(err => res.status(400).send(err))
            
        }
        return res.status(400).send({
            status:'Error',
            message:'Email Already Exists'
        });
    },

    async login(req, res) {        
        const {email, password} = req.body;
        if(!email || !password)
        {
            res.status(400).send({
                message: "Email or Password Missing!!"
            });
            return;
        }
        const user = await User.findOne({where: {email: email}});
        if(user)
        {
            const validPassword = await bcrypt.compareSync(password,user.password);
            if(validPassword)
            {
                res.status(200).send({
                    status: 'Success',
                    message: "Welcome",
                    data:user
                });
                
            } else {
                res.status(400).send({
                    status: 'Error',
                    message: "Password Didnot Match"
                });
            }

        } else {
            res.status(400).send({
                status:'Error',
                message: "User Not Found"
            });
        }
       
    },

    async updateProfile(req,res)
    {
        var userId = req.params.id;
        let user = await User.findOne({where:{id:userId}});
        // let email = await User.findOne({where:{email:req.email}})
        // if(email)
        // {
        //     return res.status(400).send({
        //         status:'Error',
        //         message:'Email Already Exists'
        //     });
        // }
        if(user)
        {
            user.update(req.body)
        }
        res.status(200).send({
            status: 'Success',
            message: "User Successfully Updated",
            data:user
        });
        
    },
    async listUser(req, res){
        return await User.findAll({where:{id:req.body.id}}).then((data)=>{
            res.send({
                status:'Success',
                message:'',
                data:data
            })
        })
    },

    async getNotifications(req,res)
    {
        return await Jobs.findAll({where:{accepted:0}}).then((data)=>{    //{where:{userid:req.body.id}}
            res.send({
                status:'Success',
                message:'',
                data:data
            })
        })
    },

    async createNotifications(req,res) 
    {
        await Jobs.update({
            accepted:req.body.state,
            acceptedby:req.body.userid
        }, {
            where:{
                id:req.body.id
            }
        }).then((data)=>{
            console.log(data);
            res.send({
                status:'Success',
                message:'',
                data:data
            })
        })
    },


    /* 
        await User.update({ lastName: "Doe" }, {
        where: {
            lastName: null
        }
        });
    
    */

    async updateNotifications(req,res) 
    {
        return await notifications.destroy({where:{id:req.body.id}}).then((nots)=>{
            res.status(200).send({
                status:'Success',
                message:'Notification deleted',
                data:nots
            });
        })
    },

    async getdetails(req,res)
    {
        return await User.findAll({
            where:{
               id:req.body.userid 
            }
        }).then((data)=>{
            res.send({
                status:'Success',
                data:data
            })
        })
    }


    
};