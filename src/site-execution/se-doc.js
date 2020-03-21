
/**
 * @typedef SiteExecution
 * @property {integer} _id
 * @property {string} url - Url do site executado
 * @property {string} scriptTarget - Script para obter o alvo (Por padrão será o html da pagina) 
 * @property {Array.<string>} scriptContent - Lista de Scripts para obter os conteudos do site
 * @property {boolean} isSuccess - Status da execução
 * @property {boolean} isNotified - Informa se foi efetuada a notificação
 * @property {string} hashTarget - Hash baseado no resultado do scriptTarget
 * @property {string} extractedTarget - Resultado da execução do scriptTarget
 * @property {Array.<Object>} extractedContent - Resultados da execução dos scriptContent
 * @property {string} executionTime - Tempo de execução
 * @property {string} message - Mensagem da execução
 * @property {string} errorMessage - Mensagem de erro caso tenha ocorrido
 * @property {string} userId - Id do Usuario associado a execução
 * 
 */

/**
 * Endpoint para testar a execução de uma request
 *
 * @group SiteExecution
 * @route GET /api/v1/execute 
 * @returns {SiteExecution.model} 200 - OK
 */

/**
 * Endpoint para testar a execução de uma request
 *
 * @group SiteExecution
 * @route POST /api/v1/execute 
 * @returns {SiteExecution.model} 200 - OK
 */
