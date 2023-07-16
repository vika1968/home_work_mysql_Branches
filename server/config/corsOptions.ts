// import { allowedOrigins } from "./allowedOrigins";
// export const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS!"));
//     }
//   },

//   credentials: true,
//   optionsSuccessStatus: 200,
// };

import { allowedOrigins } from "./allowedOrigins";
import { CorsOptions } from "cors";

// export const corsOptions: CorsOptions = {
//   origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
//     if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS!"));
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// export const corsOptions: CorsOptions = {
//   origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS!"));
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

export const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS!"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

