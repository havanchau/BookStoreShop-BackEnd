const express = require('express');
const router = express.Router();
const BranchController = require('../controllers/branchController');

router.get('', BranchController.getAllBranch);


module.exports = router;