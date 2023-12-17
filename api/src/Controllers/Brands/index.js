const { Brand, Products } = require("../../db");
const { Op } = require("sequelize");

const ERROR = "Error @ Controllers/Brands/index.js";

// GET (ALL) BRANDS
const getBrands = async () => {
  try {
    const brands = await Brand.findAll({
      order: ["name"],
    });
    console.log(`Se encontraron ${brands.length} marcas`);
    return brands;
  } catch (e) {
    console.error(`${ERROR}, getBrands --→ ${e}`);
    return e.message;
  }
};

// POST (ONE) BRAND
const insertBrand = async (data) => {
  try {
    let { name, logo_url } = data;

    if (name) {
      const [row, created] = await Brand.findOrCreate({
        where: {
          name,
        },
        defaults: {
          logo_url,
        },
      });
      if (!created) {
        const [updatedRowsCount] = await Brand.update(
          { logo_url },
          { where: { name } }
        );
        if (updatedRowsCount === 1) {
          return `La marca '${name}' ya existe, se ha actualizado la URL del logo.`;
        } else {
          throw new Error(
            `No se pudo actualizar la URL del logo de la marca '${name}'.`
          );
        }
      } else {
        return `Marca '${name}' creada correctamente con el ID: ${row.id}.`;
      }
    } else {
      console.log(`Faltan datos, revisar: name o logo_url.`);
      return `Faltan datos, revisar: name o logo_url.`;
    }
  } catch (e) {
    console.error(`${ERROR}, insertBrand --→ ${e}`);
    return e.message;
  }
};

// GET (ONE) BRAND BY ID OR NAME
const getBrandById = async (id) => {
  try {
    const brand = await Brand.findOne({
      where: { id },
      attributes: ["id", "name", "logo_url"],
    });

    if (!brand) {
      throw new Error(`No se encontró una marca con el ID '${id}'`);
    }

    return brand;
  } catch (e) {
    console.error(`${ERROR}, getBrandById --→ ${e}`);
    return e.message;
  }
};

// UPDATE (ONE) BRAND BY ID OR NAME
const updateBrand = async (identifier, data) => {
  try {
    let brand;
    if (Number(identifier)) {
      brand = await Brand.findByPk(identifier);
    } else {
      brand = await Brand.findOne({
        where: { name: identifier },
      });
    }

    if (!brand) {
      throw new Error(`No se encontró una marca con el ID ${identifier}`);
    }

    const { name, logo_url } = data;
    if (name) {
      brand.name = name;
    }
    if (logo_url) {
      brand.logo_url = logo_url;
    }

    await brand.save();

    return `Marca con el ID ${identifier} actualizada correctamente`;
  } catch (e) {
    console.error(`${ERROR}, updateBrand --→ ${e}`);
    return e.message;
  }
};

// DELETE (ONE) BRAND BY ID OR NAME
const deleteBrand = async (identifier) => {
  try {
    let brand;
    if (Number(identifier)) {
      brand = await Brand.findByPk(identifier);
    } else {
      brand = await Brand.findOne({
        where: { name: identifier },
      });
    }

    if (!brand) {
      throw new Error(`No se encontró una marca con el ID ${identifier}`);
    }

    await brand.destroy();

    return `Marca con el ID ${identifier} eliminada correctamente`;
  } catch (e) {
    console.error(`${ERROR}, deleteBrand --→ ${e}`);
    return e.message;
  }
};

module.exports = {
  getBrands,
  insertBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
};
