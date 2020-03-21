
/**
 * @typedef Options
 * @property {integer} _id
 * @property {number} hitTime - Tempo entre as execuções (Defualt: De 3 em 3 minutos)
 * @property {boolean} onlyChanged - Apenas envia a notificação quando o hashTarget for direfente do anterior
 * @property {boolean} onlyUnique - Apenas envia a notificação quando o hashTarget for unico
 * @property {boolean} useJquery - Injeta o JQuery na pagina antes de executar o script
 * @property {number} waitTime - Aguarda uma determinada quantidade de tempo antes da execução do script
 * @property {boolean} isDependency
 * 
 */

/**
 * @typedef SiteRequest
 * @property {integer} _id
 * @property {string} url.required - Url do site para ser monitorado
 * @property {string} name - Nome do site monitorado
 * @property {string} scriptTarget - Script para obter o alvo (Por padrão será o html da pagina)
 * @property {Array.<string>} scriptContent -  Lista de Scripts para obter os conteudos do site
 * @property {Options.model} options -  Opções de execução
 * @property {SiteExecution.model} lastExecution - Resultado da ultima execução
 * @property {Filter.model} filter - Filtro utilizado para busca de palavas similares
 * @property {Array.<Notification>} notifications - Filtro utilizado para busca de palavas similares
 */



/**
 * Endpoint para listar as request cadastradas
 *
 * @group SiteRequest
 * @route GET /api/v1/notify 
 * @returns {SiteRequest.model} 200 - OK
 */

 /**
 * Endpoint para cadastrar uma nova request
 *
 * @group SiteRequest
 * @route POST /api/v1/notify 
 * @returns {SiteRequest.model} 200 - OK
 */


 /**
 * Endpoint para editar uma request
 *
 * @group SiteRequest
 * @route PUT /api/v1/notify/{id}
 * @returns {SiteRequest.model} 200 - OK
 */

 /**
 * Endpoint para executar uma request
 *
 * @group SiteRequest
 * @route POST /api/v1/notify/{id}/execute
 * @returns {SiteRequest.model} 200 - OK
 */