import { Label } from 'components/Inputs/Label';
import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import { TextInput } from 'components/Inputs/TextInput';
import { AnimationEasing } from 'eazychart-core';
import { useChartConfig } from 'hooks/useChartConfig';

const easings: { [key in AnimationEasing]: string } = {
  easeLinear: 'Linear',
  easeQuad: 'Quad',
  easeQuadIn: 'Quand In',
  easeQuadOut: 'Quad Out',
  easeQuadInOut: 'Quad In/Out',
  easeCubic: 'Cubic',
  easeCubicIn: 'Cubic In',
  easeCubicOut: 'Cubic Out',
  easeCubicInOut: 'Cubic In/Out',
  easePoly: 'Polynomial',
  easePolyIn: 'Polynomial In',
  easePolyOut: 'Polynomial Out',
  easePolyInOut: 'Polynomial In/Out',
  easeSin: 'Sinusoidal',
  easeSinIn: 'Sinusoidal In',
  easeSinOut: 'Sinusoidal Out',
  easeSinInOut: 'Sinusoidal In/Out',
  easeExp: 'Exponential',
  easeExpIn: 'Exponential In',
  easeExpOut: 'Exponential Out',
  easeExpInOut: 'Exponential In/Out',
  easeCircle: 'Circle',
  easeCircleIn: 'Circle In',
  easeCircleOut: 'Circle Out',
  easeCircleInOut: 'Circle In/Out',
  easeBounce: 'Bounce',
  easeBounceIn: 'Bounce In',
  easeBounceOut: 'Bounce Out',
  easeBounceInOut: 'Bounce In/Out',
  easeBack: 'Back',
  easeBackIn: 'Back In',
  easeBackOut: 'Back Out',
  easeBackInOut: 'Back In/Out',
  easeElastic: 'Elastic',
  easeElasticIn: 'Elastic In',
  easeElasticOut: 'Elastic Out',
  easeElasticInOut: 'Elastic In/Out',
};

export const AnimationForm = () => {
  const {
    chart: {
      props: { animationOptions },
    },
    updateChartProps,
  } = useChartConfig();

  const easingOptions = Object.entries(easings).map(([value, label]) => ({
    value,
    label,
  })) as Array<{ value: AnimationEasing; label: string }>;

  return (
    <form>
      <div className="flex flex-col gap-4">
        <div>
          <ListBoxInput<AnimationEasing>
            defaultValue={animationOptions.easing}
            options={easingOptions}
            onChange={(easing: AnimationEasing) => {
              const newOptions = {
                ...animationOptions,
                easing,
              };
              updateChartProps({
                animationOptions: newOptions,
              });
            }}
          />
        </div>
        <div>
          <Label htmlFor="duration">
            Duration <small>(in milliseconds)</small>
          </Label>
          <TextInput
            id="duration"
            value={animationOptions.duration}
            onChange={(e) => {
              const newDuration = parseInt(e.target.value);
              const newOptions = {
                ...animationOptions,
                duration: !isNaN(newDuration) ? newDuration : 0,
              };
              updateChartProps({
                animationOptions: newOptions,
              });
            }}
          />
        </div>
        <div>
          <Label htmlFor="delay">
            Delay <small>(in milliseconds)</small>
          </Label>
          <TextInput
            id="delay"
            value={animationOptions.delay}
            onChange={(e) => {
              const newDelay = parseInt(e.target.value);
              const newOptions = {
                ...animationOptions,
                delay: !isNaN(newDelay) ? newDelay : 0,
              };
              updateChartProps({
                animationOptions: newOptions,
              });
            }}
          />
        </div>
      </div>
    </form>
  );
};
