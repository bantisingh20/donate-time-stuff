const express = require('express');
const router = express.Router();
const UserRouter = require('./user.routes');
const FormRoutes = require('./form.routes');

router.use('/users', UserRouter);
router.use('/form-config', FormRoutes);

module.exports = router;