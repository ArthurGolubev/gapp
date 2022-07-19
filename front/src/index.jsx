import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { HashRouter } from 'react-router-dom'
import * as bootstrap from 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import '../scss/custom.css'


import {
    ApolloProvider,
    ApolloClient,
    HttpLink,
} from '@apollo/client'
import cache from "./cache"



const createApolloClient = () => {
    const link = new HttpLink({
        uri: '/api/graphql'
    })

    return new ApolloClient({
        link,
        cache: cache
    })
}

const d = document.querySelector("#root")
const root = ReactDOM.createRoot(d)
root.render(
    <ApolloProvider client={createApolloClient()}>
        <HashRouter >
            <App />
        </HashRouter>
    </ApolloProvider>
)