import { Component, JSX } from 'solid-js';
import './controller.css';
type Props<P = {}> = P & {
  children?: JSX.Element;
  onMainMenuClick: () => void;
};

const Controller: Component<Props> = (props) => {
  return (
    <div id='controller'>
      <div
        class='controller-item'
        id='controller-main-menu'
        onclick={props.onMainMenuClick}
      >
        Main Menu
      </div>
      {props.children}
    </div>
  );
};

export default Controller;
