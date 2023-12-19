import jwt from "jsonwebtoken";


export const isAuth = (req, res, next) => {
    const token = req.signedCookies.Authorization;

    if(!token){
        return res.status(401).json({
            message: "Not authenticated"
        })
    }


    jwt.verify(token, "xyz123", (err, decoded) => {
        if(err){
            return res.status(401).json({
                message: "Not authenticated"
            })
        }
        req.userId = decoded.id;
        console.log(decoded)
    })

    next();
}
