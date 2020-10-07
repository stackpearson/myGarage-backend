const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const Users = require('../users/users-model.js');

router.get('/', (req, res) => {
    res.json({authRouter: 'up'});
})

router.post('/register', async (req, res, next) => {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const creds = req.body
    const hash = bcryptjs.hashSync(creds.password, rounds);
    creds.password = hash;

    try {
        const saved = await Users.add(creds)
        const token = generateToken(saved)
        res.status(200).json({id: saved.id, username: saved.username, token: token});

        
    } catch (err) {
        next({apiCode:500, apiMessage:'error registering', err})
    }
})

router.post('/login', async (req, res, next) => {
    let {username, password} = req.body;

    const [user] = await Users.findBy({username});
    console.log(user)

    try {
        if (user && bcryptjs.compareSync(password, user.password)) {
            const token = generateToken(user)
            res.status(200).json({id: user.id, username: user.username, token: token})
        } else {
            next({apiCode: 401, apiMessage: 'You shall not pass'})
        }
    } catch(err) {
        next({apiCode: 500, apiMessage: 'error logging in', ...err})
    }
})



function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };

    const secret = process.env.JWT_SECRET || 'secret stringy thingy';
    const options = {
        expiresIn: '1d'
    };

    const token = jwt.sign(payload, secret, options);

    return token;
}


module.exports = router;