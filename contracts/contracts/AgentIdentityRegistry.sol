// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AgentIdentityRegistry
 * @dev ERC-8004 compliant Identity Registry for AI agents on Base.
 * Each agent is minted as an ERC-721 NFT with on-chain metadata
 * including reputation score, specialization, and owner info.
 */
contract AgentIdentityRegistry is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    struct AgentIdentity {
        string name;
        string specialization;
        uint256 reputationScore;
        uint256 createdAt;
        bool active;
    }

    mapping(uint256 => AgentIdentity) public agents;
    mapping(string => uint256) private _nameToTokenId;

    event AgentRegistered(uint256 indexed tokenId, address indexed owner, string name, string specialization);
    event ReputationUpdated(uint256 indexed tokenId, uint256 oldScore, uint256 newScore);
    event AgentDeactivated(uint256 indexed tokenId);
    event AgentReactivated(uint256 indexed tokenId);

    error AgentNameTaken(string name);
    error AgentNotActive(uint256 tokenId);
    error InvalidReputationScore(uint256 score);
    error EmptyName();

    constructor() ERC721("Veragent Identity", "VRAGENT") Ownable(msg.sender) {}

    /**
     * @dev Register a new AI agent and mint its identity NFT.
     * @param to Address that will own the agent NFT
     * @param name Human-readable agent name (e.g., "yieldmaster")
     * @param specialization Agent type (e.g., "yield_farming", "trading", "rebalancing")
     * @param tokenURI_ Metadata URI for the agent
     */
    function registerAgent(
        address to,
        string calldata name,
        string calldata specialization,
        string calldata tokenURI_
    ) external returns (uint256) {
        if (bytes(name).length == 0) revert EmptyName();
        if (_nameToTokenId[name] != 0) revert AgentNameTaken(name);

        uint256 tokenId = ++_nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);

        agents[tokenId] = AgentIdentity({
            name: name,
            specialization: specialization,
            reputationScore: 0,
            createdAt: block.timestamp,
            active: true
        });

        _nameToTokenId[name] = tokenId;

        emit AgentRegistered(tokenId, to, name, specialization);
        return tokenId;
    }

    /**
     * @dev Update agent reputation score. Only contract owner can update.
     * @param tokenId The agent's token ID
     * @param newScore New reputation score (0-10000, representing 0-100.00%)
     */
    function updateReputation(uint256 tokenId, uint256 newScore) external onlyOwner {
        if (newScore > 10000) revert InvalidReputationScore(newScore);
        if (!agents[tokenId].active) revert AgentNotActive(tokenId);

        uint256 oldScore = agents[tokenId].reputationScore;
        agents[tokenId].reputationScore = newScore;

        emit ReputationUpdated(tokenId, oldScore, newScore);
    }

    /**
     * @dev Deactivate an agent. Only the agent owner can deactivate.
     * @param tokenId The agent's token ID
     */
    function deactivateAgent(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not agent owner");
        if (!agents[tokenId].active) revert AgentNotActive(tokenId);

        agents[tokenId].active = false;
        emit AgentDeactivated(tokenId);
    }

    /**
     * @dev Reactivate an agent. Only the agent owner can reactivate.
     * @param tokenId The agent's token ID
     */
    function reactivateAgent(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not agent owner");
        require(!agents[tokenId].active, "Agent already active");

        agents[tokenId].active = true;
        emit AgentReactivated(tokenId);
    }

    /**
     * @dev Get agent identity by name.
     * @param name The agent's human-readable name
     */
    function getAgentByName(string calldata name) external view returns (uint256 tokenId, AgentIdentity memory identity) {
        tokenId = _nameToTokenId[name];
        require(tokenId != 0, "Agent not found");
        identity = agents[tokenId];
    }

    /**
     * @dev Get the total number of registered agents.
     */
    function totalAgents() external view returns (uint256) {
        return _nextTokenId;
    }

    // Override required by Solidity for ERC721URIStorage
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
