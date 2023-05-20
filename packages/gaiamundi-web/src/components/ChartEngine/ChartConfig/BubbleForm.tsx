import { ColorPicker } from 'components/Inputs/ColorPicker';
import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import MultiRangeSlider from 'components/Inputs/MultiRangeSlider';
import { ToggleSwitch } from 'components/Inputs/Toggle';
import { useAllowedDataKeys } from 'hooks/useAllowedDataKeys';
import { useChartConfig } from 'hooks/useChartConfig';

export const BubbleForm = () => {
  const {
    chart: {
      props: { swapAxis, bubble },
    },
    updateChartProps,
  } = useChartConfig();
  const { domainKeyOptions } = useAllowedDataKeys();
  return (
    <div>
      <form className="flex flex-col gap-2">
        <div>
          <h3 className="mb-2">Key</h3>
          <ListBoxInput<string>
            defaultValue={bubble.domainKey}
            options={domainKeyOptions}
            onChange={(domainKey: string) => {
              updateChartProps({
                bubble: { ...bubble, domainKey },
              });
            }}
          />
        </div>
        <div className="my-2">
          <h3 className="mb-2">Swap Axis</h3>
          <ToggleSwitch
            label={'Swap axis'}
            defaultChecked={swapAxis}
            onChange={(isEnabled) => updateChartProps({ swapAxis: isEnabled })}
          />
        </div>
        <div className="my-2">
          <h3 className="mb-2">Color</h3>
          <ColorPicker
            defaultColor={'#000000'}
            onChange={(fill: string) =>
              updateChartProps({ bubble: { ...bubble, fill } })
            }
          />
        </div>
        <div className="my-2">
          <h3>Bubble radius</h3>
          <MultiRangeSlider
            onChange={({ min, max }) =>
              updateChartProps({
                bubble: { ...bubble, minRadius: min, maxRadius: max },
              })
            }
            min={0}
            max={100}
          />
        </div>
      </form>
    </div>
  );
};
