import { ColorPicker } from 'components/Inputs/ColorPicker';
import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import { Slider } from 'components/Inputs/Slider';
import { ToggleSwitch } from 'components/Inputs/Toggle';
import { LineCurve } from 'eazychart-core';
import { useChartConfig } from 'hooks/useChartConfig';
import { ChartType } from 'interfaces/chart';

const curve: { [key in LineCurve]: string } = {
  curveLinear: 'Linear',
  curveBasis: 'Basis',
  curveBumpX: 'BumpX',
  curveBumpY: 'BumpY',
  curveBundle: 'Bundle',
  curveCardinal: 'Cardinal',
  curveNatural: 'Natural',
  curveStep: 'Step',
  curveStepAfter: 'Step After',
  curveStepBefore: 'Step Before',
};

export const LineForm = () => {
  const {
    chart: {
      props: { swapAxis, line, marker },
      type,
    },
    updateChartProps,
  } = useChartConfig();

  const isSwappableChart = (type: ChartType) => {
    return type !== 'lineColumn' && type !== 'pie';
  };

  const curveOptions = Object.entries(curve).map(([value, label]) => ({
    value,
    label,
  })) as Array<{ value: LineCurve; label: string }>;
  return (
    <div>
      <form className="flex flex-col gap-2">
        {isSwappableChart(type) && (
          <div className="my-2">
            <h3 className="mb-2">Swap Axis</h3>
            <ToggleSwitch
              label={'Swap axis'}
              defaultChecked={swapAxis}
              onChange={(isEnabled) =>
                updateChartProps({ swapAxis: isEnabled })
              }
            />
          </div>
        )}
        <div className="my-2">
          <h3 className="mb-2">Marker style</h3>
          <div>
            <ToggleSwitch
              label={'Hidden'}
              defaultChecked={marker?.hidden}
              onChange={(isEnabled) =>
                updateChartProps({ marker: { ...marker, hidden: isEnabled } })
              }
            />
          </div>
          <div className="my-2">
            <ColorPicker
              defaultColor={'#000000'}
              onChange={(color: string) =>
                updateChartProps({ marker: { ...marker, color } })
              }
            />
          </div>
          <div>
            <Slider
              defaultValue={0}
              onChange={(slider) =>
                updateChartProps({ marker: { ...marker, radius: slider } })
              }
            />
          </div>
          <hr />
          <div className="my-2">
            <h3 className="mb-2">Line style</h3>
            <div>
              <div>
                <ListBoxInput<LineCurve>
                  defaultValue="curveLinear"
                  options={curveOptions}
                  onChange={(curve: LineCurve) => {
                    updateChartProps({
                      line: { ...line, curve },
                    });
                  }}
                />
              </div>
              <div className="my-2">
                <ColorPicker
                  defaultColor={'#000000'}
                  onChange={(stroke) =>
                    updateChartProps({ line: { ...line, stroke } })
                  }
                />
              </div>
              <div>
                <Slider
                  defaultValue={0}
                  onChange={(strokeWidth) =>
                    updateChartProps({ line: { ...line, strokeWidth } })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
