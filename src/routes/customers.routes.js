import { Router } from "express";
import { postCustomer } from "../controllers/customers.controllers.js";
import { getCustomer } from "../controllers/customers.controllers.js";
import { getCustomerID } from "../controllers/customers.controllers.js";
import { updateCustomer } from "../controllers/customers.controllers.js";

const customerRoutes = Router();

customerRoutes.post("/customers" ,postCustomer);
customerRoutes.get("/customers", getCustomer);
customerRoutes.get("/customers/:id", getCustomerID);
customerRoutes.put("/customers/:id", updateCustomer);


export default customerRoutes;