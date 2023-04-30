const { Product, Brand } = require("../../db");
const { Op } = require("sequelize");

const ERROR = "Error @ Controllers/Products/Products.js";

// GET (ALL) PRODUCTS
const getProducts = async () => {
  try {
    const products = await Product.findAll({
      order: ["name"],
      attributes: [
        "id",
        "name",
        "description",
        "image_url",
        "price",
        "category",
      ],
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
      return "No se encontraron productos";
    }
  } catch (e) {
    console.error(`${ERROR}, getProducts --→ ${e}`);
    return e.message;
  }
};

// POST PRODUCT

const insertProduct = async (data) => {
  let { name, description, image_url, price, brand, category } = data;

  try {
    if (!name || !description || !image_url || !price || !brand || !category) {
      throw new Error("Faltan datos requeridos para crear el producto");
    }

    if (typeof price !== "number" || price <= 0) {
      throw new Error("El precio debe ser un número positivo");
    }

    name = name[0].toUpperCase() + name.slice(1);

    // Buscar la marca existente o crear una nueva
    const [foundOrCreatedBrand] = await Brand.findOrCreate({
      where: { name: brand.name },
      defaults: { logo_url: brand.logo_url },
    });

    // Si se proporcionó un nuevo logo_url, actualizar la marca
    if (brand.logo_url && brand.logo_url !== foundOrCreatedBrand.logo_url) {
      await Brand.update(
        { logo_url: brand.logo_url },
        {
          where: { id: foundOrCreatedBrand.id },
        }
      );
    }

    // Buscar el producto existente con el mismo nombre y marca
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

    // Crear el nuevo producto con la marca encontrada o creada
    const postProduct = await Product.create({
      name,
      description,
      image_url,
      price,
      category,
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
      attributes: [
        "id",
        "name",
        "description",
        "image_url",
        "price",
        "category",
      ],
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
    // Buscar el producto por su ID
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new Error(`No se encontró un producto con el ID '${productId}'`);
    }

    // Actualizar el producto con los nuevos datos
    const { name, description, image_url, price, brand, category } = data;
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
    if (category) {
      product.category = category;
    }
    if (brand) {
      // Buscar la marca existente o crear una nueva
      const [foundOrCreatedBrand] = await Brand.findOrCreate({
        where: { name: brand.name },
        defaults: { logo_url: brand.logo_url },
      });

      // Si se proporcionó un nuevo logo_url, actualizar la marca
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

    // Guardar los cambios en la base de datos
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
