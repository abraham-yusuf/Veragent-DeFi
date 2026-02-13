export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>🤖 Veragent DeFi Agent Hub</h1>
      <p>Deploy and manage AI agents for DeFi on Base</p>

      <section style={{ marginTop: "2rem" }}>
        <h2>Features</h2>
        <ul>
          <li>🏦 Agent Marketplace — Browse & deploy agents</li>
          <li>🔧 Custom Agent Builder — No-code/low-code templates</li>
          <li>📊 Autonomous Execution & Monitoring</li>
          <li>⭐ Reputation & Trust System (ERC-8004)</li>
          <li>💰 Micropayments via x402</li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Getting Started</h2>
        <p>Connect your wallet to get started with Veragent DeFi.</p>
        <button
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#0052FF",
            color: "white",
            marginTop: "0.5rem",
          }}
        >
          Connect Wallet
        </button>
      </section>
    </main>
  );
}
