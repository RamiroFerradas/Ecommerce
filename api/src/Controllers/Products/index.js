const { Product, Brand } = require("../../db");
const { Op } = require("sequelize");

const ERROR = "Error @ Controllers/Products/index.js";

// GET (ALL) PRODUCTS
const getProducts = async () => {
  try {
    const products = await Product.findAll({
      order: ["name"],
      attributes: ["id", "name", "description", "image_url", "price"],
      include: {
        model: Brand,
        attributes: ["id", "name", "logo_url"],
        as: "brand",
      },
    });
    if (products.length) {
      console.log(`Se encontraron ${products.length} productos`);
      return products;
    } else {
      console.error("No se encontraron productos");
      return [];
    }
  } catch (e) {
    console.error(`${ERROR}, getProducts --→ ${e}`);
    return e.message;
  }
};

// POST PRODUCT

const insertProduct = async (data) => {
  let { name, description, image_url, price, brand } = data;

  try {
    if (!name || !description || !image_url || !price || !brand) {
      throw new Error("Faltan datos requeridos para crear el producto");
    }

    const parsedPrice = parseInt(price, 10);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      throw new Error("El precio debe ser un número positivo");
    }

    name = name[0].toUpperCase() + name.slice(1);

    const [foundOrCreatedBrand] = await Brand.findOrCreate({
      where: { name: brand.name },
      defaults: { logo_url: brand.logo_url },
    });

    if (brand.logo_url && brand.logo_url !== foundOrCreatedBrand.logo_url) {
      await Brand.update(
        { logo_url: brand.logo_url },
        {
          where: { id: foundOrCreatedBrand.id },
        }
      );
    }

    const existingProduct = await Product.findOne({
      where: { name },
      include: [
        { model: Brand, where: { id: foundOrCreatedBrand.id }, as: "brand" },
      ],
    });

    if (existingProduct) {
      throw new Error(
        `Ya existe un producto con el nombre '${name}' y marca '${brand.name}'`
      );
    }

    const postProduct = await Product.create({
      name,
      description,
      image_url,
      price: Number(price),

      brandId: foundOrCreatedBrand.id,
    });

    return `Producto '${name}' creado correctamente`;
  } catch (e) {
    console.error(`${ERROR}, insertProduct --→ ${e}`);
    return e.message;
  }
};

// GET (ONE) PRODUCT BY ID
const getProductsById = async (id) => {
  try {
    const productId = await Product.findOne({
      where: { id },
      attributes: ["id", "name", "description", "image_url", "price"],
      include: {
        model: Brand,
        attributes: ["id", "name", "logo_url"],
        as: "brand",
      },
    });
    if (productId) {
      return productId;
    } else {
      console.log(`No se encontraron productos con el ID: ${id}`);
      return `No se encontraron productos con el ID: ${id}`;
    }
  } catch (e) {
    console.error(`${ERROR}, getProductsById --→ ${e}`);
    return e.message;
  }
};

// UPDATE PRODUCT BY ID/NAME

const updateProduct = async (productId, data) => {
  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new Error(`No se encontró un producto con el ID '${productId}'`);
    }

    const { name, description, image_url, price, brand } = data;
    if (name) {
      product.name = name;
    }
    if (description) {
      product.description = description;
    }
    if (image_url) {
      product.image_url = image_url;
    }
    if (price) {
      product.price = price;
    }

    if (brand) {
      const [foundOrCreatedBrand] = await Brand.findOrCreate({
        where: { name: brand.name },
        defaults: { logo_url: brand.logo_url },
      });

      if (brand.logo_url && brand.logo_url !== foundOrCreatedBrand.logo_url) {
        await Brand.update(
          { logo_url: brand.logo_url },
          {
            where: { id: foundOrCreatedBrand.id },
          }
        );
      }

      product.brandId = foundOrCreatedBrand.id;
    }

    await product.save();

    const message = `Producto con ID '${productId}' actualizado correctamente`;
    return message;
  } catch (e) {
    console.error(`${ERROR}, updateProduct --→ ${e}`);
    return e.message;
  }
};

// GET (ALL) PRODUCT BY NAME
const getProductsByName = async (name) => {
  try {
    const productName = await Product.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    if (productName.length) {
      return productName;
    } else {
      console.log(`No se encontraron productos con el nombre: ${name}`);
      return `No se encontraron productos con el nombre: ${name}`;
    }
  } catch (e) {
    console.error(`${ERROR}, getProductsByName --→ ${e}`);
    return e.message;
  }
};

// DELETE PRODUCT BY ID/NAME
const deleteProduct = async (productId) => {
  try {
    const productToDelete = await Product.findByPk(productId);

    if (!productToDelete) {
      throw new Error(`No se encontró un producto con el ID '${productId}'`);
    }

    await productToDelete.destroy();

    return `Producto con ID '${productId}' eliminado correctamente`;
  } catch (e) {
    console.error(`${ERROR}, deleteProduct --→ ${e}`);
    return e.message;
  }
};

module.exports = {
  getProducts,
  getProductsById,
  getProductsByName,
  insertProduct,
  deleteProduct,
  updateProduct,
};
