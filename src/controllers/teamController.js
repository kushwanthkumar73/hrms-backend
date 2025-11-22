const { Team, Employee, EmployeeTeam } = require('../../models');
const audit = require('../services/auditService');

const list = async (req, res, next) => {
  try {
    const rows = await Team.findAll({ where: { organisation_id: req.user.orgId }, include: [{ model: Employee }] });
    res.json(rows);
  } catch (err) { next(err); }
};

const getOne = async (req, res, next) => {
  try {
    const t = await Team.findOne({ where: { id: req.params.id, organisation_id: req.user.orgId }, include: [{ model: Employee }] });
    if (!t) return res.status(404).json({ error: 'Not found' });
    res.json(t);
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const payload = { ...req.body, organisation_id: req.user.orgId };
    const team = await Team.create(payload);
    await audit.log(req.user.id, req.user.orgId, 'team.create', { teamId: team.id, payload });
    res.status(201).json(team);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const team = await Team.findOne({ where: { id: req.params.id, organisation_id: req.user.orgId } });
    if (!team) return res.status(404).json({ error: 'Not found' });
    await team.update(req.body);
    await audit.log(req.user.id, req.user.orgId, 'team.update', { teamId: team.id, changes: req.body });
    res.json(team);
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const team = await Team.findOne({ where: { id: req.params.id, organisation_id: req.user.orgId } });
    if (!team) return res.status(404).json({ error: 'Not found' });
    await team.destroy();
    await audit.log(req.user.id, req.user.orgId, 'team.delete', { teamId: team.id });
    res.json({ ok: true });
  } catch (err) { next(err); }
};

module.exports = { list, getOne, create, update, remove };
