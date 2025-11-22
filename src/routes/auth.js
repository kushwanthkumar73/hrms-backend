const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, async (req, res, next) => {
  // minor wrapper to call audit log in controller
  try {
    const { id } = req.user;
    const audit = require('../services/auditService');
    await audit.log(id, req.user.orgId, 'auth.logout', {});
    res.json({ ok: true });
  } catch (err) { next(err); }
});

module.exports = router;
