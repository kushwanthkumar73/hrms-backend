const { Employee, Team, EmployeeTeam } = require("../../models");

exports.list = async (req, res) => {
  const employees = await Employee.findAll({
    where: { organisation_id: req.user.orgId },
    include: [{ model: Team }],
  });
  res.json(employees);
};

exports.getOne = async (req, res) => {
  const emp = await Employee.findOne({
    where: { id: req.params.id, organisation_id: req.user.orgId },
    include: [{ model: Team }],
  });

  if (!emp) return res.status(404).json({ error: "Not found" });
  res.json(emp);
};

exports.create = async (req, res) => {
  const emp = await Employee.create({
    ...req.body,
    organisation_id: req.user.orgId,
  });
  res.status(201).json(emp);
};

exports.update = async (req, res) => {
  const emp = await Employee.findOne({
    where: { id: req.params.id, organisation_id: req.user.orgId },
  });

  if (!emp) return res.status(404).json({ error: "Not found" });

  await emp.update(req.body);
  res.json(emp);
};

exports.remove = async (req, res) => {
  await Employee.destroy({
    where: { id: req.params.id, organisation_id: req.user.orgId },
  });
  res.json({ success: true });
};

// ⭐ Assign / Unassign Teams
exports.assignToTeam = async (req, res) => {
  const { employeeId, teamIds } = req.body;

  await EmployeeTeam.destroy({ where: { employee_id: employeeId } });

  for (const teamId of teamIds) {
    await EmployeeTeam.create({
      employee_id: employeeId,
      team_id: teamId,
    });
  }

  res.json({ success: true });
};
