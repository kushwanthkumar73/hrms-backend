const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Organisation, User } = require('../../models');
const audit = require('../services/auditService');

const register = async (req, res, next) => {
  try {
    const { orgName, adminName, email, password } = req.body;
    if (!orgName || !email || !password)
      return res.status(400).json({ error: 'Missing fields' });

    const org = await Organisation.create({ name: orgName });
    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      organisation_id: org.id,
      email,
      password_hash,
      name: adminName,
    });

    await audit.log(user.id, org.id, 'org.create', {
      orgId: org.id,
      userId: user.id,
    });

    const token = jwt.sign(
      { userId: user.id, orgId: org.id },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(201).json({
      token,
      user: { id: user.id, email: user.email, name: user.name, orgId: org.id },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.id, orgId: user.organisation_id },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    await audit.log(user.id, user.organisation_id, 'auth.login', {});

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
