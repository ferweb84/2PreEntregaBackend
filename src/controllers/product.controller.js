import { productService } from "../services/products.service.js";
import { apiResponser } from "../traits/ApiResponser.js";
import CustomError from "../../errors/CustomError.js";
import { ErrorsCause, ErrorsMessage, ErrorsName } from "../../errors/error.enum.js";


const URL = "http://localhost:8080/images/";

export async function findAll (req, res) {
    try {
      const { limit = 10, page = 1, query = "{}", sort = null } = req.query;

      const { category, status } = JSON.parse(query);

      const filters = {};
      if (category) filters.category = category;
      if (status) filters.status = status;

      const options = { limit, page };
      if (sort) options.sort = sort;

      const result = await productService.findAll(page, filters, options);
      const totalPages = result.totalPages;
      const prevPage = result.hasPrevPage ? result.prevPage : null;
      const nextPage = result.hasNextPage ? result.nextPage : null;
      const hasPrevPage = result.hasPrevPage;
      const hasNextPage = result.hasNextPage;
      const prevLink = prevPage ? `/products?limit=${limit}&page=${prevPage}&query=${query}&sort=${sort}` : null;
      const nextLink = nextPage ? `/products?limit=${limit}&page=${nextPage}&query=${query}&sort=${sort}` : null;
      const payload = result.docs;
      if (result && result.error) {
        return apiResponser.errorResponse(res, result.error, 400); 
      }
      return apiResponser.successResponse(
        res, 
        {
          payload,
          totalPages,
          prevPage,
          nextPage,
          page,
          hasPrevPage,
          hasNextPage,
          prevLink,
          nextLink
        }
      );
    } catch (error) {
      return apiResponser.errorResponse(res, error.message);
    }
};

export async function findOne(req, res) {
    try {
        const { productId } = req.params;
        const result = await productService.findOne(productId);
        if(result && result.errors) {
            return apiResponser.errorResponse(res, result.errors, 400);
        }

        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function createProduct(req, res) {
  try {
    const product = req.body;
    const thumbnails = req.files ? req.files.map(file => `${URL}${file.filename}`) : null;

    if (!thumbnails || thumbnails.length === 0) {
      CustomError.generateCustomError({
        name: ErrorsName.GENERAL_ERROR_NAME,
        message: ErrorsMessage.THUMBNAIL_NOT_UPLOADED_MESSAGE,
        cause: ErrorsCause.THUMBNAIL_NOT_UPLOADED_CAUSE
      });
    }

    product.thumbnails = thumbnails;

    const result = await productService.addProduct(product);
    if (result && result.errors) {
      return apiResponser.errorResponse(res, result.errors, 400);
    }

    return apiResponser.successResponse(res, result);

  } catch (error) {
    return apiResponser.errorResponse(res, error.message);
  }
};

export async function updateProduct(req, res) {
  try {
    const { productId } = req.params;
    const product = req.body;

    const result = await productService.updateProduct(productId, product);
    if(result && result.error) {
      return apiResponser.errorResponse(res, result.error, 400);
    }

    return apiResponser.successResponse(res, result);

  } catch (error) {
    return apiResponser.errorResponse(res, error.message);
  }
};

export async function deleteProduct(req, res) {
  try {
    const { productId } = req.params;
    
    const result = await productService.deleteProduct(productId);
    if(result && result.error) {
      return apiResponser.errorResponse(res, result.error, 400);
    }

    return apiResponser.successResponse(res, `Producto eliminado`);

  } catch (error) {
    return apiResponser.errorResponse(res, error.message);
  }
};
