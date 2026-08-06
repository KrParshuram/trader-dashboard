function TradeList({ trades }) {
  if (trades.length === 0) {
    return <p className="trade-list-empty">No trades yet.</p>;
  }

  return (
    <div className="trade-list">
      <div className="trade-list-header">
        <span>Trade</span>
        <span>P&L</span>
      </div>
      {trades.map(trade => (
        <div key={trade.id} className="trade-row">
          <span>{trade.name}</span>
          <span
            className={trade.pnl >= 0 ? "pnl-positive" : "pnl-negative"}
          >
            {trade.pnl >= 0 ? "+" : "-"}${Math.abs(trade.pnl).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TradeList;