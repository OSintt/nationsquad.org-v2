const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.json({message: 200});
});

module.exports = router;