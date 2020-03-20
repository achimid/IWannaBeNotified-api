const express = require('express')
const status = require('http-status')
const { sellerValidator, revindicationValidator, revindicationApproveValidator } = require('./seller.validator')
const { validator } = require('../middlewares')
const { protect } = require('../common/security')

const sellerService = require('./seller.service')
const revindicationsService = require('./revindication/revindication.service')

const router = new express.Router()
const prefix = '/seller'

/**
 * Service to get a seller with populate user
 *
 * @group Seller
 * @route GET /seller/{id}
 * @param {number} id.path.required Seller identifier
 * @returns {Seller.model} 200 - OK
 * @return  {Error} default - Unexpected error
 */
router.get(`${prefix}/id/:id`, protect(), (request, response, next) => {

    sellerService
        .findById(request.params.id)
        .then(seller => response.status(status.OK).json({ seller }))
        .catch(next)

})

/**
 * Service to get a seller
 *
 * @group Seller
 * @route GET /seller/cnpj/{cnpj}
 * @param {string} cnpj.path.required Seller identifier
 * @returns {Seller.model} 200 - OK
 * @return  {Error} default - Unexpected error
 */
router.get(`${prefix}/cnpj/:cnpj`, protect(), (request, response, next) => {

    sellerService
        .findByCnpj(request.params.cnpj)
        .then(seller => response.status(status.OK).json({ seller }))
        .catch(next)

})

/**
 * Service to add seller
 *
 * @group Seller
 * @route POST /seller
 * @returns {Seller.model} 200 - OK
 * @return  {Error} default - Unexpected error
 */
router.post(prefix, protect(), validator(sellerValidator), (request, response, next) => {

    sellerService
        .insert(request.body)
        .then(seller => response.status(status.OK).json({ seller }))
        .catch(next)

})

/**
 * Service to edit Seller
 *
 * @group Seller
 * @route PUT /seller
 * @param {Seller} Product identifier
 * @returns {Success} 200 - OK
 * @return  {Error} default - Unexpected error
 */
router.put(prefix, protect(), validator(sellerValidator), (request, response, next) => {

    const register = request.body

    sellerService
        .update(register)
        .then(seller => response.status(status.OK).json({ seller }))
        .catch(next)

})

/**
 * Service to revindicate organization ownership
 *
 * @group Seller
 * @route POST /seller/revindication/request
 * @returns {Seller.model} 200 - OK
 * @return  {Error} default - Unexpected error
 */
router.post(`${prefix}/revindication/request`, protect(), validator(revindicationValidator), (request, response, next) => {

    sellerService
        .revindicate(request.body)
        .then(revindication => response.status(status.OK).json({ revindication }))
        .catch(next)

})

/**
 * Service to get all revindications
 *
 * @group Seller
 * @route GET /seller/revindication
 * @returns {Revindication.model} 200 - OK
 * @return  {Error} default - Unexpected error
 */
router.get(`${prefix}/revindication`, protect(), (request, response, next) => {

    revindicationsService
        .findAll()
        .then(revindication => response.status(status.OK).json({ revindication }))
        .catch(next)

})

/**
 * Service to get all revindications approved
 *
 * @group Seller
 * @route GET /seller/revindication/approved/{approved}
 * @param {string} cnpj.path.required Seller identifier
 * @returns {Revindication.model} 200 - OK
 * @return  {Error} default - Unexpected error
 */
router.get(`${prefix}/revindication/approved/:approved`, protect(), (request, response, next) => {

    revindicationsService
        .findAllByApproved(request.params.approved)
        .then(revindication => response.status(status.OK).json({ revindication }))
        .catch(next)

})

/**
 * Service to approve or deny revindication
 *
 * @group Seller
 * @route PUT /seller/revindicate/confirmation/{id}
 * @returns {Seller.model} 200 - OK
 * @return  {Error} default - Unexpected error
 */
router.put(`${prefix}/revindication/confirmation/:id`, protect(), validator(revindicationApproveValidator), (request, response, next) => {

    const approved = request.body.approved
    const data = {
        approved: approved === 'true' || approved === true,
        id: request.params.id
    }

    revindicationsService
        .approveDenyRevindication(data)
        .then(revindication => response.status(status.OK).json({ revindication }))
        .catch(next)

})

module.exports = {
    SellerResource: router
}
