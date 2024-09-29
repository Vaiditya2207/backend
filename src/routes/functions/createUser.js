import logger from "../../logger/index.js";
import createUser from "../../database/sql/functions/createUser.js"


export default({
    method: 'post',
    url: '/createUser',
    func: async (req, res) => {
        if(!req.body.username|| !req.body.email || !req.body.password){
            console.log(req.body);
            res.status(400).json({err: 'Bad Request'});
            return;
        }
        try{
            const result = await createUser(req.body);
            if(result === false){
                res.status(500).json({err: 'Internal Server Error'});
                return;
            }
            res.status(200).json({msg: 'User created successfully', email: req.body.email, token: result.id});
            return;
        }catch(error){
            logger.errLogger(error, 'signup.js');
            console.error('Error in signup.js:', error);
            res.status(500).json({err: 'Internal Server Error'});
            return;
        }
    }
});