const sdk = require('@defillama/sdk');
const KUDOE_TOKEN_CONTRACT = '0x5f190f9082878ca141f858c1c90b4c59fe2782c5';
const KUDOE_BOND_CONTRACT = '0x841ce48F9446C8E281D3F1444cB859b4A6D0738C';

async function tvl(_, _1, _2, { api }) {
  const balances = {};

  const collateralBalance = await api.call({
    abi: 'erc20:balanceOf',
    target: KUDOE_TOKEN_CONTRACT,
    params: [KUDOE_BOND_CONTRACT],
  });

  await sdk.util.sumSingleBalance(balances, KUDOE_TOKEN_CONTRACT, collateralBalance, api.chain)

  return balances;
}

module.exports = {
  timetravel: true,
  misrepresentedTokens: false,
  methodology: 'Counts the number of Kudoe tokens in the Kudoe Bonding contract.',
  start: 1000235,
  bsc: {
    tvl,
  }
}; 