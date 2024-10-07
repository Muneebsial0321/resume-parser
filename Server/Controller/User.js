
const User = require('../Modals/UserSchema')
const jwt = require('jsonwebtoken');
const setAlert = require('../Modules/alert')


const getAllUser = async (req, res) => {
    const data = await User.find({})
    res.json(data)
}

const createUser = async (req, res) => {
    const User_ = new User(req.body)
    try {
        const response = await User_.save()
        const data = {
            id: email
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        res.cookie('jwt', authtoken, { httpOnly: true, secure: false })//for production set to true
        res.cookie('auth', true)
        res.status(201).json(setAlert(true, true, 'success', "user was Created successfully"));
    }
    catch (e) {
        console.log("error \n", e)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await User.find({ email, password })
        const payload = {
            id: email
        }
        const authtoken = jwt.sign(payload, process.env.JWT_SECRET);
        if (data.length == 1) {
            res.cookie('jwt', authtoken, { httpOnly: true, secure: false })
            res.cookie('auth', true)
            res.json(alert(true, true, "success", "Loged in"))
        }
        else if (data.length == 0) {

            res.json(alert(false, true, "error", "Invalid Credentials"))
        }
    }
    catch (e) {
        console.error(e)
    }
}


module.exports = { createUser, getAllUser, login }
