import "./GridMotion.css";

export default function GridMotion({ items = [], gradientColor = "black" }) {
  const gridItems = [...items, ...items];

  return (
    <div
      className="grid-motion-wrapper"
      style={{ "--bg-gradient": gradientColor }}
    >
      <div className="grid-motion-container">
        {[1, 2, 3, 4].map((colIndex) => (
          <div key={colIndex} className={`grid-motion-column col-${colIndex}`}>
            {gridItems.map((src, idx) => (
              <div key={idx} className="grid-motion-item">
                <img src={src} alt="grid-item" loading="lazy" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="grid-motion-overlay"></div>
    </div>
  );
}
