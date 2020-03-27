function Service(Client) {
  const retrievePosts = () => {
    return Client.getPosts();
  };

  return {
    retrievePosts,
  };
}

module.exports = Service;
