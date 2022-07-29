
/*const checkAuth = (req, res, next) => {
    if (req.body.administrador) {
        next();
    } else {
        res.status(403).send({ error: -1, descripcion: `Ruta ${req.url} y/o metodo ${req.method} no autorizados`});
    }
}*/
const checkAuth = (admin)=>{
    return ((req,res,next)=>{
        if (admin === true){
            next();
        } else{
            res.json({error: -1, descripcion: `Ruta '${req.route.path}' Método '${req.route.stack[0].method}' - No Autorizada`})
        }
    })
}
export default checkAuth;