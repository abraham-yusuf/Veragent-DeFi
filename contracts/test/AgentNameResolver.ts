import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("AgentNameResolver", function () {
  async function deployResolverFixture() {
    const [owner, user1, user2] = await ethers.getSigners();

    const registry = await ethers.deployContract("AgentIdentityRegistry");
    const resolver = await ethers.deployContract("AgentNameResolver", [
      await registry.getAddress(),
    ]);

    // Register an agent for testing
    await registry.registerAgent(user1.address, "testbot", "trading", "ipfs://meta");

    return { registry, resolver, owner, user1, user2 };
  }

  describe("Basename Linking", function () {
    it("Should link a basename to an agent", async function () {
      const { resolver, user1 } = await deployResolverFixture();

      await expect(
        resolver.connect(user1).linkBasename(1n, "testbot.base.eth", user1.address)
      )
        .to.emit(resolver, "BasenameLinked")
        .withArgs(1n, "testbot.base.eth", user1.address);
    });

    it("Should resolve a basename to wallet address", async function () {
      const { resolver, user1 } = await deployResolverFixture();
      await resolver.connect(user1).linkBasename(1n, "testbot.base.eth", user1.address);

      expect(await resolver.resolve("testbot.base.eth")).to.equal(user1.address);
    });

    it("Should reverse-resolve a wallet to basename", async function () {
      const { resolver, user1 } = await deployResolverFixture();
      await resolver.connect(user1).linkBasename(1n, "testbot.base.eth", user1.address);

      expect(await resolver.reverseResolve(user1.address)).to.equal("testbot.base.eth");
    });

    it("Should reject duplicate basenames", async function () {
      const { registry, resolver, user1, user2 } = await deployResolverFixture();
      await resolver.connect(user1).linkBasename(1n, "taken.base.eth", user1.address);

      await registry.registerAgent(user2.address, "otherbot", "yield_farming", "ipfs://meta2");

      await expect(
        resolver.connect(user2).linkBasename(2n, "taken.base.eth", user2.address)
      ).to.be.revertedWithCustomError(resolver, "BasenameAlreadyTaken");
    });

    it("Should reject empty basenames", async function () {
      const { resolver, user1 } = await deployResolverFixture();

      await expect(
        resolver.connect(user1).linkBasename(1n, "", user1.address)
      ).to.be.revertedWithCustomError(resolver, "EmptyBasename");
    });

    it("Should only allow agent owner to link", async function () {
      const { resolver, user2 } = await deployResolverFixture();

      await expect(
        resolver.connect(user2).linkBasename(1n, "stolen.base.eth", user2.address)
      ).to.be.revertedWith("Not agent owner");
    });
  });

  describe("Basename Unlinking", function () {
    it("Should unlink a basename", async function () {
      const { resolver, user1 } = await deployResolverFixture();
      await resolver.connect(user1).linkBasename(1n, "testbot.base.eth", user1.address);

      await expect(
        resolver.connect(user1).unlinkBasename(1n, "testbot.base.eth")
      )
        .to.emit(resolver, "BasenameUnlinked")
        .withArgs(1n, "testbot.base.eth");

      await expect(resolver.resolve("testbot.base.eth")).to.be.revertedWith(
        "Basename not registered"
      );
    });
  });
});
