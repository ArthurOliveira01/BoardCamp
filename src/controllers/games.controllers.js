import { db } from "../database/database.js";
import { postGameSchema } from "../schemas/postGameSchema.js";


export async function postGame(req, res){
    const { name, image, stockTotal, pricePerDay } = req.body;
    const validation = postGameSchema.validate(req.body);
    if(validation.error){
        return res.status(400).send(validation.error);
    }

    try {
        const exists = await db.query(`SELECT * FROM games WHERE name = '${name}';`);
        if(exists.rows[0]){
            console.log('repetiu');
            return res.sendStatus(409);
        }
        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES('${name}', '${image}', '${stockTotal}', '${pricePerDay}');`)
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getGame(req, res){
    try {
        const collection = await db.query(`SELECT * FROM games`);
        return res.status(200).send(collection.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}