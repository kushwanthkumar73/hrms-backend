const { EmployeeTeam, Log } = require("../../models");

exports.updateAssignments = async (req, res) => {
  try {
    const { employeeId, teamIds } = req.body;

    // Remove existing assignments
    await EmployeeTeam.destroy({ where: { employee_id: employeeId } });

    // Insert new assignments
    for (const id of teamIds) {
      await EmployeeTeam.create({ employee_id: employeeId, team_id: id });
    }

    // Logging
    await Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.id,
      action: "employee.assignment.update",
      meta: { employeeId, teamIds },
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Assignment update failed" });
  }
};
