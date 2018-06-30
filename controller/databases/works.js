const config = require('../../config').config;

const works = require('../../models/works');

var createWork = (engine, keyword, config) => {
    var options = { searchEngine: engine, keyword: keyword, page: config.page.start };
    if (config.mode) {
        for (var mode in config.mode) {
            options.mode = config.mode[mode].name;
            works.create(options);
        }
    } else {
        works.create(options);
    }
}

exports.getAllWorks = (page = null) => {
    if (page == null) return works.find({}).sort('updatedAt').then(works => works).catch(err => console.log(err));
}

exports.insertWork = async (engine, keyword) => {
    const engines = config.engines;

    for (var e in engines) {
        if (e == engine) {
            return works.findOne({ searchEngine: engine, keyword: keyword }).then((already) => {
                if (already == null) {
                    createWork(engine, keyword, engines[e]);
                    return { status: 0 };
                } else {
                    return { status: -1 };
                }
            });
        }
    }

    return { status: -2 };
}