import { Component, JSX, For } from 'solid-js';
import './controller.css';
type Props<P = {}> = P & { children?: JSX.Element };

const Controller: Component<Props> = (props) => {
  return (
    <div id='controller'>
      <div class='controller-item' id='controller-main-menu'>
        Main Menu
      </div>
      {props.children}
    </div>
  );
};

export default Controller;
