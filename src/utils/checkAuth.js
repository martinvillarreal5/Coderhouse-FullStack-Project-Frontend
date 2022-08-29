
/*const checkAuth = (request, response, next) => {
    if (request.body.administrador) {
        next();
    } else {
        response.status(403).send({ error: -1, descripcion: `Ruta ${request.url} y/o metodo ${request.method} no autorizados`});
    }
}*/
const checkAuth = (admin)=>{
    return ((request,response,next)=>{
        if (admin === true){
            next();
        } else{
            response.json({error: -1, descripcion: `Ruta '${request.route.path}' Método '${request.route.stack[0].method}' - No Autorizada`})
        }
    })
}
export default checkAuth;