import { JSX, Component, createSignal, For, Show } from 'solid-js';
import './app.css';
import Controller from './components/controller/Controller';
import BouncingBalls from './components/BouncingBalls';

const apps = ['Bouncing Balls', 'Circling'];

const App: Component = () => {
  const [selection, setSelection] = createSignal('');
  const [controls, setControls] = createSignal<JSX.Element>(null);

  function onMenuSelect(selectedApp: string) {
    console.log(selectedApp);
    setSelection(selectedApp);
  }
  return (
    <div id='app'>
      <Controller>{controls()}</Controller>
      <Show
        when={selection() === 'Bouncing Balls'}
        fallback={<Menu onSelect={onMenuSelect} />}
      >
        <BouncingBalls setControls={setControls} />
      </Show>
    </div>
  );
};

type MenuProps = { onSelect: (item: string) => void };

const Menu: Component<MenuProps> = (props) => {
  return (
    <div id='main-menu'>
      <For each={apps}>
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
