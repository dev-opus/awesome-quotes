import { getBalance } from '../utils';

export const card = ({ quote, author, date, tips, index, address }) => {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <div class="quote-section">
            <div class="quote">
            <p>            
              <span class="quote-sym">&quot;</span>
              ${quote}
              - <a href="https://alfajores-blockscout.celo-testnet.org/address/${address}/transactions" target="_blank"><span class="author">${author}</span></a>
            </p>
            </div>
          </div>
          <div class="quote-details" >
            <p>Added on <span class="date">${date}</span></p>
            <span>Tipped <span class="tips">${tips}</span> ${
    +tips === 1 ? 'time' : 'times'
  }</span>
          </div>

          <form class="tip-form"  action="">
            <div class="make-tips">
              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Enter an amount to tip..."
                required
                class="tip"
              />
              <button class="btn make-tip" data-index="${index}">Tip</button>
            </div>
          </form>
    `;
  return card;
};

export const renderBalance = (balance) => {
  document.querySelector('.balance').textContent = balance;
};

export const renderCharCount = () => {
  const charLimit = document
    .querySelector('textarea')
    .getAttribute('maxlength');
  document.querySelector('.char-remaining').textContent = charLimit;

  document.querySelector('textarea').addEventListener('input', () => {
    document.querySelector('.char-remaining').textContent =
      charLimit - document.querySelector('textarea').value.length;
  });
};

export const renderQuotes = (quotes) => {
  const main = document.querySelector('#main');
  main.innerHTML = '';
  quotes.forEach((quote) => {
    const quoteCard = card(quote);
    main.appendChild(quoteCard);
  });
};

export const reRenderBalance = async (kit) => {
  document.querySelector('.balance').textContent = await getBalance(kit);
};
