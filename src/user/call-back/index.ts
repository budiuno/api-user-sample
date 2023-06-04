module.exports = function makeExpressCallabck (controller, camelcaseKeys) {
  return (req, res) => {
    // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log('ip',ip);
    
    
    const httpRequest = {
      body: camelcaseKeys(req.body,{deep:true}),
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      hostname: req.headers.host,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    }
    controller(httpRequest)
      .then(httpResponse => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers)
        }
        res.type('json')
        res.status(httpResponse.statusCode).send(httpResponse.body)
      })
      .catch(e => {
        res.status(500).send({ error: 'An unkown error occurred.' })
      })
  }
}
