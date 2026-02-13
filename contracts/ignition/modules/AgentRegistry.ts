import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("AgentRegistryModule", (m) => {
  const registry = m.contract("AgentIdentityRegistry");
  const resolver = m.contract("AgentNameResolver", [registry]);

  return { registry, resolver };
});
