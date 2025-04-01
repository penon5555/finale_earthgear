const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

exports.register = async (req, res) => {
    //code
    try {
        //code
        const { email, password } = req.body
        // Step 1 Validate body
        if (!email) {
            return res.status(400).json({ message: 'Email is Require!' })
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is Require!' })
        }
        //Step 2  Ck Db
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (user) {
            return res.status(400).json({ message: "Email already Exist!!" })
        }
        //Step 3 HashPassword
        const hashPassword = await bcrypt.hash(password, 10)

        //step 4 Register
        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        })
        console.log(user)
        res.send('Register Success')

    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ messege: "Server Error" })
    }
}

exports.login = async (req, res) => {
    //code
    try {
        //code
        const { email, password } = req.body

        // Step 1 Check Email
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user || !user.enabled) {
            return res.status(400).json({ message: 'User not found or not Enabled' })
        }
        // Step 2 Check Password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Password Invalid' })
        }
        // Step 3 Check Payload
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        // Step 4 Genetrate Token
        jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: 'Server Error' })
            }
            res.json({ payload, token })
        })
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.currentUser = async (req, res) => {
    try {
        //code
        res.send('Hello Current user')
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}
