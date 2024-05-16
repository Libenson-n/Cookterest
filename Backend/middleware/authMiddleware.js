import jwt from "jsonwebtoken";

//  Middleware function to protect the private endpoints
//  returns a 401 or 403 if the jwt token is missing or invalid
const protect = async (req, res, next) => {
  const token = req.cookies.jwt;
  //  Verify if there is a jwt token in the cookies
  if (!token) {
    return res
      .status(401)
      .json({ status: 401, message: "Not authorized token is required" });
  }
  try {
    //  Verify if the jwt token is still valid
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ status: 403, message: "Error token is invalid!" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
    res.clearCookie("jwt");
  }
};

export { protect };
