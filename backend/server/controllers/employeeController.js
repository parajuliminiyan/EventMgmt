const employee = require('../../models').Employee;
const bcrypt = require('bcrypt');
module.exports = {
    async create(req,res){
        const email = await employee.findOne({where: {email: req.body.email}});
        if(req.body.firstName == '' || req.body.lastName == '' || req.body.email == '' || req.body.password == '')
        {
            return res.status(400).send({
                status:'Error',
                message:'Some Fields are Missing'
            });
        }
        if(!email)
        {
            return employee.create({
                name: req.body.firstName + " " + req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,10),
            })
            .then(employee => res.status(201).send({
                status:'Success',
                message:'Employee Successfully Created!',
                data: employee
            }))
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
        const user = await employee.findOne({where: {email: email}});
        if(user)
        {
            const validPassword = await bcrypt.compareSync(password,user.password);
            if(validPassword)
            {
                res.status(200).send({
                    status: 'Success',
                    message: "Welcome Motherfucker",
                    data: user
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
        res.send(req);
    }
}