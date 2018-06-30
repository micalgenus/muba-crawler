const config = require('../../config').config;

const mongoose = require('mongoose');
const works = mongoose.model('works', worksSchema);

exports.getAllWorks = () => {
    return works.find({})
        .then(works => works)
        .catch(err => err);
}

exports.insertWork = (engine, keyword) => {
    const engines = config.engines;

    for (var e in engines) {
        if (e == engine) {
            var already = await works.findOne({ searchEngine: engine, keyword: keyword });
            if (!already) works.create({ searchEngine: engine, keyword: keyword });
            
            break;
        }
    }
}