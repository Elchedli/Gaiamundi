import {
  CogIcon as AdjustmentsIcon,
  InformationCircleIcon as AnnotationIcon,
  ChartPieIcon,
  ClockIcon,
  EyeIcon,
  PlusIcon,
  PresentationChartLineIcon,
  TableCellsIcon as TableIcon,
} from '@heroicons/react/24/solid';
import { Accordion } from 'components/Accordion';
import Well from 'components/Layout/Well';
import { useChart } from 'hooks/useChartConfig';
import { AnimationForm } from './AnimationForm';
import { AppearanceForm } from './AppearanceForm';
import { AreaForm } from './AreaForm';
import { AxesForm } from './AxesForm';
import { BubbleForm } from './BubbleForm';
import { GridForm } from './GridForm';
import { LineForm } from './LineForm';
import { PieForm } from './PieForm';

// to-do: add new chart config object for every chart (not all charts share the same config)
const CHART_CONFIG_FORMS = {
  Appearance: {
    icon: <EyeIcon className="h-5 w-5 text-blue-500 inline" />,
    form: <AppearanceForm />,
    defaultOpen: true,
  },
  Axis: {
    icon: <PlusIcon className="h-5 w-5 text-blue-500 inline" />,
    form: <AxesForm />,
    defaultOpen: false,
  },
  Animation: {
    icon: <ClockIcon className="h-5 w-5 text-blue-500 inline" />,
    form: <AnimationForm />,
    defaultOpen: false,
  },
  Grid: {
    icon: <TableIcon className="h-5 w-5 text-blue-500 inline" />,
    form: <GridForm />,
    defaultOpen: false,
  },
  Tooltip: {
    icon: <AnnotationIcon className="h-5 w-5 text-blue-500 inline" />,
    form: 'Tooltip',
    defaultOpen: false,
  },
  Pie: {
    icon: <ChartPieIcon className="h-5 w-5 text-blue-500 inline" />,
    form: <PieForm />,
    defaultOpen: false,
  },
  Line: {
    icon: (
      <PresentationChartLineIcon className="h-5 w-5 text-blue-500 inline" />
    ),
    form: <LineForm />,
    defaultOpen: false,
  },
  Bubble: {
    icon: (
      <PresentationChartLineIcon className="h-5 w-5 text-blue-500 inline" />
    ),
    form: <BubbleForm />,
  },
  Area: {
    icon: (
      <PresentationChartLineIcon className="h-5 w-5 text-blue-500 inline" />
    ),
    form: <AreaForm />,
    defaultOpen: false,
  },
};

const CHART_CONFIG_PANEL = {
  pie: ['Appearance', 'Pie', 'Animation', 'Legend', 'Tooltip'],
  column: ['Appearance', 'Axis', 'Animation', 'Grid', 'Legend', 'Tooltip'],
  bar: ['Appearance', 'Axis', 'Animation', 'Grid', 'Legend', 'Tooltip'],
  line: ['Appearance', 'Line', 'Axis', 'Animation', 'Grid', 'Tooltip'],
  scatter: ['Appearance', 'Axis', 'Animation', 'Grid', 'Tooltip'],
  bubble: ['Appearance', 'Axis', 'Bubble', 'Animation', 'Grid', 'Tooltip'],
  area: ['Appearance', 'Axis', 'Area', 'Animation', 'Grid', 'Tooltip'],
  lineColumn: [
    'Appearance',
    'Axis',
    'Line',
    'Animation',
    'Grid',
    'Legend',
    'Tooltip',
  ],
};

export const ConfigPanel = () => {
  const { chart: chartConfig } = useChart();
  return (
    <Well title={'Settings'} Icon={AdjustmentsIcon}>
      <Accordion>
        {CHART_CONFIG_PANEL[chartConfig.type].map((item) => (
          <Accordion.Panel key={item}>
            <Accordion.Title>
              <div className="text-md font-medium text-gray-900 title-font">
                {item in CHART_CONFIG_FORMS
                  ? CHART_CONFIG_FORMS[item as keyof typeof CHART_CONFIG_FORMS]
                      .icon
                  : 'Missing Icon'}{' '}
                {item}
              </div>
            </Accordion.Title>
            <Accordion.Content>
              {item in CHART_CONFIG_FORMS
                ? CHART_CONFIG_FORMS[item as keyof typeof CHART_CONFIG_FORMS]
                    .form
                : 'Missing form'}
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </Well>
  );
};
