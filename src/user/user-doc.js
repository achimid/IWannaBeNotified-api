
/**
 * @typedef Filter
 * @property {integer} _id
 * @property {string} threshold - Limite de similaridade entre a palavra e o conteudo comparado. Quanto mais proximo de 0 mais exato possivel
 * @property {Array.<string>} word - Palavras para serem utilizadas como filtro
 */

 /**
 * @typedef Telegram
 * @property {integer} _id
 * @property {string} bot_token - Token do bot do telegram para notificação
 * @property {string} chat_id - Chat do usuario no grupo, para disparo
 */

 /**
 * @typedef Webhook
 * @property {integer} _id
 * @property {string} url - Url da aplicação WebHook
 * @property {string} method - Verbo HTTP utilizado para notificação
 */

 /**
 * @typedef Notification
 * @property {integer} _id
 * @property {string} template - 
 * @property {[string]} email - 
 * @property {[string]} sms - 
 * @property {Array.<Telegram>} telegram - 
 * @property {Array.<Webhook>} webhook - 
 * @property {boolean} websocket - 
 */

/**
 * @typedef User
 * @property {integer} _id
 * @property {string} name.required - Nome do usuario
 * @property {string} email.required - Email de autenticação do usuario
 * @property {string} password.required - Senha do usuario
 * @property {boolean} isAdmin - Indica se o usuario é um adiministrador
 * @property {string} telegramChatId - Id do Usuario no Telegram
 * @property {Filter.model} filter - Filtro utilizado para busca de palavas similares
 * @property {Array.<Notification>} notifications - Filtro utilizado para busca de palavas similares
 */
 

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

 /**
 * Endpoint para alterar os parametros de filtragem do usuario
 *
 * @group User
 * @route PUT /api/v1/user/{id}/filter
 * @param {number} id.path.required Id do Usuário
 * @returns {User.model} 200 - OK
 */