const jwt = require('jsonwebtoken')
const Player = require('../player/model')
const config = require('../../config')

module.exports = {
  isLoginAdmin: (req, res, next) => {
    if(req.session.user == null || req.session.user == undefined){
      res.redirect('/')
    }else{
      next()
    }
  },
  isLoginPlayer: async(req, res, next) => {
    try {
      const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
      const data = jwt.verify(token, config.jwtKey)

      const player = await Player.findOne({_id: data.player.id})

      if(!player){
        throw new Error()
      }

      req.player = player
      req.token = token
      next()
    } catch (error) {
      res.status(401).json({
        message: 'Unauthorized'
      })
    }
  }
}