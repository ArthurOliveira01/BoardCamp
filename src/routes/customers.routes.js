import { Router } from "express";
import { postCustomer, getCustomer, getCustomerID, updateCustomer } from "../controllers/customers.controllers.js";

const customerRoutes = Router();

customerRoutes.post("/customers" ,postCustomer);
customerRoutes.get("/customers", getCustomer);
customerRoutes.get("/customers/:id", getCustomerID);
customerRoutes.put("/customers/:id", updateCustomer);

export default customerRoutes;