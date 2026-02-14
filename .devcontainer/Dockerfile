FROM mcr.microsoft.com/devcontainers/javascript-node:0-24

# Install PNPM globally
RUN npm install -g pnpm

# Git + Python default
RUN apt-get update && \
    apt-get install -y git python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

# Optional: Install Foundry for Solidity development
RUN curl -L https://foundry.paradigm.xyz | bash \
 && ~/.foundry/bin/foundryup

ENV PATH="/root/.foundry/bin:${PATH}"
