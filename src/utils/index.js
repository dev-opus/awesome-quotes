import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import Erc20Abi from '../../contracts/erc20.abi.json';
import AwesomeQuotesAbi from '../../contracts/awesomequotes.abi.json';

export const ERCDecimals = 18;
export const AQAddress = '0xE86D3A637C378a88523A79094Ff1485e071306A4';
export const cusdAddress = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1';

export const notification = {
  on(promt) {
    document.querySelector('.notification').classList.remove('close');
    document.querySelector('.notification-text').innerHTML = promt;
  },
  off() {
    document.querySelector('.notification').classList.add('close');
  },
};

export const quoteDialog = {
  show() {
    document.querySelector('.quote-dialog').showModal();
  },
  close() {
    document.querySelector('.quote-dialog').close();
  },
};

export const connectWallet = async () => {
  if (window.celo) {
    try {
      notification.on('⚠️ Please approve this DApp to use it.');
      await window.celo.enable();
      notification.off();

      const web3 = new Web3(window.celo);
      const kit = new newKitFromWeb3(web3);

      const accounts = await kit.web3.eth.getAccounts();
      kit.defaultAccount = accounts[0];

      const totalBalance = await kit.getTotalBalance(kit.defaultAccount);
      const cusdBalance = totalBalance.cUSD.shiftedBy(-ERCDecimals).toFixed(2);

      const contract = new kit.web3.eth.Contract(AwesomeQuotesAbi, AQAddress);

      return { kit, contract, cusdBalance };
    } catch (error) {
      notification.on(`🚫 ${error.message}`);
    }
  } else {
    notification.on('⚠️ Please install the cello wallet to use this DApp.');
  }
};

export const quotePayload = () => {
  const author = document.querySelector('#author').value;
  const body = document.querySelector('#quote').value;
  const createdAt = dateFormatter.toUnix(new Date());

  document.querySelector('#author').textContent = '';
  document.querySelector('#quote').textContent = '';

  return [createdAt, author, body];
};

export const createQuote = async (contract, kit, params) => {
  console.log({ contract, kit, params });
  const result = await contract.methods
    .createQuote(...params)
    .send({ from: kit.defaultAccount });
  return result;
};

export const getQuote = async (index, contract) => {
  const quote = await contract.methods.getQuote(index).call();
  return {
    address: quote[0],
    author: quote[1],
    quote: quote[2],
    tips: quote[3],
    date: dateFormatter.toDate(quote[4]),
  };
};

export const getQuotes = async (contract) => {
  const quotesLength = await contract.methods.getQuoteLength().call();
  const quotes = [];

  for (let i = 0; i < quotesLength; i++) {
    const quotePromise = new Promise(async (resolve, reject) => {
      const quote = await contract.methods.getQuote(i).call();
      resolve({
        index: i,
        address: quote[0],
        author: quote[1],
        quote: quote[2],
        tips: quote[3],
        date: dateFormatter.toDate(quote[4]),
      });
    });

    quotes.push(quotePromise);
  }

  return await Promise.all(quotes);
};

export const dateFormatter = {
  toUnix(date) {
    return Math.floor(new Date(date).getTime() / 1000);
  },
  toDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(date * 1000);
  },
};

export const approveTip = async (tip, kit) => {
  const cusdContract = new kit.web3.eth.Contract(Erc20Abi, cusdAddress);
  const result = await cusdContract.methods
    .approve(AQAddress, tip)
    .send({ from: kit.defaultAccount });

  return result;
};

export const makeTip = async ({ kit, contract, tip, index, quoteStorage }) => {
  try {
    notification.on('⌛ Awaiting payment approval...');
    await approveTip(tip, kit);

    notification.on(`⌛ Tipping "${quoteStorage[index].author}"...`);
    await contract.methods
      .tipQuote(index, tip)
      .send({ from: kit.defaultAccount });
    notification.on(
      `🎉 You've successfully tipped "${quoteStorage[index].author}"!`
    );
  } catch (error) {
    return `🚫 ${error.message}`;
  }
};

export const getBalance = async (kit) => {
  const totalBalance = await kit.getTotalBalance(kit.defaultAccount);
  const cusdBalance = totalBalance.cUSD.shiftedBy(-ERCDecimals).toFixed(2);

  return cusdBalance;
};
