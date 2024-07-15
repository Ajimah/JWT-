


const jwt = require('jsonwebtoken');

const CustomAPIError = require('../errors/custom-error')


const login =  async (req, res) => {
    const { username, password } = req.body
     
    console.log(username)
    console.log(password)
    if (!username || !password || username == "" || password == "") {
        throw new CustomAPIError ('please provide a username and password', 400);

    }

    const id = new Date().getDate()

    const token = jwt.sign({id,  username},process.env.JWT_SECRET,{expiresIn:'30days'})

    res.status(200).json({msg:'user created',token})


}


const dashboard = async (req, res) => {

    const authHeader = req.headers.authorization;
    
    
    if (!authHeader || !authHeader.startsWith('bearer  ')) {
        
        console.log(authHeader);
        throw new CustomAPIError ('No token provided', 401)

    }

    const token = authHeader.split('  ')[1]

    try {
    const decoded = jwt.verify(token,process.env.
    JWT_SECRET)
    
  } catch (error) {
    
    throw new CustomAPIError ('Not authorized to access this route', 401)
}



    const luckyNumber = Math.floor(Math.random() *100)

    res.status (200).json ({msg: `hello ,John Doe`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`})
}

module.exports = {
    login, dashboard
}