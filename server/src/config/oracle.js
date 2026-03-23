const oracledb = require("oracledb");

let pool;

async function initOracle() {
  if (pool) return pool;

  const user = process.env.ORACLE_USER;
  const password = process.env.ORACLE_PASSWORD;
  const connectString = process.env.ORACLE_CONNECT_STRING;

  if (!user || !password || !connectString) {
    throw new Error(
      "Missing Oracle env vars. Required: ORACLE_USER, ORACLE_PASSWORD, ORACLE_CONNECT_STRING"
    );
  }

  pool = await oracledb.createPool({
    user,
    password,
    connectString,
    poolMin: Number(process.env.ORACLE_POOL_MIN || 0),
    poolMax: Number(process.env.ORACLE_POOL_MAX || 4),
    poolIncrement: Number(process.env.ORACLE_POOL_INC || 1),
  });

  return pool;
}

async function withOracleConnection(fn) {
  if (!pool) await initOracle();
  const conn = await pool.getConnection();
  try {
    return await fn(conn);
  } finally {
    try {
      await conn.close();
    } catch (_) {
      // ignore
    }
  }
}

module.exports = {
  initOracle,
  withOracleConnection,
};

