import React from 'react';
const PieChartIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg viewBox="0 0 800 600" {...props}>
      <g transform="translate(150, 100)">
        <g transform="translate(250,200)" className="ez-pie">
          <path
            d="M-68.00140021391935,-188.08458089100864A200,200,0,0,1,-3.6739403974420595e-14,-200L0,0Z"
            fill="#26547c"
            stroke="#FFF"
            strokeWidth="0"
            data-testid="ez-pie-arc"
            className="ez-pie-arc"
          ></path>
          <path
            d="M187.4205425845008,69.81074571533618A200,200,0,0,1,-99.44310485271701,173.52541282835645L0,0Z"
            fill="#ef476f"
            stroke="#FFF"
            strokeWidth="0"
            data-testid="ez-pie-arc"
            className="ez-pie-arc"
          ></path>
          <path
            d="M-198.8773530590064,-21.16124855114448A200,200,0,0,1,-68.00140021391935,-188.08458089100864L0,0Z"
            fill="#ffd166"
            stroke="#FFF"
            strokeWidth="0"
            data-testid="ez-pie-arc"
            className="ez-pie-arc"
          ></path>
          <path
            d="M-99.44310485271701,173.52541282835645A200,200,0,0,1,-198.8773530590064,-21.16124855114448L0,0Z"
            fill="#06d6a0"
            stroke="#FFF"
            strokeWidth="0"
            data-testid="ez-pie-arc"
            className="ez-pie-arc"
          ></path>
          <path
            d="M1.2246467991473532e-14,-200A200,200,0,0,1,187.4205425845008,69.81074571533618L0,0Z"
            fill="#06d6d1"
            stroke="#FFF"
            strokeWidth="0"
            data-testid="ez-pie-arc"
            className="ez-pie-arc"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default PieChartIcon;
