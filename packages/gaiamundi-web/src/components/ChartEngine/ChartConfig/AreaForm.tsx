import { ColorPicker } from 'components/Inputs/ColorPicker';
import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import { Slider } from 'components/Inputs/Slider';
import { ToggleSwitch } from 'components/Inputs/Toggle';
import { LineCurve } from 'eazychart-core';
import { useChartConfig } from 'hooks/useChartConfig';

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

export const AreaForm = () => {
  const {
    chart: {
      props: { swapAxis, marker, area },
    },
    updateChartProps,
  } = useChartConfig();

  const curveOptions = Object.entries(curve).map(([value, label]) => ({
    value,
    label,
  })) as Array<{ value: LineCurve; label: string }>;
  return (
    <div>
      <form className="flex flex-col gap-2">
        <div className="my-2">
          <h3 className="mb-2">Swap Axis</h3>
          <ToggleSwitch
            label={'Swap axis'}
            defaultChecked={swapAxis}
            onChange={(isEnabled) => updateChartProps({ swapAxis: isEnabled })}
          />
        </div>
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
          <h3 className="mb-2">Color</h3>
          <div className="my-2">
            <ColorPicker
              defaultColor={area.fill}
              onChange={(fill: string) =>
                updateChartProps({ area: { ...area, fill } })
              }
            />
          </div>
          <hr />
          <div className="my-2">
            <h3 className="mb-2">Line style</h3>
            <div>
              <div>
                <ListBoxInput<LineCurve>
                  defaultValue={area.curve}
                  options={curveOptions}
                  onChange={(curve: LineCurve) => {
                    updateChartProps({
                      area: { ...area, curve },
                    });
                  }}
                />
              </div>
              <div className="my-2">
                <ColorPicker
                  defaultColor={area.stroke}
                  onChange={(stroke) =>
                    updateChartProps({ area: { ...area, stroke } })
                  }
                />
              </div>
              <div>
                <Slider
                  defaultValue={0}
                  onChange={(strokeWidth) =>
                    updateChartProps({ area: { ...area, strokeWidth } })
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
