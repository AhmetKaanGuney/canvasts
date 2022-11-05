import { Component } from 'solid-js';

type Props = {
  title: string;
  onChange: (checked: boolean) => void;
};

const Checkbox: Component<Props> = (props) => {
  return (
    <div class='checkbox-container'>
      <input type='checkbox' class='checkbox' />
      <label class='checkbox-label'>{props.title}</label>
    </div>
  );
};

export default Checkbox;
