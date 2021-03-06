const Config = require("@databases/config");
const Works = require("@databases/works");
const Queue = require("@databases/queue");

exports.getWorkingList = async (req, res, next) => {
  const page = req.params.page;
  const length = 50;
  const start = (page - 1) * length;
  const end = page * length;

  const count = await Queue.getCount();
  const workings = await Queue.getWorkingList(start, end);

  return res.json({ count: count, displayCount: length, lists: workings });
};

exports.reSearchKeyword = async (req, res, next) => {
  const k = req.body.keyword;
  const config = await Config.getSearchConfig();
  for (let engine in config) await Works.createWork(engine, k, config[engine]);

  return res.send({ success: 0 });
};

exports.getAllWorks = async (req, res, next) => {
  const works = await Works.getAllWorks();
  return res.send(works);
};

exports.deleteWorkingById = async (req, res, next) => {
  const id = req.params.id;
  if (!id || id == "") return res.status(412).json({ success: -1 });

  if (id === "all")
    return Queue.removeAllUrl()
      .then(result => res.json({ success: 0 }))
      .catch(err => res.status(500).json({ success: 1 }));
  else
    return Queue.removeUrlById(id)
      .then(result => res.json({ success: 0 }))
      .catch(err => res.status(500).json({ success: 1 }));
};
