import { account, trades } from './data/mockData';
import {
  getTotalPnl,
  getWinningTrades,
  getLosingTrades,
  getWinRate,
  getLargestWin,
  getLargestLoss,
  getPeakAndDrawdown,
  getDailyLoss,
  getRiskLevel,
  getOverallRisk,
} from './utils/calculations';

import TradeStats from './components/TradeStats';
import RiskBudget from './components/RiskBudget';
import { getAverageLoss, getTradesUntilDailyLimit, getTradesUntilDrawdownLimit } from './utils/calculations'

import StatCard from './components/StatCard';
import RiskBar from './components/RiskBar';
import RiskBanner from './components/RiskBanner';
import TradeList from './components/TradeList';
import EquityCurve from './components/EquityCurve';
import { getBalanceHistory } from './utils/calculations';


function App() {
  // --- Run all calculations once, up front ---
  const totalPnl = getTotalPnl(trades);
  const winningTrades = getWinningTrades(trades);
  const losingTrades = getLosingTrades(trades);
  const winRate = getWinRate(trades);
  const largestWin = getLargestWin(trades);
  const largestLoss = getLargestLoss(trades);

  const { currentDrawdown } = getPeakAndDrawdown(account.startingBalance, trades);
  const dailyLoss = getDailyLoss(trades);

  const drawdownRisk = getRiskLevel(currentDrawdown, account.maxDrawdown);
  const dailyLossRisk = getRiskLevel(dailyLoss, account.dailyLossLimit);
  const overallStatus = getOverallRisk(drawdownRisk.level, dailyLossRisk.level);
  const balanceHistory = getBalanceHistory(account.startingBalance, trades);
  const avgLoss = getAverageLoss(trades);
  const dailyLossRemaining = account.dailyLossLimit - dailyLoss;
  const drawdownRemaining = account.maxDrawdown - currentDrawdown;
  const tradesUntilDaily = getTradesUntilDailyLimit(dailyLossRemaining, avgLoss);
  const tradesUntilDrawdown = getTradesUntilDrawdownLimit(drawdownRemaining, avgLoss);

  return (
    <div className="dashboard">
      <h1>Trader Risk Dashboard</h1>

      
      <section>
        <h2>Account</h2>
        <div className="stat-row">
          <StatCard label="Starting Balance" value={`$${account.startingBalance.toLocaleString()}`} />
          <StatCard label="Current Balance" value={`$${account.currentBalance.toLocaleString()}`} />
        </div>
      </section>


      <section>
        <h2>Risk Status</h2>
        <RiskBanner status={overallStatus} />
        <RiskBar label="Drawdown" used={currentDrawdown} limit={account.maxDrawdown} />
        <RiskBar label="Daily Loss" used={dailyLoss} limit={account.dailyLossLimit} />
      </section>

      <section>
        <h2>Risk Status</h2>
        <RiskBanner status={overallStatus} />
        <RiskBar label="Drawdown" used={currentDrawdown} limit={account.maxDrawdown} />
        <RiskBar label="Daily Loss" used={dailyLoss} limit={account.dailyLossLimit} />
        <RiskBudget
          avgLoss={avgLoss}
          tradesUntilDaily={tradesUntilDaily}
          tradesUntilDrawdown={tradesUntilDrawdown}
        />
      </section>


      <section>
        <h2>Trading Performance</h2>
          <TradeStats
            totalPnl={totalPnl}
            winRate={winRate}
            winningCount={winningTrades.length}
            losingCount={losingTrades.length}
            largestWin={largestWin}
            largestLoss={largestLoss}
          />
      </section>

      {/* Section 4: Trade List */}
      <section>
        <h2>Trades</h2>
        <TradeList trades={trades} />
      </section>

      <section>
        <h2>Equity Curve</h2>
        <EquityCurve data={balanceHistory} />
      </section>
    </div>
  );
}

export default App;