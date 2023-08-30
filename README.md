# Awesome Quotes
This is a Minimalist Quote Hosting DApp built on the Celo Alfajores Blockchain Network.

## Usage
To use this DApp, you must have the [Celo Extension Wallet](https://docs.celo.org/wallet) installed on your browser.

After installing the wallet, follow the steps below to complete setup:
- Swicth to the Alfajores Testnet in the Celo Extension Wallet
- Visit [celo-faucet](faucet.celo.org/alfajores) to get test tokens

That's it for this section.

## Live (Demo) Link
To interact with the live version of this DApp, simply visit [awesome-quotes](https://dev-opus.github.io/awesome-quotes/).

## Local Deployment
To interact with this DApp on your machine, simply follow the steps below:
- fork this repo
- clone the forked repo to your machine
- `cd` into the directory you cloned the repo to on your machine
- run `npm install` to install all dependencies
- run `npm run dev` to launch the dev server
- in your browser that already has the [Celo Extension Wallet](https://docs.celo.org/wallet) installed,
  vist `http://localhost:3000` to interact with the DApp

**PS:** You must have Node.js [installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) on your machine

**PSS:** If your version of Node.js is >`v16.16.0`, run the following command in your terminal before launching the DApp: 
`export NODE_OPTIONS=--openssl-legacy-provider`

## DApp Functions
Users on this DApp can perform the following actions:
- Host their favourite quote messages
- Tip authours of quotes they find interesting
- Explore an authour's activites on the Celo Blockchain explorer by clicking on their name in Quote's card.

## Contribution
Seen a bug you'd like to fix or thought of a feature improvement you'd to see in this DApp? 

Feel free to fork this repo and open a Pull Request, thanks!
