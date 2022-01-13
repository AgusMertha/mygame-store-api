module.exports = {
  index: async(req, res) => {
    try {
      // render view
      res.render('index', {
        name: req.session.user.name
      })
    } catch (error) {
      console.log(error);
    }
  }
}