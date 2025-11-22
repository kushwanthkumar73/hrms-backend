const jwt = require("jsonwebtoken");
const { User } = require("../../models");

module.exports = async function authMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Missing token" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.userId);

    if (!user) {
      return res.status(401).json({ error: "Invalid user" });
    }

    req.user = {
      id: user.id,
      orgId: user.organisation_id,
      name: user.name,
    };

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Unauthorized", details: err.message });
  }
};
