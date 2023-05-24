import ProductService from "../services/product.service.js";

const productService = new ProductService();

class ProductController {

  async getPaginatedProducts(req, res) {
    try {
      const options = {
          query: {},
          pagination: {
          limit: req.query.limit ?? 10,
          page: req.query.page ?? 1,
          sort: {},
        },
      };

      if (req.query.category) {
        options.query.category = req.query.category;
      }

      if (req.query.status) {
        options.query.status = req.query.status;
      }

      if (req.query.sort) {
        options.pagination.sort.price = req.query.sort;
      }

      const result = await productService.getPaginatedProducts(options);

      const {
        docs: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
      } = result;

      const link = "/products?page=";
      const prevLink = hasPrevPage ? link + prevPage : link + page;
      const nextLink = hasNextPage ? link + nextPage : link + page;

      return res.send({
        status: "success",
        payload: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasNextPage,
        hasPrevPage,
        prevLink,
        nextLink,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const productId = req.params.pid;
      const product = await productService.getProductById(productId);

      if (!product) {
        return res
          .status(404)
          .send({ status: "Error", error: "Product was not found" });
      }

      return res.send({
        status: "success",
        message: "Product found",
        payload: product,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async addProduct(req, res) {
    try {
      const product = req.body;
      const files = req.files;

      if (!product) {
        return res.status(400).send({
          status: "Error",
          error: "Error, the product could not be added",
        });
      }

      product.thumbnails = [];

      if (files) {
        files.forEach((file) => {
          const imageUrl = `http://localhost:8080/images/${file.filename}`;
          product.thumbnails.push(imageUrl);
        });
      }

      await productService.addProduct(product);

      return res.send({
        status: "success",
        message: "Product successfully added",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = req.params.pid;
      const changes = req.body;

      const updatedProduct = await productService.updateProduct(
        productId,
        changes
      );

      if (!updatedProduct) {
        return res
          .status(404)
          .send({ status: "Error", error: "Product was not found" });
      }

      return res.send({
        status: "success",
        message: "Product successfully updated",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.pid;
      const deletedProduct = await productService.deleteProduct(productId);

      if (!deletedProduct) {
        return res
          .status(404)
          .send({ status: "Error", error: "Product does not exist" });
      }

      return res.send({
        status: "success",
        message: "Product deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default ProductController;





// import ProductManager from "../dao/dbManagers/products.js";
// import { ProductsService } from "../services/product.service.js";

// const manager = new ProductManager();

// export async function getProducts (req,res){      
//   const options = {
//     query: {},pagination: {limit: req.query.limit ?? 10,page: req.query.page ?? 1,sort: {},
//     },
//   };

//   if (req.query.category) {
//     options.query.category = req.query.category;
//   }

//   if (req.query.status) {
//     options.query.status = req.query.status;
//   }

//   if (req.query.sort) {
//     options.pagination.sort.price = req.query.sort;
//   }

//   const {
//     docs: products,
//     totalPages,
//     prevPage,
//     nextPage,
//     page,
//     hasPrevPage,
//     hasNextPage,
//   } = await manager.getPaginatedProducts(options);

//   const link = "/products?page=";

//   const prevLink = hasPrevPage ? link + prevPage : link + page;
//   const nextLink = hasNextPage ? link + nextPage : link + page;

//   return res.send({
//     status: "sucess",
//     payload: products,
//     totalPages,
//     prevPage,
//     nextPage,
//     page,
//     hasNextPage,
//     hasPrevPage,
//     prevLink,
//     nextLink,
//   });
// }

// export async function getProductById (req,res){
//     const productId = req.params.pid;
//   const product = await manager.getProductById(productId);

//   if (!product) {
//     return res
//       .status(404)
//       .send({ status: "Error", error: "product was not found" });
//   }
//   return res.send({
//     status: "sucess",
//     message: "product found",
//     payload: product,
//   });
// }

// export async function addProduct (req,res){
//   const product = req.body;
//   const files = req.files;

//   if (!product) {
//     return res.status(400).send({
//       status: "Error",
//       error: "Error, the product could not be added",
//     });
//   }

//   product.thumbnails = [];

//   if (files) {
//     files.forEach((file) => {
//       const imageUrl = `http://localhost:8080/images/${file.filename}`;
//       product.thumbnails.push(imageUrl);
//     });
//   }

//   await manager.addProduct(product);
//   return res.send({ status: "OK", message: "Product successfully added" });
// }

// export async function updateProduct (req,res){
//     const productId = req.params.pid;
//   const changes = req.body;

//   const updatedProduct = await manager.updateProduct(productId, changes);

//   if (!updatedProduct) {
//     return res
//       .status(404)
//       .send({ status: "Error", error: "product was not found" });
//   }
//   return res.send({
//     status: "OK",
//     message: "Product succesfully updated",
//   });
// }

// export async function deleteProduct (req,res){
//     const productId = req.params.pid;
//     const deletedProduct = await manager.deleteProduct(productId);
  
//     if (!deletedProduct) {
//       return res
//         .status(404)
//         .send({ status: "Error", error: "Product does not exist" });
//     }
//     return res.send({ status: "OK", message: "Product deleted successfully" });
// }

