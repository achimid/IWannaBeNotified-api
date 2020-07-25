const imgur = require('imgur-upload')
const fs = require('fs')

imgur.setClientID(process.env.IMGUR_CLIENT_ID);

const uploadImage = (filePath) => new Promise((resolve, reject) => {
    imgur.upload(filePath, (err, res) => {
        try {
            if (err) return reject(err)
            return resolve({link: res.data.link, res})            
        } catch (err) {
            return reject(err)            
        }
    })
}) 

const generateImageFilePathName = () => `/tmp/img${process.hrtime()[1]}.png`

const removeImageFileFileSystem = (filePath) =>  fs.unlinkSync(filePath)

module.exports = {
    generateImageFilePathName,
    removeImageFileFileSystem,
    uploadImage
}