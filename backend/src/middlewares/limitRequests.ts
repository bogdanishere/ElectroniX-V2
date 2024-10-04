import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;

// import rateLimit from "express-rate-limit";

// function createRateLimiter(windowMinutes: number, maxRequests: number) {
//   return rateLimit({
//     windowMs: windowMinutes * 60 * 1000,
//     max: maxRequests,
//     message:
//       "Too many requests from this IP, please try again after " +
//       windowMinutes +
//       " minutes",
//     standardHeaders: true,
//     legacyHeaders: false,
//   });
// }

// export default createRateLimiter;
