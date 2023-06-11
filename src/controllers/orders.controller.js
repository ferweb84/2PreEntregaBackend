import { orderService } from "../services/index.js";

export async function getOrders(req,res){
    try {
        const orders = await orderService.getOrders()
        return res.send ({ status: "success", payload:orders});       
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function getOrderById(req,res){
    try {
        const id = req.params.oid;
        const order= await orderService.getOrderById(id);
        if (!order)
        return res
        .status(404)
        .send({ status: "error", error: "order does not exist" });
        return res.send ({ status: "success", payload:order});       
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function createOrder(req,res){
    try {
        const {userId, businessId,  products} =req.body;
        const order= {
            userId, 
            businessId, 
            products,
        }
        const result= await orderService.createOrder(order);
        return res.send ({ status: "success", result});       
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function resolveOrder(req,res){
    try {
        const id = req.params.oid;
        const status = req.body;

        const result = await orderService.resolveOrder(id, status);
        return res.send ({ status: "success", result});       
    } catch (error) {
        console.log(error);
        return null;
    }
}