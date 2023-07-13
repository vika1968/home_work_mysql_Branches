"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminById = exports.getAdmins = exports.adminLogin = exports.addAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../../DB/database"));
const addAdmin = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    database_1.default.query(`SELECT * FROM admin WHERE email = ?`, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        const hashedPassword = bcryptjs_1.default.hashSync(password);
        database_1.default.query(`INSERT INTO admin (email, password) VALUES (?, ?)`, [email, hashedPassword], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
            const id = results.insertId;
            const token = jsonwebtoken_1.default.sign({ id }, process.env.SECRET_KEY, {
                expiresIn: "7d",
            });
            return res.status(201).json({ message: "Admin created", token, id });
        });
    });
};
exports.addAdmin = addAdmin;
const adminLogin = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    database_1.default.query(`SELECT * FROM admin WHERE email = ?`, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: "Admin not found" });
        }
        const existingAdmin = results[0];
        const isPasswordCorrect = bcryptjs_1.default.compareSync(password, existingAdmin.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect Password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: existingAdmin.id }, process.env.SECRET_KEY, {
            expiresIn: "7d",
        });
        return res.status(200).json({ message: "Authentication Complete", token, id: existingAdmin.id });
    });
};
exports.adminLogin = adminLogin;
const getAdmins = (req, res) => {
    database_1.default.query(`SELECT * FROM admin`, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.status(200).json({ admins: results });
    });
};
exports.getAdmins = getAdmins;
const getAdminById = (req, res) => {
    const id = req.params.id;
    database_1.default.query(`SELECT * FROM admins WHERE id = ?`, [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (results.length === 0) {
            console.log("Cannot find Admin");
            return res.status(404).json({ message: "Cannot find Admin" });
        }
        const admin = results;
        return res.status(200).json({ admin });
    });
};
exports.getAdminById = getAdminById;
