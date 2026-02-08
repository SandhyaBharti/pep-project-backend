import { verifyToken} from "../lib/utils.js";

export const verifyUser = (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.includes('Bearer')) {
            return res.status(401).json({
                success: false,
                message: "Please login again"
            });
        }
    
        const token = authHeader.split(" ")[1]
    
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Please login again",
            });
        }
    
        const payload = verifyToken(token);
    
        req.userId = payload.id;
    
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error while verifying user: ${error.message}`,
        })
    }
}

