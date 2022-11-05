import { Component, createSignal } from 'solid-js';
import './slider.css';

type Props = {
  title: string;
  min: number;
  max: number;
  defaultValue: number;
  onInputChange: (value: number) => void;
};
const Slider: Component<Props> = (props) => {
  const [value, setValue] = createSignal(props.defaultValue);
  function handleChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    setValue(value);
    props.onInputChange(value);
  }
  return (
    <div>
      <div class='slider-label-container'>
        <label class='slider-label'>{props.title}</label>
        <span class='slider-value'>{value()}</span>
      </div>
      <input
        type='range'
        class='slider-input'
        min={props.min}
        max={props.max}
        value={value()}
        oninput={handleChange}
      />
    </div>
  );
};

export default Slider;
