const { Log } = require('../../models');
const logger = require('../utils/logger');

async function log(userId, orgId, action, meta = {}) {
  try {
    await Log.create({ organisation_id: orgId || null, user_id: userId || null, action, meta });
    logger.info({ userId, orgId, action, meta });
  } catch (err) {
    logger.error('Audit log failed', err);
  }
}

module.exports = { log };
