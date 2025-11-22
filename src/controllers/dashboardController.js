const { Employee, Team, Log, Organisation, User } = require("../../models");
const { Op } = require("sequelize");

exports.stats = async (req, res) => {
  try {
    const orgId = req.user.orgId;

    const totalEmployees = await Employee.count({
      where: { organisation_id: orgId },
    });

    const totalTeams = await Team.count({
      where: { organisation_id: orgId },
    });

    const recentLogs = await Log.count({
      where: {
        organisation_id: orgId,
        created_at: {
          [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const organisation = await Organisation.findByPk(orgId);
    const user = await User.findByPk(req.user.id);

    return res.json({
      employees: totalEmployees,
      teams: totalTeams,
      recentLogs,
      organisation: organisation ? organisation.name : "",
      user: user ? user.name : "",
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Dashboard stats failed" });
  }
};
