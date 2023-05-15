import { db } from "../database/database.js";
import { postRentalSchema } from "../schemas/postRentalSchema.js";

export async function postRentals(req, res){
    const {customerId, gameId, daysRented} = req.body;
    const validation = postRentalSchema.validate(req.body);
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const rentDate = `${year}-${month}-${day}`;
    if(validation.error){
        return res.status(400).send(validation.error);
    }
    try {
        const customer = await db.query(`SELECT * FROM customers WHERE Id = '${customerId}';`);
        if(!customer.rows[0]){
            return res.sendStatus(400);
        }
        const game = await db.query(`SELECT * FROM games WHERE Id = '${gameId}';`);
        if(!game.rows[0]){
            return res.sendStatus(400);
        }
        const rental = await db.query(`SELECT * FROM rentals WHERE "gameId"=${gameId}`);
        const rental_length = rental.rowCount;
        const available = game.rows[0].stockTotal;
        const price = game.rows[0].pricePerDay;
        console.log(price);
        if(available === rental_length){
           return res.sendStatus(400);
        }
        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ('${customerId}','${gameId}','${rentDate}','${daysRented}',${null},${daysRented * price},${null});`)
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }

}

export async function getRental(req, res){
    try {
        const rental = await db.query(`SELECT * FROM rentals`);
        const game = await db.query(`SELECT * FROM games`);
        const customer = await db.query(`SELECT * FROM customers`);
        let array = [];
        console.log(rental.rows[0].customerId)
        rental.rows.map((e) => {
            const indexCustomer = customer.rows.findIndex(obj => obj.id === e.customerId);
            const indexGame = game.rows.findIndex(obj => obj.id === e.gameId);
            const intoArray = {
                id: e.id,
                customerId: e.customerId,
                gameId: e.gameId,
                rentDate: e.rentDate,
                daysRented: e.daysRented,
                returnDate: e.returnDate,
                originalPrice: e.originalPrice,
                delayFee: e.delayFee,
                customer: {
                 id: e.customerId,
                 name: customer.rows[indexCustomer].name
                },
                game: {
                 id: e.gameId,
                 name: game.rows[indexGame].name
                }           
            }
            array.push(intoArray)
        })
        return res.send(array);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}