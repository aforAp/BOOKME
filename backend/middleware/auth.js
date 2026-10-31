import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const authHeader = req.Header.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            message: 'No token Provided'
        })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: decoded.userId};
        next();
    }  catch (error) {
        return res.status(401).json({message: 'Invalid token'});
    }
}

export default auth;