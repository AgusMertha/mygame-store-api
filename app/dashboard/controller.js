module.exports = {
  index: async(req, res) => {
    try {
      // render view
      res.render('index')
    } catch (error) {
      console.log(error);
    }
  }
}