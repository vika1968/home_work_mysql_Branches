import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connection from '../../DB/database';


export const addAdmin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  connection.query(`SELECT * FROM admin WHERE email = ?`, [email], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if ((results as any[]).length > 0) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      const hashedPassword = bcrypt.hashSync(password);
      connection.query(
        `INSERT INTO admin (email, password) VALUES (?, ?)`,
        [email, hashedPassword],
        (err, results) => {
          if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
          }
          const id = (results as any).insertId;
          const token = jwt.sign({ id }, process.env.SECRET_KEY as string, {
            expiresIn: "7d",
          });
          return res.status(201).json({ message: "Admin created", token, id });
        }
      );
    }
  );
};


export const adminLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  connection.query(
    `SELECT * FROM admin WHERE email = ?`,
    [email],
    (err, results: any) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(400).json({ message: "Admin not found" });
      }

      const existingAdmin = results[0];
      const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
      }

      const token = jwt.sign({ id: existingAdmin.id }, process.env.SECRET_KEY as string, {
        expiresIn: "7d",
      });
      return res.status(200).json({ message: "Authentication Complete", token, id: existingAdmin.id });
    }
  );
};

export const getAdmins = (req: Request, res: Response) => {
  connection.query(`SELECT * FROM admin`, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ admins: results });
  });
};

export const getAdminById = (req: Request, res: Response) => {
  const id = req.params.id;

  connection.query(
    `SELECT * FROM admins WHERE id = ?`,
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if ((results as any[]).length === 0) {
        console.log("Cannot find Admin");
        return res.status(404).json({ message: "Cannot find Admin" });
      }
      const admin = results;
      return res.status(200).json({ admin });
    }
  );
};