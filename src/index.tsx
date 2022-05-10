import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { App } from './Components/App'
import { Provider } from 'react-redux'
import { store } from './store'
import { theme } from './theme'

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>, document.getElementById("root")
);