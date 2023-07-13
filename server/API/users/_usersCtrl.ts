import express from "express";
import  { UserValidation } from "./userValidator";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
const saltRounds = 10;
const app = express();
import connection from "../../DB/database";


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



export async function getAllUsers(req: express.Request, res: express.Response) {
    try {
        const query = 'SELECT * FROM `movie-booking`.`users`'
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                
                res.send({results})

                console.log({results})
            } catch (error: any) {
                res.status(500).send({error: error.message})
            }
        })
    } catch (error: any) {
        res.status(500).send({error: error.message})
    }
}


interface User {
    userID: number;
    name: string;
    email: string;
    password: string;
  }

  interface UserScheme {
    userID: number;
    name: string;
    email: string;
    password: string;
  }

export default UserScheme
  
  export const singup = (req: express.Request, res: express.Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user: User = { userID: 0, name, email, password: hashedPassword };
    connection.query('INSERT INTO users SET ?', user, (err, result: any) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Unexpected Error Occured" });
      }
      return res.status(201).json({ id: result.insertId });
    });
  };
  
  export const updateUser = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    connection.query('UPDATE users SET name=?, email=?, password=? WHERE userID=?', [name, email, hashedPassword, id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
      }
      return res.status(200).json({ message: "Updated Successfully" });
    });
  };
  
  export const deleteUser = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    connection.query('DELETE FROM users WHERE userID=?', id, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
      }
      return res.status(200).json({ message: "Deleted Successfully" });
    });
  };
  
  export const login = (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    connection.query('SELECT * FROM users WHERE email=?', email, (err, result: any) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
      }     
      if (!result) {
        return res.status(404).json({ message: "Unable to find user from this ID" });
      }
      const isPasswordCorrect = bcrypt.compareSync(password, result.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
      }
      return res.status(200).json({ message: "Login Successful", id: result[0].id });
    });
  };

  interface BookingScheme {
    bookingID: number;
    movieID: number;
    date: Date;
    seatNumber: number;    
    userID: number;
  }
  export const getBookingsOfUser = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const query = `
      SELECT * FROM booking WHERE user_id = ?`;
    connection.query(query, [id], (err, rows) => {
      if (err) {
        console.log('Error retrieving bookings:', err);
        res.status(500).json({ message: 'Unable to get bookings' });
      } else {
        let bookings: any;
        if (Array.isArray(rows)) {
          bookings = rows.map((row: any) => {
            return {
              id: row.id,
              movieId: row.movie_id,
              userId: row.user_id,
              // ... map other properties here
            };
          });
        } else {
          bookings = [];
        }
        res.status(200).json({ bookings });
      }
    });
  };

  
  
  
  
  
  
  

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
  
export const getUserById = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
  
    connection.query(
      `SELECT * FROM users WHERE userID = ?`,
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        
        if ((results as any[]).length === 0) {
          console.log("Invalid Movie ID");
          return res.status(404).json({ message: "Invalid user ID" });
        }
        const user = results;
        return res.status(200).json({ user });
      }
    );
  };
  


