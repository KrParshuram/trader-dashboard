function RiskBanner({ status }) {
  const config = {
    "Safe": {
      color: "#2e7d32",
      bg: "#e8f5e9",
      message: "You're within your account limits.",
    },
    "Approaching Limit": {
      color: "#e65100",
      bg: "#fff3e0",
      message: "You're getting close to a limit — trade carefully.",
    },
    "At Risk": {
      color: "#c62828",
      bg: "#ffebee",
      message: "You're near a hard limit. Consider stopping for today.",
    },
  };

  const { color, bg, message } = config[status];

  return (
    <div
      className="risk-banner"
      style={{ backgroundColor: bg, borderLeft: `4px solid ${color}` }}
    >
      <p className="risk-banner-status" style={{ color }}>
        {status}
      </p>
      <p className="risk-banner-message">{message}</p>
    </div>
  );
}

export default RiskBanner;