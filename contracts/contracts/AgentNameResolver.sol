// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./AgentIdentityRegistry.sol";

/**
 * @title AgentNameResolver
 * @dev Resolves agent names to their on-chain identity and wallet addresses.
 * Integrates with ENS/Basenames for human-readable agent naming
 * (e.g., "yieldmaster.base.eth" -> agent address).
 */
contract AgentNameResolver {
    AgentIdentityRegistry public immutable registry;

    mapping(string => address) private _basenameToWallet;
    mapping(address => string) private _walletToBasename;

    event BasenameLinked(uint256 indexed tokenId, string basename, address wallet);
    event BasenameUnlinked(uint256 indexed tokenId, string basename);

    error BasenameAlreadyTaken(string basename);
    error NotAgentOwner();
    error AgentNotFound();
    error EmptyBasename();

    constructor(address registryAddress) {
        registry = AgentIdentityRegistry(registryAddress);
    }

    /**
     * @dev Link a Basename (ENS subdomain) to an agent's wallet address.
     * @param tokenId The agent's token ID in the registry
     * @param basename The ENS/Basename to link (e.g., "yieldmaster.base.eth")
     * @param wallet The wallet address associated with the agent
     */
    function linkBasename(uint256 tokenId, string calldata basename, address wallet) external {
        if (bytes(basename).length == 0) revert EmptyBasename();
        if (_basenameToWallet[basename] != address(0)) revert BasenameAlreadyTaken(basename);

        require(registry.ownerOf(tokenId) == msg.sender, "Not agent owner");

        _basenameToWallet[basename] = wallet;
        _walletToBasename[wallet] = basename;

        emit BasenameLinked(tokenId, basename, wallet);
    }

    /**
     * @dev Unlink a Basename from an agent.
     * @param tokenId The agent's token ID in the registry
     * @param basename The ENS/Basename to unlink
     */
    function unlinkBasename(uint256 tokenId, string calldata basename) external {
        require(registry.ownerOf(tokenId) == msg.sender, "Not agent owner");

        address wallet = _basenameToWallet[basename];
        require(wallet != address(0), "Basename not linked");

        delete _walletToBasename[wallet];
        delete _basenameToWallet[basename];

        emit BasenameUnlinked(tokenId, basename);
    }

    /**
     * @dev Resolve a Basename to its wallet address.
     * @param basename The ENS/Basename to resolve
     */
    function resolve(string calldata basename) external view returns (address) {
        address wallet = _basenameToWallet[basename];
        require(wallet != address(0), "Basename not registered");
        return wallet;
    }

    /**
     * @dev Reverse-resolve a wallet address to its Basename.
     * @param wallet The wallet address to look up
     */
    function reverseResolve(address wallet) external view returns (string memory) {
        string memory basename = _walletToBasename[wallet];
        require(bytes(basename).length > 0, "No basename for wallet");
        return basename;
    }
}
