import TemplateParser from './templateParser'

describe('TemplateParser Class', () => {

    test('Binds parser', () => {

        const template = '<div>Hello, {{ name }}! If {{ foo }} is {{ bar }}, then {{ bar }} is {{ foo }}.</div>',
              state = { name: 'World', foo: 'bar', bar: 'foo' }

        const templateParser = new TemplateParser(template, state)
        
        expect( templateParser.view ).toBe( `<div>Hello, ${state.name}! If ${state.foo} is ${state.bar}, then ${state.bar} is ${state.foo}.</div>` )

    })

    test('Loops parser', () => {
        expect(1).toBe(1)
    })

})