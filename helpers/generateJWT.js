import pkg from 'jsonwebtoken'
const {sign} = pkg

const generateJWT = ( uid = '')=> {
    return new Promise((resolve, reject) => {
        const payload = {uid} 
        sign(payload, process.env.SECRET_KEY, {
            expiresIn: '3d',
        },(err, token) => {
            if( err ){
                reject(err)
            }
            else{
                resolve(token)
            }
        })
    })
}
export default generateJWT