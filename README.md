# De-Fi Contracts with [eip-2535](https://eips.ethereum.org/EIPS/eip-2535)

This repository contains a set of **upgradable** defi smart contracts that share the same storage.
The problem with immutable contracts on Ethereum has always been the cost of migrating to another contract and shipping upgrades. Proxy contracts are a way to get around this but most of them don't provide a way of **retrieving** the contract's storage across multiple upgrades.
![diamond](https://eips.ethereum.org/assets/eip-2535/diamondstorage1.png)

Using low-level assembly and a shared storage paradigm, the Diamond pattern provides a standard for upgradable smart contracts with shared storage. The Diamond also allows for large-scale projects that are suitable for complex De-Fi applications
