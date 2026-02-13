/**
 * Veragent DeFi - Agent Manager
 *
 * Entry point for ElizaOS + OpenClaw agent management.
 * Handles agent creation, registration, and lifecycle management.
 */
import {
  AgentConfig,
  AgentState,
  AgentAction,
} from "./types.js";
import {
  yieldFarmingTemplate,
  tradingTemplate,
  rebalancingTemplate,
} from "./templates/index.js";

export class AgentManager {
  private agents: Map<string, AgentState> = new Map();

  /**
   * Get available agent templates
   */
  getTemplates(): AgentConfig[] {
    return [yieldFarmingTemplate, tradingTemplate, rebalancingTemplate];
  }

  /**
   * Create a new agent from a template or custom config
   */
  createAgent(config: AgentConfig): AgentState {
    const agentId = `agent_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const state: AgentState = {
      agentId,
      config,
      actions: [],
      isActive: true,
      createdAt: Date.now(),
    };

    this.agents.set(agentId, state);
    console.log(`[AgentManager] Created agent: ${config.name} (${agentId})`);
    return state;
  }

  /**
   * Get agent state by ID
   */
  getAgent(agentId: string): AgentState | undefined {
    return this.agents.get(agentId);
  }

  /**
   * List all agents
   */
  listAgents(): AgentState[] {
    return Array.from(this.agents.values());
  }

  /**
   * Record an action for an agent
   */
  recordAction(agentId: string, action: AgentAction): void {
    const state = this.agents.get(agentId);
    if (!state) throw new Error(`Agent ${agentId} not found`);
    if (!state.isActive) throw new Error(`Agent ${agentId} is not active`);

    state.actions.push(action);
  }

  /**
   * Deactivate an agent
   */
  deactivateAgent(agentId: string): void {
    const state = this.agents.get(agentId);
    if (!state) throw new Error(`Agent ${agentId} not found`);

    state.isActive = false;
    console.log(`[AgentManager] Deactivated agent: ${state.config.name} (${agentId})`);
  }
}

// Export templates and types
export { yieldFarmingTemplate, tradingTemplate, rebalancingTemplate };
export type { AgentConfig, AgentState, AgentAction } from "./types.js";
