import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("AgentIdentityRegistry", function () {
  async function deployRegistryFixture() {
    const [owner, user1, user2] = await ethers.getSigners();
    const registry = await ethers.deployContract("AgentIdentityRegistry");
    return { registry, owner, user1, user2 };
  }

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      const { registry } = await deployRegistryFixture();
      expect(await registry.name()).to.equal("Veragent Identity");
      expect(await registry.symbol()).to.equal("VRAGENT");
    });

    it("Should set the deployer as owner", async function () {
      const { registry, owner } = await deployRegistryFixture();
      expect(await registry.owner()).to.equal(owner.address);
    });

    it("Should start with zero agents", async function () {
      const { registry } = await deployRegistryFixture();
      expect(await registry.totalAgents()).to.equal(0n);
    });
  });

  describe("Agent Registration", function () {
    it("Should register a new agent", async function () {
      const { registry, user1 } = await deployRegistryFixture();

      await expect(
        registry.registerAgent(user1.address, "yieldmaster", "yield_farming", "ipfs://metadata1")
      )
        .to.emit(registry, "AgentRegistered")
        .withArgs(1n, user1.address, "yieldmaster", "yield_farming");

      expect(await registry.totalAgents()).to.equal(1n);
      expect(await registry.ownerOf(1n)).to.equal(user1.address);
    });

    it("Should store agent identity data correctly", async function () {
      const { registry, user1 } = await deployRegistryFixture();
      await registry.registerAgent(user1.address, "tradebot", "trading", "ipfs://metadata2");

      const agent = await registry.agents(1n);
      expect(agent.name).to.equal("tradebot");
      expect(agent.specialization).to.equal("trading");
      expect(agent.reputationScore).to.equal(0n);
      expect(agent.active).to.equal(true);
    });

    it("Should reject duplicate agent names", async function () {
      const { registry, user1, user2 } = await deployRegistryFixture();
      await registry.registerAgent(user1.address, "myagent", "trading", "ipfs://meta1");

      await expect(
        registry.registerAgent(user2.address, "myagent", "yield_farming", "ipfs://meta2")
      ).to.be.revertedWithCustomError(registry, "AgentNameTaken");
    });

    it("Should reject empty agent names", async function () {
      const { registry, user1 } = await deployRegistryFixture();
      await expect(
        registry.registerAgent(user1.address, "", "trading", "ipfs://meta")
      ).to.be.revertedWithCustomError(registry, "EmptyName");
    });

    it("Should look up agent by name", async function () {
      const { registry, user1 } = await deployRegistryFixture();
      await registry.registerAgent(user1.address, "sniper", "yield_farming", "ipfs://meta");

      const [tokenId, identity] = await registry.getAgentByName("sniper");
      expect(tokenId).to.equal(1n);
      expect(identity.name).to.equal("sniper");
      expect(identity.specialization).to.equal("yield_farming");
    });
  });

  describe("Reputation Management", function () {
    it("Should update reputation score", async function () {
      const { registry, owner, user1 } = await deployRegistryFixture();
      await registry.registerAgent(user1.address, "bot1", "trading", "ipfs://meta");

      await expect(registry.updateReputation(1n, 8500n))
        .to.emit(registry, "ReputationUpdated")
        .withArgs(1n, 0n, 8500n);

      const agent = await registry.agents(1n);
      expect(agent.reputationScore).to.equal(8500n);
    });

    it("Should reject reputation above 10000", async function () {
      const { registry, user1 } = await deployRegistryFixture();
      await registry.registerAgent(user1.address, "bot2", "trading", "ipfs://meta");

      await expect(
        registry.updateReputation(1n, 10001n)
      ).to.be.revertedWithCustomError(registry, "InvalidReputationScore");
    });

    it("Should only allow owner to update reputation", async function () {
      const { registry, user1 } = await deployRegistryFixture();
      await registry.registerAgent(user1.address, "bot3", "trading", "ipfs://meta");

      await expect(
        registry.connect(user1).updateReputation(1n, 5000n)
      ).to.be.revertedWithCustomError(registry, "OwnableUnauthorizedAccount");
    });
  });

  describe("Agent Lifecycle", function () {
    it("Should deactivate an agent", async function () {
      const { registry, user1 } = await deployRegistryFixture();
      await registry.registerAgent(user1.address, "agent1", "trading", "ipfs://meta");

      await expect(registry.connect(user1).deactivateAgent(1n))
        .to.emit(registry, "AgentDeactivated")
        .withArgs(1n);

      const agent = await registry.agents(1n);
      expect(agent.active).to.equal(false);
    });

    it("Should reactivate a deactivated agent", async function () {
      const { registry, user1 } = await deployRegistryFixture();
      await registry.registerAgent(user1.address, "agent2", "yield_farming", "ipfs://meta");

      await registry.connect(user1).deactivateAgent(1n);
      await expect(registry.connect(user1).reactivateAgent(1n))
        .to.emit(registry, "AgentReactivated")
        .withArgs(1n);

      const agent = await registry.agents(1n);
      expect(agent.active).to.equal(true);
    });

    it("Should only allow agent owner to deactivate", async function () {
      const { registry, user1, user2 } = await deployRegistryFixture();
      await registry.registerAgent(user1.address, "agent3", "trading", "ipfs://meta");

      await expect(
        registry.connect(user2).deactivateAgent(1n)
      ).to.be.revertedWith("Not agent owner");
    });
  });
});
