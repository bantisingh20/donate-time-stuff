const dbService  = require('../DatabaseHelper/DatabaseHelper');
const jwt = require('jsonwebtoken');

const saveUser = async (req, res) => {

    console.log(req.body);
    const { fullName, email, password, roleId } = req.body; 

    if (!fullName || !email || !password || !roleId) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const params = {
        fullName,
        email,
        password,
        roleId
    };

    console.log(params)
    try {
 
        const result = await dbService.executeStoredProcedure('AddUser', params);

        if (result && result[0]) {
            const newUserId = result[0].NewUserId; 
            return res.status(201).json({
                message: 'User created successfully',
                userId: newUserId,
            });
        } else {
            return res.status(500).json({
                message: 'Error occurred while creating user',
            });
        }
    } catch (error) {
        console.error('Error saving user:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};


const Login = async (req, res) => {
 
    const { email, password } = req.body; 
    if (!email || !password ) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const params = {  email, password }; 
    try {
 
        const result = await dbService.executeStoredProcedure('SpGetloginDetails', params);

        console.log(result);
        if (result && result[0]) {
            const user = result[0]; 
            //console.log(newUserId);
           
            const payload = {
                userId: user.UserId,
                username: user.FullName  
            };

            console.log(payload);
            const token = jwt.sign(payload, "bantisingh", { expiresIn: '1h' });

            return res.status(201).json({message: 'Login Successfully', userId: user ,token });
        } else {
            return res.status(500).json({ message: 'Invalid Credentials', });
        }

    } catch (error) {
        console.error('Error while login user:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};


const TokenVerify = async (req, res) => {
    console.log(req);
    return res.status(201).json({message: 'Token verify', userId: req.user  });
}
module.exports = {
    saveUser ,Login,TokenVerify
};