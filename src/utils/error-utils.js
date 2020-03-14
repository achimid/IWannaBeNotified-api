const sendError = (res) => async (err) => {
    console.log('Error >>>>>>>>>>> ', err)
    let message = 'Ocorreu um erro inesperado'
    if (err.message) {
        message = err.message
    }
    return res.status(500).json({error: message})
}

module.exports = sendError