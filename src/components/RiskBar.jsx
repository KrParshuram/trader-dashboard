function RiskBar({ label, used, limit }) {
  const pct = Math.min((used / limit) * 100, 100); // cap at 100% visually

  let color = "green";
  if (pct >= 90) color = "red";
  else if (pct >= 60) color = "orange";

  const remaining = Math.max(limit - used, 0);

  return (
    <div className="risk-bar">
      <div className="risk-bar-header">
        <span>{label}</span>
        <span>${used.toLocaleString()} / ${limit.toLocaleString()}</span>
      </div>
      <div className="risk-bar-track">
        <div
          className="risk-bar-fill"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <p className="risk-bar-remaining">
        ${remaining.toLocaleString()} remaining
      </p>
    </div>
  );
}

export default RiskBar;