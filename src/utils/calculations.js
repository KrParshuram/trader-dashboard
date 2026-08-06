export function getTotalPnl(trades) {
  return trades.reduce((sum, t) => sum + t.pnl, 0);
}

export function getWinningTrades(trades) {
  return trades.filter(t => t.pnl > 0);
}

export function getLosingTrades(trades) {
  return trades.filter(t => t.pnl < 0);
}

export function getWinRate(trades) {
  if (trades.length === 0) return 0;
  return (getWinningTrades(trades).length / trades.length) * 100;
}

export function getLargestWin(trades) {
  const wins = getWinningTrades(trades);
  if (wins.length === 0) return 0;
  return Math.max(...wins.map(t => t.pnl));
}

export function getLargestLoss(trades) {
  const losses = getLosingTrades(trades);
  if (losses.length === 0) return 0;
  return Math.min(...losses.map(t => t.pnl)); // most negative
}

export function getBalanceHistory(startingBalance, trades) {
  let balance = startingBalance;
  const history = [{ label: "Start", balance }];

  trades.forEach(trade => {
    balance += trade.pnl;
    history.push({ label: trade.name, balance });
  });

  return history; // array of {label, balance} — useful for the equity curve too
}

export function getPeakAndDrawdown(startingBalance, trades) {
  let balance = startingBalance;
  let peak = startingBalance;
  let maxDrawdown = 0;

  trades.forEach(trade => {
    balance += trade.pnl;
    peak = Math.max(peak, balance);
    maxDrawdown = Math.max(maxDrawdown, peak - balance);
  });

  return {
    finalBalance: balance,
    peak,
    currentDrawdown: peak - balance, // drawdown right now, at the end
    maxDrawdownSeen: maxDrawdown,    // worst drawdown at any point along the way
  };
}

export function getDailyLoss(trades) {
  const losses = getLosingTrades(trades);
  const total = losses.reduce((sum, t) => sum + t.pnl, 0);
  return Math.abs(total);
}

export function getRiskLevel(used, limit) {
  if (limit <= 0) return { level: "Safe", pct: 0 };
  const pct = (used / limit) * 100;

  if (pct >= 90) return { level: "At Risk", pct };
  if (pct >= 60) return { level: "Approaching Limit", pct };
  return { level: "Safe", pct };
}

const RISK_ORDER = { "Safe": 0, "Approaching Limit": 1, "At Risk": 2 };

export function getOverallRisk(drawdownLevel, dailyLossLevel) {
  return RISK_ORDER[drawdownLevel] >= RISK_ORDER[dailyLossLevel]
    ? drawdownLevel
    : dailyLossLevel;
}

export function getAverageLoss(trades) {
  const losses = getLosingTrades(trades);
  if (losses.length === 0) return 0;
  const total = losses.reduce((sum, t) => sum + t.pnl, 0);
  return Math.abs(total / losses.length);
}

export function getTradesUntilDailyLimit(remainingDailyLoss, avgLoss) {
  if (avgLoss === 0) return null; // no losing trades yet, can't estimate
  return Math.floor(remainingDailyLoss / avgLoss);
}

export function getTradesUntilDrawdownLimit(remainingDrawdown, avgLoss) {
  if (avgLoss === 0) return null;
  return Math.floor(remainingDrawdown / avgLoss);
}