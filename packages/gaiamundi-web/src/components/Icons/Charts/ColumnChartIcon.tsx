const ColumnChartIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg viewBox="0 0 800 600" {...props}>
      <g transform="translate(100, 50)">
        <g className="ez-grid">
          <line
            transform="translate(0, 500.5)"
            x2="600"
            y2="0"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(0, 458.5)"
            x2="600"
            y2="0"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(0, 417.5)"
            x2="600"
            y2="0"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(0, 375.5)"
            x2="600"
            y2="0"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(0, 333.5)"
            x2="600"
            y2="0"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(0, 292.5)"
            x2="600"
            y2="0"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(0, 250.5)"
            x2="600"
            y2="0"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(0, 208.5)"
            x2="600"
            y2="0"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(0, 167.5)"
            x2="600"
            y2="0"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(0, 125.5)"
            x2="600"
            y2="0"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(0, 83.5)"
            x2="600"
            y2="0"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(0, 42.5)"
            x2="600"
            y2="0"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(0, 0.5)"
            x2="600"
            y2="0"
            className="ez-grid-line"
          ></line>
        </g>
        <g className="ez-grid">
          <line
            transform="translate(80.5, 0)"
            x2="0"
            y2="500"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(226.5, 0)"
            x2="0"
            y2="500"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(372.5, 0)"
            x2="0"
            y2="500"
            className="ez-grid-line"
          ></line>
          <line
            transform="translate(518.5, 0)"
            x2="0"
            y2="500"
            className="ez-grid-line"
          ></line>
        </g>
        <g className="ez-bars">
          <rect
            fill="#26547c"
            x="15"
            y="425"
            width="131"
            height="75"
            data-testid="ez-bar"
            className="ez-bar"
          ></rect>
          <rect
            fill="#ef476f"
            x="161"
            y="125"
            width="131"
            height="375"
            data-testid="ez-bar"
            className="ez-bar"
          ></rect>
          <rect
            fill="#ffd166"
            x="307"
            y="258"
            width="131"
            height="242"
            data-testid="ez-bar"
            className="ez-bar"
          ></rect>
          <rect
            fill="#06d6a0"
            x="453"
            y="250"
            width="131"
            height="250"
            data-testid="ez-bar"
            className="ez-bar"
          ></rect>
        </g>
        <g
          textAnchor="middle"
          transform="translate(0, 500)"
          className="ez-axis"
        >
          <path d="M0.5,6V-6V-0.5H600.5V6V-6" className="ez-axis-path"></path>
          <g transform="translate(80.5, 0)" className="ez-axis-tick">
            <line x2="0" y2="6" className="ez-axis-tick-line"></line>
            <text y="9" dy="0.71em" className="ez-axis-tick-text">
              Alpha
            </text>
          </g>
          <g transform="translate(226.5, 0)" className="ez-axis-tick">
            <line x2="0" y2="6" className="ez-axis-tick-line"></line>
            <text y="9" dy="0.71em" className="ez-axis-tick-text">
              Beta
            </text>
          </g>
          <g transform="translate(372.5, 0)" className="ez-axis-tick">
            <line x2="0" y2="6" className="ez-axis-tick-line"></line>
            <text y="9" dy="0.71em" className="ez-axis-tick-text">
              Gamma
            </text>
          </g>
          <g transform="translate(518.5, 0)" className="ez-axis-tick">
            <line x2="0" y2="6" className="ez-axis-tick-line"></line>
            <text y="9" dy="0.71em" className="ez-axis-tick-text">
              Delta
            </text>
          </g>
        </g>
        <g textAnchor="end" transform="translate(0, 0)" className="ez-axis">
          <path d="M6,500.5H-6H-0.5V0.5H6,-6" className="ez-axis-path"></path>
          <g transform="translate(0, 500.5)" className="ez-axis-tick">
            <line x2="-6" y2="0" className="ez-axis-tick-line"></line>
            <text x="-9" dy="0.32em" className="ez-axis-tick-text">
              0
            </text>
          </g>
          <g transform="translate(0, 458.5)" className="ez-axis-tick">
            <line x2="-6" y2="0" className="ez-axis-tick-line"></line>
            <text x="-9" dy="0.32em" className="ez-axis-tick-text">
              5
            </text>
          </g>
          <g transform="translate(0, 417.5)" className="ez-axis-tick">
            <line x2="-6" y2="0" className="ez-axis-tick-line"></line>
            <text x="-9" dy="0.32em" className="ez-axis-tick-text">
              10
            </text>
          </g>
          <g transform="translate(0, 375.5)" className="ez-axis-tick">
            <line x2="-6" y2="0" className="ez-axis-tick-line"></line>
            <text x="-9" dy="0.32em" className="ez-axis-tick-text">
              15
            </text>
          </g>
          <g transform="translate(0, 333.5)" className="ez-axis-tick">
            <line x2="-6" y2="0" className="ez-axis-tick-line"></line>
            <text x="-9" dy="0.32em" className="ez-axis-tick-text">
              20
            </text>
          </g>
          <g transform="translate(0, 292.5)" className="ez-axis-tick">
            <line x2="-6" y2="0" className="ez-axis-tick-line"></line>
            <text x="-9" dy="0.32em" className="ez-axis-tick-text">
              25
            </text>
          </g>
          <g transform="translate(0, 250.5)" className="ez-axis-tick">
            <line x2="-6" y2="0" className="ez-axis-tick-line"></line>
            <text x="-9" dy="0.32em" className="ez-axis-tick-text">
              30
            </text>
          </g>
          <g transform="translate(0, 208.5)" className="ez-axis-tick">
            <line x2="-6" y2="0" className="ez-axis-tick-line"></line>
            <text x="-9" dy="0.32em" className="ez-axis-tick-text">
              35
            </text>
          </g>
          <g transform="translate(0, 167.5)" className="ez-axis-tick">
            <line x2="-6" y2="0" className="ez-axis-tick-line"></line>
            <text x="-9" dy="0.32em" className="ez-axis-tick-text">
              40
            </text>
          </g>
          <g transform="translate(0, 125.5)" className="ez-axis-tick">
            <line x2="-6" y2="0" className="ez-axis-tick-line"></line>
            <text x="-9" dy="0.32em" className="ez-axis-tick-text">
              45
            </text>
          </g>
          <g transform="translate(0, 83.5)" className="ez-axis-tick">
            <line x2="-6" y2="0" className="ez-axis-tick-line"></line>
            <text x="-9" dy="0.32em" className="ez-axis-tick-text">
              50
            </text>
          </g>
          <g transform="translate(0, 42.5)" className="ez-axis-tick">
            <line x2="-6" y2="0" className="ez-axis-tick-line"></line>
            <text x="-9" dy="0.32em" className="ez-axis-tick-text">
              55
            </text>
          </g>
          <g transform="translate(0, 0.5)" className="ez-axis-tick">
            <line x2="-6" y2="0" className="ez-axis-tick-line"></line>
            <text x="-9" dy="0.32em" className="ez-axis-tick-text">
              60
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default ColumnChartIcon;
