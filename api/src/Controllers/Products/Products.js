const { Product, Brand } = require("../../db");
const { Op } = require("sequelize");

const ERROR = "Error @ Controllers/Products/Products.js";

// GET (ALL) PRODUCTS
const getProducts = async () => {
  try {
    console.log("product all");
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
      return "No se encontraron productos";
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
    let product = null;
    if (productId && typeof productId === "number") {
      // Buscar el producto por su ID
      product = await Product.findByPk(productId);
    } else if (productId && typeof productId === "string") {
      // Buscar el producto por su nombre
      const brandId = data.brand && data.brand.id;
      const whereClause = { name: productId };
      if (brandId) {
        whereClause.brandId = brandId;
      }
      product = await Product.findOne({ where: whereClause });
    }

    if (!product) {
      throw new Error(
        `No se encontró un producto con el ID o nombre '${productId}'`
      );
    }

    // Actualizar el producto con los nuevos datos
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

    // Comprobar si productId es un número o una cadena
    let message = "";
    if (typeof productId === "number") {
      message = `Producto con ID '${productId}' actualizado correctamente`;
    } else {
      message = `Producto con nombre '${productId}' actualizado correctamente`;
    }

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
const deleteProduct = async (productIdOrName) => {
  try {
    let productToDelete;

    // Verificar si el argumento es un número (ID) o una cadena (nombre)
    if (typeof productIdOrName === "number") {
      // Buscar el producto por ID
      productToDelete = await Product.findByPk(productIdOrName);
    } else if (typeof productIdOrName === "string") {
      // Buscar el producto por nombre
      productToDelete = await Product.findOne({
        where: { name: productIdOrName },
      });
    }

    // Verificar si el producto existe
    if (!productToDelete) {
      throw new Error(`El producto '${productIdOrName}' no existe`);
    }

    // Eliminar el producto
    await productToDelete.destroy();

    return `Producto '${productToDelete.name}' eliminado correctamente`;
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
