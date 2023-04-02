function auth(req, res, next) {
    if(!req.session){
        return res.status(401).send({
            success:false,
            message: 'signup'
        })
    }else{
        next()
    }
}
module.exports = auth