const express = require('express');
const router = express.Router();

const file = require('../controller/csv');

router.post('/upload', file.upload);
router.get('/open', file.open);
router.get('/delete', file.delete);

module.exports=router;