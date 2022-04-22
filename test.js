const usdt = [1000, 2000000];
const zlp = [5000, 10000];


function realRate(amount) {
  const usdt_cont = usdt[1] * usdt[0];
  const out = usdt[1] - usdt_cont / (amount + usdt[0]);
  const zlp_cont = zlp[1] * zlp[0];
  const zlp_amount = zlp[0] - zlp_cont / (out + zlp[1]);

  return zlp_amount / amount;
}

// function realRate(amount) {
//   const usdt_cont = usdt[1] * usdt[0];
//   const out = usdt[1] - usdt_cont / (amount + usdt[0]);

//   return out;
// }

// function realRate2(amount) {
//   numerator = amount * usdt[1];
//   denominator = usdt[0] + amount;
//   result = numerator / denominator;

//   return result;
// }


// const amount = 33;
// console.log(
//   realRate(amount),
//   realRate2(amount)
// );

function virtualRate(amount) {
  const rateUsdt = usdt[1] / usdt[0];
  const zlpRate = zlp[1] / zlp[0];
  const value = (amount * rateUsdt) / zlpRate;

  return value / amount;
}

function priceImact(amount) {
  const real_rate = realRate(amount);
  const virtual_rate = virtualRate(amount);
  const priceImact = Math.abs((real_rate - virtual_rate) / virtual_rate * 100);

  console.log('real_rate', real_rate);
  console.log('virtual_rate', virtual_rate);
  console.log('priceImact', priceImact);

  return priceImact;
}


const res = priceImact(0.01);
