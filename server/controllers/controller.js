function Controller(Service) {
  const getPosts = async (req, res) => {
    try {
      const result = await Service.retrievePosts();
      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).end();
    }
  };

  return {
    getPosts,
  };
}

module.exports = Controller;
