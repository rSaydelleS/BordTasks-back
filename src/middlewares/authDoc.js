async function authDocProducao (req, res, next) {
    const { senhaEnv } = req.body;

    if(req.headers.host.includes("localhost") || req.originalUrl !== "/doc/"){
        /*usuário já está no localhost */
        return next()
    }
/*quando a condição do if for aceita o next() faz com que a requisição continue e o site prossiga carregando para o usuário
 quando for barrar o usuário o next não é usada */
    if(senhaEnv === process.env.SWAGGER_SENHA_DOC){
        /*usuário digitou a senha correta para entrar no localhost */
        return next()
    }

    if(senhaEnv){
        /*usuário digitou a senha */
        res.status(401).set('Content-type', 'text/html')/*faz com que o js entenda o que será escrito no send como html */
        res.send(Buffer.from(`
            <form method='post'>
                <p style='red'>Senha incorreta</p>
                <label for='senhaEnv'>Senha da documentação:</label>
                <input type='password' name='senhaEnv' id='senhaEnv'></input>
                <button type='submit'>Entrar</button>
            </form>

        `))
    } else{
        /*usuário ainda não digitou a senha e está no modo produção */
        res.status(200).set('Content-type', 'text/html')/*faz com que o js entenda o que será escrito no send como html */
        res.send(Buffer.from(`
            <form method='post'>
                <label for='senhaEnv'>Senha da documentação:</label>
                <input type='password' name='senhaEnv' id='senhaEnv'></input>
                <button type='submit'>Entrar</button>
            </form>

        `))
    }
}

module.exports = authDocProducao;