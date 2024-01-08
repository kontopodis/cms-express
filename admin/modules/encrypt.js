import bcrypt from 'bcrypt'
const saltRounds = 10;

const encryptPassword = async (pass)=>{
    return new Promise((resolve,reject)=>{
         bcrypt.genSalt(saltRounds,function(err, salt) {
             bcrypt.hash(pass, salt,(err, hash)=> {
                if(err){
                    reject(err)
                }else{
                resolve(hash)      
                }
            });
        });
    })


 
}

export default encryptPassword