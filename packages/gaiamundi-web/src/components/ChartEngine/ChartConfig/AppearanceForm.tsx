import { ColorPicker } from 'components/Inputs/ColorPicker';
import { MultiColorPicker } from 'components/Inputs/MultiColorPicker';
import { PaddingControls } from 'components/Inputs/PaddingControls';
import { ToggleSwitch } from 'components/Inputs/Toggle';
import { useChart } from 'hooks/useChartConfig';

export const AppearanceForm = () => {
  const {
    chart: {
      type,
      props: { color, colors, padding, isRTL },
    },
    updateChartProps,
  } = useChart();

  return (
    <div>
      <form className="flex flex-col gap-2">
        <div>
          {type === 'scatter' ? (
            <>
              <h3 className="mb-2">Custom Color</h3>
              <ColorPicker
                defaultColor={color}
                onChange={(color) => {
                  updateChartProps({
                    color,
                  });
                }}
              />
            </>
          ) : (
            <>
              <h3 className="mb-2">Custom Colors</h3>
              <MultiColorPicker
                defaultColors={colors}
                onChange={(colors) => {
                  updateChartProps({
                    colors,
                  });
                }}
              />
            </>
          )}
        </div>
        <div>
          <h3 className="mt-2">Spacing</h3>
          <PaddingControls
            defaultPaddings={
              padding || { top: 0, bottom: 0, left: 0, right: 0 }
            }
            onChange={(padding) => {
              updateChartProps({
                padding,
              });
            }}
          />
        </div>
        <div className="my-2">
          <h3 className="mb-2">Direction</h3>
          <ToggleSwitch
            label={'Right to Left'}
            defaultChecked={isRTL}
            onChange={(isEnabled) => updateChartProps({ isRTL: isEnabled })}
          />
        </div>
      </form>
    </div>
  );
};
