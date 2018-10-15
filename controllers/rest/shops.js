const Shops = require("@databases/shops");
const ShopApi = require("@apis/shops");
const Auth = require("@controllers/auth");

const pageLength = 50;

exports.getShopList = async (req, res, next) => {
  const page = req.params.page;
  const start = (page - 1) * pageLength;
  const end = page * pageLength;

  const count = await Shops.getCount();
  const shops = await Shops.getShopList(start, end);

  return res.json({ count: count, displayCount: pageLength, lists: shops });
};

exports.moveShops = async (req, res, next) => {
  const count = req.body.count;
  const page = req.body.page;

  if (!count) return res.status(412).json({ success: -1 });
  if (!/^[\d]*$/.test(count)) return res.status(412).json({ success: -2 });

  const shops = await Shops.getShopList(count * page, count * (page + 1));

  return ShopApi.updateShopInfo(Auth.getToken(req), shops)
    .then(() => res.json({ success: 0 }))
    .catch(() => res.status(500).json({ success: -1 }));
};

exports.deleteShopById = async (req, res, next) => {
  const id = req.params.id;
  if (!id || id == "") return res.status(412).json({ success: -1 });

  return Shops.removeShopById(id)
    .then(result => res.json({ success: 0 }))
    .catch(err => res.status(500).json({ success: 1 }));
};
