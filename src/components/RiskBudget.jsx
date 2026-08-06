function RiskBudget({ avgLoss, tradesUntilDaily, tradesUntilDrawdown }) {
  return (
    <div className="risk-budget">
      <h3>Risk Budget</h3>
      <p className="risk-budget-line">
        Your average losing trade is{' '}
        <strong>${avgLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>.
      </p>
      <p className="risk-budget-line">
        At that rate, you could take{' '}
        <strong>
          {tradesUntilDaily === null ? 'N/A' : `~${tradesUntilDaily} more losing trade${tradesUntilDaily === 1 ? '' : 's'}`}
        </strong>{' '}
        before hitting your daily loss limit.
      </p>
      <p className="risk-budget-line">
        You could take{' '}
        <strong>
          {tradesUntilDrawdown === null ? 'N/A' : `~${tradesUntilDrawdown} more losing trade${tradesUntilDrawdown === 1 ? '' : 's'}`}
        </strong>{' '}
        before hitting your max drawdown.
      </p>
    </div>
  );
}

export default RiskBudget;