function StatCard({ label, value, valueColor }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value" style={{ color: valueColor || "black" }}>
        {value}
      </p>
    </div>
  );
}

export default StatCard;