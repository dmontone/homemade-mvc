import _ from './'


const EXISTING_SELECTOR = 'app',
      BROKEN_SELECTOR = 'ap',
      SIMPLE_APP_BODY = '<div id="' + EXISTING_SELECTOR + '"></div>'

beforeEach(() => {
    document.body.innerHTML = '';
})

it('should create class instance and attach $app to element with selector', () => {

    const ELEMENT_SELECTOR = '#app'
    document.body.innerHTML = SIMPLE_APP_BODY

    expect(() => {
        const app = new _(ELEMENT_SELECTOR)
    }).not.toThrowError()

})

it('should throw error if element is not present', () => {

    const ELEMENT_SELECTOR = '#app'
    
    expect(() => {
        const app = new _(ELEMENT_SELECTOR)
    }).toThrowError()

})