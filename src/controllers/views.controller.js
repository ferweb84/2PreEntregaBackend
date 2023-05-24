import ViewsService from "../services/views.services.js";

const viewsService = new ViewsService();

class ViewsController {

  async getHome(req, res) {
    const options = {
      query: {},
      pagination: {
        limit: req.query.limit ?? 10,
        page: req.query.page ?? 1,
        lean: true,
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

    const {
      products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
    } = await viewsService.getPaginatedProducts(options);

    const link = "/?page=";

    const prevLink = hasPrevPage ? link + prevPage : link + page;
    const nextLink = hasNextPage ? link + nextPage : link + page;

    return res.render("home", {
      products,
      totalPages,
      page,
      hasNextPage,
      hasPrevPage,
      prevLink,
      nextLink,
      title: "Products",
      user: req.user,
    });
  }

  async getProduct(req, res) {
    const productId = req.params.pid;
    const product = await viewsService.getProductById(productId);
    res.render("product", { title: "Product Details", product });
  }

  async getCart(req, res) {
    const cart = await viewsService.getCartById("643d6913d5df55e02c93ae45");
    res.render("cart", { products: cart.products, title: "Cart Items" });
  }

  async getRealTimeProducts(req, res) {
    const products = await viewsService.getProducts();
    res.render("realtime-products", {
      products,
      style: "styles.css",
      title: "Real Time Products",
    });
  }

  async getMessages(req, res) {
    const messages = await viewsService.getMessages();
    return res.render("messages");
  }

  getLogin(req, res) {
    res.render("login", { title: "Login" });
  }

  getRegister(req, res) {
    res.render("register", { title: "Register" });
  }

  getCurrentUser(req, res) {
    res.render("profile", { user: req.user });
  }
}

export default ViewsController;
