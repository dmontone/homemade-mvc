import App from './app'
import Router from './router'

describe('App class', () => {

    beforeEach(() => {
        document.body.innerHTML = '<div id="app"></div>'
    })

    test('App has initialized router', () => {
        const app = new App( document.getElementById('app') )
        expect(app.router).toBeInstanceOf(Router)
    })

})