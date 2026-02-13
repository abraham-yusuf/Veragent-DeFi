/**
 * Veragent DeFi Agent Configuration Types
 * Defines the structure for ElizaOS + OpenClaw agent templates.
 */

export interface AgentConfig {
  name: string;
  specialization: AgentSpecialization;
  riskTolerance: RiskLevel;
  assets: string[];
  description: string;
  personality: string;
}

export type AgentSpecialization =
  | "yield_farming"
  | "trading"
  | "rebalancing"
  | "risk_hedging";

export type RiskLevel = "low" | "medium" | "high";

export interface AgentAction {
  type: string;
  params: Record<string, unknown>;
  timestamp: number;
}

export interface AgentState {
  agentId: string;
  config: AgentConfig;
  actions: AgentAction[];
  isActive: boolean;
  createdAt: number;
}
