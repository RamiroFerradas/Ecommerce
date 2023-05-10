const { User } = require("../../db");

const ERROR = "Error @ Controllers/Users/index.js";

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (e) {
    console.error(`${ERROR}, getAllUsers --→ ${e}`);
    return e.message;
  }
};

const insertUser = async (data) => {
  try {
    const {
      given_name,
      family_name,
      nickname,
      name,
      picture,
      locale,
      updated_at,
      email,
      email_verified,
      sub,
      role,
      visibility,
    } = data;

    if (!given_name || !family_name || !email) {
      throw new Error("Faltan datos requeridos para crear el usuario");
    }

    // Buscar o crear el usuario en la base de datos
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        given_name,
        family_name,
        nickname,
        name,
        picture,
        locale,
        updated_at,
        email_verified,
        sub,
        role,
        visibility,
      },
    });

    if (!created) {
      console.log(`El usuario con el email ${email} ya existe`);
      return user;
    }

    return user;
  } catch (e) {
    console.error(`${ERROR}, insertUser --→ ${e}`);
    return e.message;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new Error(`No se encontró ningún usuario con el id ${id}`);
    }
    return user;
  } catch (e) {
    console.error(`${ERROR}, getUserById --→ ${e}`);
    return e.message;
  }
};

const updateUser = async (userId, data) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error(`No se encontró un usuario con el ID '${userId}'`);
    }

    const {
      given_name,
      family_name,
      nickname,
      name,
      picture,
      locale,
      updated_at,
      email,
      email_verified,
      sub,
      role,
      visibility,
    } = data;

    if (given_name) {
      user.given_name = given_name;
    }
    if (family_name) {
      user.family_name = family_name;
    }
    if (nickname) {
      user.nickname = nickname;
    }
    if (name) {
      user.name = name;
    }
    if (picture) {
      user.picture = picture;
    }
    if (locale) {
      user.locale = locale;
    }
    if (updated_at) {
      user.updated_at = updated_at;
    }
    if (email_verified) {
      user.email_verified = email_verified;
    }
    if (sub) {
      user.sub = sub;
    }
    if (role) {
      user.role = role;
    }
    if (visibility) {
      user.visibility = visibility;
    }

    await user.save();

    const message = `Usuario con ID '${userId}' actualizado correctamente`;
    return message;
  } catch (e) {
    console.error(`${ERROR}, updateUser --→ ${e}`);
    return e.message;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await getUserById(id);
    await user.destroy();
    return user;
  } catch (e) {
    console.error(`${ERROR}, deleteUser --→ ${e}`);
    return e.message;
  }
};

module.exports = {
  insertUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
};
