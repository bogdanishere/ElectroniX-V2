import { RequestHandler } from "express";
import pool from "../../models/db";
import { ResultSetHeader } from "mysql2";

export const deleteOrder: RequestHandler = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const query1 = "DELETE FROM orderdetails WHERE order_id = ?";
    const query2 = "DELETE FROM `order` WHERE order_id = ?";

    const [result1] = await pool.query<ResultSetHeader>(query1, [orderId]);

    const [result2] = await pool.query<ResultSetHeader>(query2, [orderId]);

    if (result1.affectedRows === 0 && result2.affectedRows === 0) {
      return res.status(404).json({
        message: "Nicio comandă nu a fost găsită pentru a fi ștearsă.",
      });
    }

    return res.status(200).json({
      orderId,
      message: "Comanda a fost ștearsă cu succes!",
    });
  } catch (error) {
    next(error);
  }
};
