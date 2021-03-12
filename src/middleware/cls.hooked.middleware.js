const uuidV4 = require('uuid/v4');
const cls = require('cls-hooked');

module.exports = ns => {
  if (!ns) throw new Error('CLS namespace required');

  return function clsifyMiddleware(req, res, next) {
    ns.bindEmitter(req);
    ns.bindEmitter(res);

    ns.run(() => {
      const traceID = uuidV4();
      cls.getNamespace('sample').set('traceID', traceID);
      next();
    });
  };
};