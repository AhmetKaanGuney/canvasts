import { Component } from 'solid-js';

type Props = {
  title: string;
  value: string | number;
};

const DisplayValue: Component<Props> = (props) => {
  return (
    <div style='display: inline-flex; width:100%'>
      <label style='width: 100%;'>{props.title}:</label>
      <span style='color: var(--warning);'>{props.value}</span>
    </div>
  );
};

export default DisplayValue;
