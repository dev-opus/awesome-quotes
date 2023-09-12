import BigNumber from 'bignumber.js';
import {
  card,
  reRenderBalance,
  renderBalance,
  renderCharCount,
  renderQuotes,
} from './components';
import {
  connectWallet,
  notification,
  quoteDialog,
  makeTip,
  getQuote,
  getQuotes,
  quotePayload,
  createQuote,
  ERCDecimals,
} from './utils';

let quoteStorage = [];

window.addEventListener('load', async () => {
  const { kit, contract, cusdBalance } = await connectWallet();
  notification.on('⌛ Loading DApp');

  renderBalance(cusdBalance);
  renderCharCount();

  quoteStorage = await getQuotes(contract);
  renderQuotes(quoteStorage);

  document.querySelector('.dialog-btn').addEventListener('click', () => {
    quoteDialog.show();
  });

  document.querySelector('.cancel').addEventListener('click', () => {
    quoteDialog.close();
  });

  document.querySelector('.close-notif').addEventListener('click', () => {
    notification.off();
  });

  document.querySelector('#main').addEventListener('click', async (e) => {
    if (e.target.className.includes('make-tip')) {
      e.preventDefault();
      e.target.previousElementSibling.textContent = '';

      const _tip = +e.target.previousElementSibling.value;

      if (_tip <= 0) {
        notification.on('🚫 Cannot perform a tip with that amount!');
        e.target.previousElementSibling.value = '';
        return;
      }

      const tip = new BigNumber(_tip).shiftedBy(ERCDecimals).toString();
      const index = e.target.dataset.index;

      const error = await makeTip({ kit, contract, tip, index, quoteStorage });

      if (error) {
        notification.on(error);
      }

      const tippedQuote = await getQuote(index, contract);
      quoteStorage[index] = tippedQuote;

      renderQuotes(quoteStorage);
      await reRenderBalance(kit);
    }
  });

  const quoteForm = document.querySelector('.quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const payload = quotePayload();
      quoteDialog.close();

      notification.on('⌛ Adding your quote...');
      try {
        await createQuote(contract, kit, payload);
      } catch (error) {
        notification.on(`🚫 ${error.message}`);
        return;
      }

      const quotes = await getQuotes(contract);
      quoteStorage = quotes;

      renderQuotes(quotes);
      notification.on(`🎉 You've successfully added a Quote!`);
    });
  }

  notification.off();
});
