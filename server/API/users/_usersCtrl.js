"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getBookingsOfUser = exports.login = exports.deleteUser = exports.updateUser = exports.singup = exports.getAllUsers = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const app = (0, express_1.default)();
const database_1 = __importDefault(require("../../DB/database"));
//console.log(connection)
// export async function register(req: express.Request, res: express.Response) {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       throw new Error("Not all fields are available from req.body");
//     const { error } = UserValidation.validate({ email, password });
//     if (error) throw error;
//     const salt = bcrypt.genSaltSync(saltRounds);
//     const hash = bcrypt.hashSync(password, salt);
//     const userDB = new UserModel({ email, password: hash });
//     await userDB.save();
//     //creating cookie
//     const cookie = { userId: userDB._id };
//     const secret = process.env.JWT_SECRET;
//     if (!secret) throw new Error("Couldn't load secret from .env");
//     const JWTCookie = jwt.encode(cookie, secret);    
//     if (userDB) {
//       res.cookie("userID", JWTCookie);
//       res.send({ success: true, userDB });
//     } else {
//       res.send({ success: false });
//     }
//   } catch (error: any) {
//     res.status(500).send({ error: error.message });
//   }
// }
// export async function login(req: express.Request, res: express.Response) {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       throw new Error("Not all fields are available from req.body");
//     const userDB = await UserModel.findOne({ email });
//     if (!userDB) throw new Error("User with that email can't be found");
//     if (!userDB.password) throw new Error("No password in DB");
//     const isMatch = await bcrypt.compare(password, userDB.password);
//     if (!isMatch) throw new Error("Email or password do not match");
//     //creating cookie
//     const cookie = { userId: userDB._id };
//     const secret = process.env.JWT_SECRET;
//     if (!secret) throw new Error("Couldn't load secret from .env");
//     const JWTCookie = jwt.encode(cookie, secret);
//     res.cookie("userID", JWTCookie);
//     res.send({ success: true, userDB });
//   } catch (error: any) {
//     res.status(500).send({ success: false, error: error.message });
//   }
// }
// export async function getUser(req: express.Request, res: express.Response) {
//   try {
//     const secret = process.env.JWT_SECRET;
//     if (!secret) throw new Error("Couldn't load secret from .env");
//     const { userID } = req.cookies;
//     if (!userID) throw new Error("Couldn't find user from cookies");
//     const decodedUserId = jwt.decode(userID, secret);
//     const { userId } = decodedUserId;
//     const userDB = await UserModel.findById(userId);
//     if (!userDB) throw new Error(`Couldn't find user id with the id: ${userID}`);
//     userDB.password = undefined;
//     res.send({ userDB });
//   } catch (error:any) {
//     res.status(500).send({ error: error.message });
//   }
// }
// app.get("/api/users/get-all-users", (req: express.Request, res: express.Response) => {
//   try {
//     const query = `SELECT * FROM users`;
//     connection.query(query, (err, results) => {
//       if (err) throw err;
//       const query2 = 'SELECT * FROM vacations'
//       connection.query(query2, (err2, results2) => {
//         try {
//           if (err2) throw err2;
//           res.send({results: results, results2:results2})
//         } catch (error: any) {
//           res.status(500).send({ok: false, error: error.message})
//         }
//       })
//     })
//   } catch (error: any) {
//     res.status(500).send({ok: false, error: error.message})
//   }
// })
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = 'SELECT * FROM `movie-booking`.`users`';
            database_1.default.query(query, (err, results) => {
                try {
                    if (err)
                        throw err;
                    res.send({ results });
                    console.log({ results });
                }
                catch (error) {
                    res.status(500).send({ error: error.message });
                }
            });
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
}
exports.getAllUsers = getAllUsers;
const singup = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    const user = { userID: 0, name, email, password: hashedPassword };
    database_1.default.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Unexpected Error Occured" });
        }
        return res.status(201).json({ id: result.insertId });
    });
};
exports.singup = singup;
const updateUser = (req, res) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    database_1.default.query('UPDATE users SET name=?, email=?, password=? WHERE userID=?', [name, email, hashedPassword, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Something went wrong" });
        }
        return res.status(200).json({ message: "Updated Successfully" });
    });
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const id = req.params.id;
    database_1.default.query('DELETE FROM users WHERE userID=?', id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Something went wrong" });
        }
        return res.status(200).json({ message: "Deleted Successfully" });
    });
};
exports.deleteUser = deleteUser;
const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    database_1.default.query('SELECT * FROM users WHERE email=?', email, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Something went wrong" });
        }
        if (!result) {
            return res.status(404).json({ message: "Unable to find user from this ID" });
        }
        const isPasswordCorrect = bcrypt_1.default.compareSync(password, result.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect Password" });
        }
        return res.status(200).json({ message: "Login Successful", id: result[0].id });
    });
};
exports.login = login;
const getBookingsOfUser = (req, res) => {
    const id = req.params.id;
    const query = `
      SELECT * FROM booking WHERE user_id = ?`;
    database_1.default.query(query, [id], (err, rows) => {
        if (err) {
            console.log('Error retrieving bookings:', err);
            res.status(500).json({ message: 'Unable to get bookings' });
        }
        else {
            let bookings;
            if (Array.isArray(rows)) {
                bookings = rows.map((row) => {
                    return {
                        id: row.id,
                        movieId: row.movie_id,
                        userId: row.user_id,
                        // ... map other properties here
                    };
                });
            }
            else {
                bookings = [];
            }
            res.status(200).json({ bookings });
        }
    });
};
exports.getBookingsOfUser = getBookingsOfUser;
//   export const getUserById = async (req: express.Request, res: express.Response) => {
//     const id = req.params.id;
//     let user;
//     try {
//       user = await User.findById(id);
//     } catch (err) {
//       return console.log(err);
//     }
//     if (!user) {
//       return res.status(500).json({ message: "Unexpected Error Occured" });
//     }
//     return res.status(200).json({ user });
//   };
const getUserById = (req, res) => {
    const id = req.params.id;
    database_1.default.query(`SELECT * FROM users WHERE userID = ?`, [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (results.length === 0) {
            console.log("Invalid Movie ID");
            return res.status(404).json({ message: "Invalid user ID" });
        }
        const user = results;
        return res.status(200).json({ user });
    });
};
exports.getUserById = getUserById;
