/**
 * Endpoint to get a notify with populate user
 *
 * @group notify
 * @route GET /notify/{id}
 * @param {number} id.path.required notify identifier
 * @returns {notify.model} 200 - OK
 * @return  {Error} default - Unexpected error
 */

/**
 * Endpoint to get a notify
 *
 * @group notify
 * @route GET /notify/cnpj/{cnpj}
 * @param {string} cnpj.path.required notify identifier
 * @returns {notify.model} 200 - OK
 * @return  {Error} default - Unexpected error
 */

/**
 * Endpoint to add notify
 *
 * @group notify
 * @route POST /notify
 * @returns {notify.model} 200 - OK
 * @return  {Error} default - Unexpected error
 */

/**
 * Endpoint to edit notify
 *
 * @group notify
 * @route PUT /notify
 * @param {notify} Product identifier
 * @returns {Success} 200 - OK
 * @return  {Error} default - Unexpected error
 */
/**
 * Endpoint to revindicate organization ownership
 *
 * @group notify
 * @route POST /notify/revindication/request
 * @returns {notify.model} 200 - OK
 * @return  {Error} default - Unexpected error
 */
/**
 * Endpoint to get all revindications
 *
 * @group notify
 * @route GET /notify/revindication
 * @returns {Revindication.model} 200 - OK
 * @return  {Error} default - Unexpected error
 */
/**
 * Endpoint to get all revindications approved
 *
 * @group notify
 * @route GET /notify/revindication/approved/{approved}
 * @param {string} cnpj.path.required notify identifier
 * @returns {Revindication.model} 200 - OK
 * @return  {Error} default - Unexpected error
 */

/**
 * Endpoint to approve or deny revindication
 *
 * @group notify
 * @route PUT /notify/
 * @returns {notify.model} 200 - OK
 * @return  {Error} default - Unexpected error
 */