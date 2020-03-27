const { assert } = require("chai");
const { describe, it } = require("mocha");

const Client = require("../clients/client")();
const Service = require("../services/service").default(Client);

const { retrievePosts } = Service;

describe("Service tests", () => {
  describe("retrieve posts", () => {
    it("retrieve posts", () => {
      assert.equal(retrievePosts(), true);
    });
  });
});
