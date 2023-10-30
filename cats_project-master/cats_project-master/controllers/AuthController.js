const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController{
    static login(req, res){
        return res.render('auth/login')
    }

    static async loginpost(req, res){
        const {email, password} = req.body

        const user = await User.findone({where:{email:email}})

        if(!user){
            req.flash('message', 'usuario não encontrado')
            res.render('auth/login')
            return
        }

        const passwordmatch =bcrypt.compareSync(password, user.password)
        if(!passwordmatch){
            req.flash('message', 'senha invalida')
            res.render('auth/login')
            return
        }

        req.session.userId = user.id;

        req.flash('message','bem vindo')

        req.session.save(()=>{
            res.redirect('/')
        })

    }

    static register(req, res){
        return res.render('auth/register')
    }

    static async registerpost(req, res){
        const {name, email, password, confirmpassword} = req.body

        if(password != confirmpassword){
            req.flash('message', 'as senha não conferem, tente novamente')
            res.render('auth/register')
            return
        }

        
    }
}