import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {ApolloProvider, createNetworkInterface, ApolloClient} from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { GC_AUTH_TOKEN } from './components/constants'
const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj8l7nzk301v30140990tr8sd\n'
})
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    const token = localStorage.getItem(GC_AUTH_TOKEN)
    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}])

const client = new ApolloClient({
  networkInterface
})
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
  , document.getElementById('root')
)
registerServiceWorker();
