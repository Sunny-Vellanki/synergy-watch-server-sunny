const jwt = require("jsonwebtoken");

const middleware= (req, res, next) => {

const token = req.header("Authorization");

if (!token) { 
    return res 
    .status(401)
    .json({ error: "No token found, authentication failed ..!" });

}

try {

// checking whether the logged in user and requesting user are same or not req.user verifyeduser;

const verifyeduser = jwt.verify(token, "secretToken");
req.user=verifyeduser;

next();

} catch (error) { 
    console.log(error);
}
};

module.exports = middleware;