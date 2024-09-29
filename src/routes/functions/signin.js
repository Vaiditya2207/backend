import logger from "../../logger/index.js";
import getDataByMail from "../../database/sql/functions/getUserByMail.js";
import hash from "../../helpers/hash.js";


export default {
    method: 'post',
    url: '/userSignIn',
    func: async (req, res) => {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({err: 'Bad Request'});
            return;
        }
        try{
            const result = await getDataByMail(email, 'user');
            if(result === false){
                res.status(500).json({err: 'Internal Server Error'});
                return;
            }
            if(result.err){
                res.status(404).json({err: result.err});
                return;
            }

            if(await hash.compare(password, result.password)){
                res.status(200).json({msg: 'User signed in successfully', email: result.email, token: result.id});
                return;
            }
            res.status(401).json({err: 'Unauthorized'});
        } catch(err){
            logger.errLogger(err, 'signin.js');
            console.error('Error in signin.js:', err);
            res.status(500).json({err: 'Internal Server Error'});
            return;
        }
    }
}