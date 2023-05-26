
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/stores';

interface Props {
  children: JSX.Element;
}

function Page(props: Props) {
  return (
    <Provider store={store}>
      <Router>
        { props.children }
      </Router>
    </Provider>
  );
}

export default Page;