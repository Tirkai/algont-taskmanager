import * as React from 'react'
import { Provider, observer } from 'mobx-react'

import store from 'src/stores'
import AppContainer from 'src/components/AppContainer/AppContainer'


@observer
class App extends React.Component {
    public render() {
        return (
            <Provider {...store}>
                <AppContainer />
            </Provider>
        );
    }
}
export default App;
