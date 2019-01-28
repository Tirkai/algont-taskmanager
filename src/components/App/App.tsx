import * as React from 'react'
import { Provider, observer } from 'mobx-react'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import store from 'src/stores'
import AppContainer from 'src/components/AppContainer/AppContainer'

@DragDropContext(HTML5Backend)
@observer
class App extends React.Component {
    public render() {
        window['store'] = store;
        return (
            <Provider {...store}>
                <AppContainer />
            </Provider>
        );
    }
}
export default App;
