function checkCashRegister(price, cash, cid) {
    const currencyUnit = [
      { name: 'ONE HUNDRED', value: 100.0 },
      { name: 'TWENTY', value: 20.0 },
      { name: 'TEN', value: 10.0 },
      { name: 'FIVE', value: 5.0 },
      { name: 'ONE', value: 1.0 },
      { name: 'QUARTER', value: 0.25 },
      { name: 'DIME', value: 0.1 },
      { name: 'NICKEL', value: 0.05 },
      { name: 'PENNY', value: 0.01 }
    ];
  
    let change = cash - price;
    let totalCid = cid.reduce((sum, item) => sum + item[1], 0);
    
    if (totalCid < change) {
      return { status: 'INSUFFICIENT_FUNDS', change: [] };
    } else if (totalCid === change) {
      return { status: 'CLOSED', change: [...cid] };
    } else {
      cid = cid.reverse();
  
      let result = currencyUnit.reduce((acc, curr, index) => {
        let value = 0;
        while (change >= curr.value && cid[index][1] >= curr.value) {
          change -= curr.value;
          cid[index][1] -= curr.value;
          value += curr.value;
          change = Math.round(change * 100) / 100;
        }
        if (value > 0) {
          acc.push([curr.name, value]);
        }
        return acc;
      }, []);
  
      return result.length > 0 && change === 0
        ? { status: 'OPEN', change: result }
        : { status: 'INSUFFICIENT_FUNDS', change: [] };
    }
  }