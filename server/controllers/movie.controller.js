function MovieController(MovieService) {
  const validateNumber = id => {
    const re = new RegExp("^[0-9]+");
    return re.test(id);
  };

  const getUpcomingMovies = async (req, res) => {
    try {
      const { page } = req.query;

      if (!validateNumber(page)) {
        return res.status(400).json({ error: "invalid page" });
      }

      const result = await MovieService.retrieveUpcomingMovies(page);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  };

  const getMovieDetails = async (req, res) => {
    try {
      const { id } = req.params;

      if (!validateNumber(id)) {
        return res.status(400).json({ error: "invalid movie id" });
      }

      const results = await MovieService.retrieveMovieDetails(id);
      return res.status(200).json(results);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  };

  return {
    getUpcomingMovies,
    getMovieDetails,
  };
}

module.exports = MovieController;
