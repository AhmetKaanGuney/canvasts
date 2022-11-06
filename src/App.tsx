import { JSX, Component, createSignal, For, Show } from 'solid-js';
import './app.css';
import Controller from './components/controller/Controller';
import BouncingBalls from './scenes/BouncingBalls';
import TheCircling from './scenes/TheCircling';

const scenes = ['Bouncing Balls', 'The Circling'];

const App: Component = () => {
  const [selection, setSelection] = createSignal('');
  const [controls, setControls] = createSignal<JSX.Element>(null);

  function onMenuSelect(selectedApp: string) {
    console.log(selectedApp);
    setSelection(selectedApp);
  }
  return (
    <div id='app'>
      <Controller onMainMenuClick={() => setSelection('')}>
        {controls()}
      </Controller>

      <Show when={selection() === ''}>
        <Menu onSelect={onMenuSelect} />
      </Show>
      <Show when={selection() === 'Bouncing Balls'}>
        <BouncingBalls setControls={setControls} />
      </Show>
      <Show when={selection() === 'The Circling'}>
        <TheCircling setControls={setControls} />
      </Show>
    </div>
  );
};

type MenuProps = { onSelect: (item: string) => void };

const Menu: Component<MenuProps> = (props) => {
  return (
    <div id='main-menu'>
      <For each={scenes}>
        {(item) => (
          <button class='menu-option' onclick={() => props.onSelect(item)}>
            {item}
          </button>
        )}
      </For>
    </div>
  );
};

export default App;
