const dbService  = require('../DatabaseHelper/DatabaseHelper');

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

module.exports = {
    saveUser ,Login
};