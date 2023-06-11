import CreateOrderDto from "../dao/dtos/create-order.dto.js";
import { orderRepository, userRepository, businessRepository,} from "../repositories/index.js";
//indenpendency injection 




export default class OrderService {

    getOrders = async function (){
        try {
            const orders = await orderRepository.getOrders();
            return orders;
        } catch (error) {
            console.log(error)
            return null;
        }
    };
    getOrderById = async function (id){
        try {
            const order = await orderRepository.getOrderById(id);
            return order;
        } catch (error) {
            console.log(error)
            return null;
        }
    };
    createOrder = async function (order){
        try {
            const { userId,businessId, products}=order;

//validate if business exists
            const business = await businessRepository.getBusinessById(businessId);
            if(!business) throw new Error ("Business does not exist");
             
//validate if user exists

            const user = await userRepository.getUserById(userId);
            if(!user) throw new Error ("User does not exist");

//validate if business has requested products 
            const businessHasProduct = products.every ((product) => {
                return business.products.includes(product)});
            if (!businessHasProduct)
            throw new Error("Business does not have all the products in your order");

            //TODO: validate if user exist /busnisess exist/ busnisess has requested products
            const orderToCreate = new CreateOrderDto(order);

            const result = await orderRepository.createOrder(orderToCreate);
            return result;
        } catch (error) {
            console.log(error)
            return null;
        }
    };
    resolveOrder = async function (id, status){
        try {
            const orderExists = await orderRepository.getOrderById(id);
            if (!orderExists) throw new Error ("Order does not exist");

            const result = await orderRepository.resolveOrder(id,status);
            return result;
        } catch (error) {
            console.log(error)
            return null;
        }
    };

    
}