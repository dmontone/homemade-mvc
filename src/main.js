import App from './app/app'

import { ctrlList, ctrlForm } from './controllers'
import viewList from './view/list.html'
import viewForm from './view/form.html'

import './styles/main.scss'

let app = new App( document.getElementById('app') )

app.registerRoute({
    path: '/',
    controller: ctrlList,
    template: viewList,
    default: true
})

app.registerRoute({
    path: '/form',
    controller: ctrlForm,
    template: viewForm
})