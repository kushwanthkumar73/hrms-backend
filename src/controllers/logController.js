const { Log, User, Organisation } = require("../../models");

exports.list = async (req, res) => {
  try {
    const orgId = req.user.orgId;

    const logs = await Log.findAll({
      where: { organisation_id: orgId },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
          as: "User",
        },
        {
          model: Organisation,
          attributes: ["id", "name"],
          as: "Organisation",
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(logs);
  } catch (err) {
    console.error("Logs fetch error:", err);
    res.status(500).json({ message: "Failed to load logs" });
  }
};

