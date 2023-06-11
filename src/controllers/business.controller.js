import { businessService } from "../services/index.js";

export async function getBusiness(req,res){
    try {
        const businesses = await businessService.getBusinesses();
        return res.send ({ status: "success", payload: businesses});       
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function getBusinessById(req,res){
    try {
        const id = req.params.bid;

        const business = await businessService.getBusinessById(id);
        if (!business)
        return res
        .status(404)
        .send({status:"error", error: "business does not exist"});
        return res.send ({ status: "success", payload: business});       
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function createBusiness(req,res){
    try {
        const { name, products}= req.body;
        const business = {
            name,
            products,
        };
        const result = await businessService.createBusiness(business);
        return res.send ({ status: "success", result });       
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function addProduct(req,res){
    try {

        const businessId = req.params.bid;
        const {product} =req.body;

        const result = await businessService.addProduct(businessId, product);
        return res.send ({ status: "success", result});       
    } catch (error) {
        console.log(error);
        return null;
    }
}