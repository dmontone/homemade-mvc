import Router from './router'
import { ctrlBlank } from '../controllers/blank'

describe('Router class', () => {

    beforeEach(() => {
        document.body.innerHTML = '<div id="app">app</div>'
        window.location.hash = ''
    })
    test('Resolves expected route and falls beack to default route', () => {

        expect.assertions(3)

        const router = new Router(),
              TEST_VIEW_DEFAULT = '<div>Default template</div>',
              TEST_VIEW_OTHER = '<div>Non-default template</div>'

        const defaultRoute = {
            path: '/default',
            controller: ctrlBlank,
            template: TEST_VIEW_DEFAULT,
            default: true
        }

        const otherRoute = {
            path: '/other',
            controller: ctrlBlank,
            template: TEST_VIEW_OTHER
        }

        router.registerRoute(defaultRoute)
        router.registerRoute(otherRoute)

        expect(router.resolveRoute('/default')).toBe(defaultRoute)
        expect(router.resolveRoute('/whatever')).toBe(defaultRoute)
        expect(router.resolveRoute('/other')).toBe(otherRoute)

    })

    test('Loads route after hash change and window load', () => {
        const router = new Router(),
              TEST_VIEW = '<div>Test template</div>'

        const defaultRoute = {
            path: '/default',
            controller: ctrlBlank,
            template: TEST_VIEW,
            default: true
        }
        router.registerRoute(defaultRoute)

        window.location.hash = '/default'
        window.dispatchEvent( new Event('hashchange') )

        expect( router.activeView ).toBe(defaultRoute)

    })

})