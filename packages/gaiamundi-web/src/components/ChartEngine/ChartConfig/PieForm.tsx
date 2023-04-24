import { ColorPicker } from 'components/Inputs/ColorPicker';
import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import { Slider } from 'components/Inputs/Slider';
import { useAllowedDataKeys } from 'hooks/useAllowedDataKeys';
import { useChart } from 'hooks/useChartConfig';

/**
 * @To-Do:
 * replace every TextInput component in this file with a slider Input component
 * change the name of this component alongside the file
 *
 * @TE: compute the angle of the smallest arc:
 * the purpose of this is to have a parallel arcs. we need to compute the smallest donutRadius
 * so that we have parallel arcs in the chart
 * minInnerRadius = outerRadius * mindonutRadius
 * minInnerRadius = outerRadius * padAngle / sin(a) where a is the angle of the smallest arc in the chart.
 */

export const PieForm = () => {
  const {
    chart: {
      props: { arc, domainKey },
    },
    dimensions,
    updateChartProps,
  } = useChart();
  const { domainKeyOptions } = useAllowedDataKeys();
  const outerRadius = Math.min(dimensions.width, dimensions.height) / 2;

  const updateStrokeWidth = (strokeWidth: number) => {
    updateChartProps({ arc: { ...arc, strokeWidth: strokeWidth } });
  };
  const updateDonutRadius = (value: number) => {
    updateChartProps({
      arc: {
        ...arc,
        donutRadius: value,
      },
    });
  };
  const updateCornerRadius = (cornerRadius: number) => {
    updateChartProps({ arc: { ...arc, cornerRadius: cornerRadius } });
  };

  const updateDistance = (value: number) => {
    /**
     * padRadius = sqrt((innerRadius^2)+(outerRadius^2))
     * Link: https://github.com/d3/d3-shape#arc_padRadius
     */
    const padRadius = Math.sqrt(
      (arc.donutRadius * outerRadius) ** 2 + outerRadius ** 2
    );
    // const padRadius = outerRadius;
    /**
     * Calc distance between two arcs (which is an arc length):
     * distance = padAngle * padRadius
     */
    const distance = value;
    const padAngle = distance / padRadius;
    updateChartProps({
      arc: {
        ...arc,
        padAngle: padAngle,
        padRadius: padRadius,
      },
    });
  };

  return (
    <div>
      <form className="flex flex-col gap-2">
        <div>
          <h3 className="mb-2">Key</h3>
          <ListBoxInput<string>
            defaultValue={domainKey}
            options={domainKeyOptions}
            onChange={(domainKey: string) => {
              updateChartProps({
                domainKey,
              });
            }}
          />
        </div>
        <div>
          <h3 className="mb-2">Donut Radius</h3>
          <Slider
            minValue={0}
            maxValue={100}
            step="1"
            size="md"
            onChange={(slider) => updateDonutRadius(slider / 100)}
            defaultValue={0}
            unit={'%'}
          />
        </div>
        <div>
          <h3 className="mb-2">Distance</h3>
          <Slider
            size="md"
            onChange={updateDistance}
            minValue={0}
            maxValue={outerRadius * (Math.PI / 32)}
            defaultValue={0}
            unit={'px'}
          />
        </div>
        <div>
          <h3 className="mb-2">Corner Radius</h3>
          <Slider
            size="md"
            maxValue={100}
            onChange={(slider) => updateCornerRadius(slider)}
            defaultValue={0}
            unit={'%'}
          />
        </div>
        <div>
          <h3 className="mb-2">Border</h3>
          <Slider
            size="md"
            maxValue={18}
            onChange={updateStrokeWidth}
            defaultValue={0}
            unit={'px'}
          />
        </div>
        <div>
          <h3 className="mb-2">Border Color</h3>
          <ColorPicker
            defaultColor="#FFFFFF"
            onChange={(color) =>
              updateChartProps({ arc: { ...arc, stroke: color } })
            }
          />
        </div>
      </form>
    </div>
  );
};
