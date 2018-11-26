import App from './app'
import { FormParser } from './formParser'

describe('Form parser class', () => {

    beforeEach(() => {
        document.body.innerHTML = `<div id="app">
            <form m="exampleForm"></form>
        </div>`
    })

    test('Can find parseable form', () => {
        const parser = new FormParser(document.getElementById('app'), {

        })
        expect( parser.form.model ).toBe('exampleForm')
    })

})