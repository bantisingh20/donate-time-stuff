const dbService  = require('../DatabaseHelper/DatabaseHelper');
  
const SaveDonationType = async (req, res) => {
 
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


 
module.exports = { SaveDonationType };