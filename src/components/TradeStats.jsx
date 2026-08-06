import StatCard from './StatCard';

function TradeStats({ totalPnl, winRate, winningCount, losingCount, largestWin, largestLoss }) {
  return (
    <div className="stat-row">
      <StatCard
        label="Total P&L"
        value={`${totalPnl >= 0 ? '+' : '-'}$${Math.abs(totalPnl).toLocaleString()}`}
        valueColor={totalPnl >= 0 ? 'green' : 'red'}
      />
      <StatCard label="Win Rate" value={`${winRate.toFixed(0)}%`} />
      <StatCard label="Winning Trades" value={winningCount} />
      <StatCard label="Losing Trades" value={losingCount} />
      <StatCard label="Largest Win" value={`+$${largestWin.toLocaleString()}`} valueColor="green" />
      <StatCard
        label="Largest Loss"
        value={`-$${Math.abs(largestLoss).toLocaleString()}`}
        valueColor="red"
      />
    </div>
  );
}

export default TradeStats;