const oracledb = require("oracledb");
const { withOracleConnection } = require("../config/oracle");

async function findByEmail(email) {
  return withOracleConnection(async (conn) => {
    const result = await conn.execute(
      `SELECT id, email, login_name, password_hash, display_name, avatar_url, is_active, created_at, updated_at
       FROM users
       WHERE email = :email`,
      { email },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows?.[0] || null;
  });
}

async function findByLoginName(loginName) {
  return withOracleConnection(async (conn) => {
    const result = await conn.execute(
      `SELECT id, email, login_name, password_hash, display_name, avatar_url, is_active, created_at, updated_at
       FROM users
       WHERE login_name = :login_name`,
      { login_name: loginName },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows?.[0] || null;
  });
}

async function createUser({
  email,
  login_name,
  password_hash,
  display_name,
  avatar_url = null,
  is_active = 1,
}) {
  return withOracleConnection(async (conn) => {
    const result = await conn.execute(
      `INSERT INTO users (email, login_name, password_hash, display_name, avatar_url, is_active)
       VALUES (:email, :login_name, :password_hash, :display_name, :avatar_url, :is_active)
       RETURNING id INTO :id`,
      {
        email,
        login_name,
        password_hash,
        display_name,
        avatar_url,
        is_active: is_active ? 1 : 0,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      },
      { autoCommit: true }
    );

    const id = result.outBinds?.id?.[0];
    return { id, email, login_name, display_name, avatar_url, is_active: !!is_active };
  });
}

module.exports = {
  findByEmail,
  findByLoginName,
  createUser,
};

