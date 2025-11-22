// backend/src/services/auditService.js
const { Log } = require("../../models");
const logger = require("../utils/logger");

async function log(userId, orgId, action, meta = {}) {
  try {
    await Log.create({
      organisation_id: orgId || null,
      user_id: userId || null,
      action,
      meta,
      created_at: new Date(),   // IMPORTANT - your DB uses created_at
    });

    logger.info(
      `${action} - user: ${userId}, org: ${orgId}, meta: ${JSON.stringify(
        meta
      )}`
    );
  } catch (err) {
    logger.error("Audit log failed: " + err.message);
  }
}

module.exports = { log };
