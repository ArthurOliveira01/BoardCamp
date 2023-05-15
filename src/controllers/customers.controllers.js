import { db } from "../database/database.js";
import { postCustomerSchema } from "../schemas/postCustomerSchema.js";

export async function postCustomer(req, res){
    const {name, phone, cpf, birthday} = req.body;
    const validation = postCustomerSchema.validate(req.body);
    if(validation.error){
        return res.status(400).send(validation.error);
    }

    try {
        const exists = await db.query(`SELECT * FROM customers WHERE cpf = '${cpf}';`);
        if(exists.rows[0]){
            console.log('repetiu');
            return res.sendStatus(409);
        }
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES('${name}', '${phone}', '${cpf}', '${birthday}');`);
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getCustomer(req, res){
    try {
        const collection = await db.query(`SELECT * FROM customers`);
        collection.rows.forEach(e => {
            e.birthday = new Date(e.birthday).toISOString().split('T')[0]
        })
        
        return res.status(200).send(collection.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getCustomerID(req, res){
    const {id} = req.params;
    try {
        const exists = await db.query(`SELECT * FROM customers WHERE Id = '${id}';`);
        if(!exists.rows[0]){
            return res.sendStatus(404);
        }
        const front = {
            id: exists.rows[0].id,
            name: exists.rows[0].name,
            phone: exists.rows[0].phone,
            cpf: exists.rows[0].cpf,
            birthday: exists.rows[0].birthday.toISOString().split('T')[0]
        }
        return res.status(200).send(front);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function updateCustomer(req, res){
    const {name, phone, cpf, birthday} = req.body;
    const {id} = req.params;
    const exists = await db.query(`SELECT * FROM customers WHERE Id = '${id}';`);
    if(!exists.rows[0]){
        return res.sendStatus(404);
    }
    const validation = postCustomerSchema.validate(req.body);
    if(validation.error){
        return res.status(400).send(validation.error);
    }
    try {
        const check = await db.query(`SELECT * FROM customers WHERE cpf = '${cpf}' AND Id != ${id};`);
        if(check.rows[0]){
            console.log('repetiu');
            return res.sendStatus(409);
        }
        await db.query(`UPDATE customers SET name = '${name}', phone = '${phone}', cpf = '${cpf}', birthday = '${birthday}' WHERE Id = '${id}';`);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}