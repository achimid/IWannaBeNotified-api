/**
 * Endpoint para efetuar buscar o usuário pelo JWT
 *
 * @group User
 * @route GET /api/v1/user/current  
 * @returns {Success} 200 - OK
 */

/**
 * Endpoint para efetuar o login do usuário
 *
 * @group User
 * @route POST /api/v1/user/login  
 * @returns {Success} 200 - OK
 */

/**
 * Endpoint para criação de usuário
 *
 * @group User
 * @route POST /api/v1/user 
 * @param {User.model} user.body.required - Body do usuário
 * @returns {Success} 200 - OK
 */

/**
 * Endpoint para adicionar uma notificação para o usuario
 *
 * @group User
 * @route GET /api/v1/user/{id}/notifications
 * @param {number} id.path.required Id do Usuário
 * @returns {User.model} 200 - OK
 */