const express = require('express')
const router = express.Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const config = require('../config')


router.post('/login',
    async (req, res) => {
        const {email, password} = req.body
        if(!email) {
            return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email'}]})
        }
        if(!password) {
            return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password'}]})
        }

        try{
            const foundUser = await User.findOne({email})
            if(!foundUser) {
                return res.status(422).send({errors: [{title: 'User error', detail: 'User is not exist!'}]})
            }
            if(!foundUser.hasSamePassword(password)) {
                return res.status(422).send({errors: [{title: 'User error', detail: 'Incorrect Password!'}]})
            }
            const token = jwt.sign({
                userId: foundUser.id,
                username: foundUser.username
                }, config.SECRET, { expiresIn: '1h' }
                );

            return res.json(token)

        }catch(err) {
            return res.status(422).send({errors: [{title: 'User error', detal: 'Something went wrong!'}]})
        }
    }
)

router.post('/register',
    async (req, res) => {
        const {username, email, password, confirmPassword} = req.body

        // 上と下は同じ
        // const username = req.body.username
        // const email = req.body.email
        // const password = req.body.password
        // const confirmPassword = req.body.confirmPassword

        if(!username) {
            // Invalid error
            return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill username'}]})
        }
        if(!email) {
            return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email'}]})
        }
        if(!password) {
            return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password'}]})
        }
        if(password !== confirmPassword) {
            return res.status(422).send({errors: [{title: 'User error', detail: 'Please check password'}]})
        }
        try{
            const foundUser = await User.findOne({email})
            if(foundUser) {
                return res.status(422).send({errors: [{title: 'User error', detail: 'User already exist!'}]})
            }
        }catch(err){
            return res.status(422).send({errors: [{title: 'User error', detail: 'Something went wrong!'}]})
        }
        const user = new User({username, email, password})
        try{
            await user.save()
            return res.json({"register": true})
        }catch(err) {
            return res.status(422).send({errors: [{title: 'User error', detal: 'Something went wrong!'}]})
        }
    }
)

module.exports = router