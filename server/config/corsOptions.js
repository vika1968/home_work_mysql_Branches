"use strict";
// import { allowedOrigins } from "./allowedOrigins";
// export const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS!"));
//     }
//   },
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
//   credentials: true,
//   optionsSuccessStatus: 200,
// };
const allowedOrigins_1 = require("./allowedOrigins");
exports.corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins_1.allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS!"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
