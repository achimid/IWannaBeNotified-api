const Fuse = require('fuse.js')
const natural = require('natural');
const tokenizer = new natural.WordTokenizer()

const findSimilarity = (fullText, wordsSearch, threshold = 0.1) => {

    const wordsText = tokenizer.tokenize(fullText).map(word => {return {word}})
    
    var options = {
        threshold,
        keys: ['word']
    }

    const fuse = new Fuse(wordsText, options)

    similarities = [...new Set(wordsSearch.map(key => fuse.search(key)).flat().map(({word}) => word))]

    return similarities
}

const hasSimilarity = (fullText, wordsSearch, threshold) => 
    findSimilarity(fullText, wordsSearch, threshold).length

modules.exports = {
    findSimilarity,
    hasSimilarity
}