import Router from './router'

class App {
    
    constructor(el){
        
        this.el = el
        this.router = new Router( this.updateView.bind(this) )

    }

    updateView(view, onBeforeRender){
        this.el.innerHTML = view
        if(onBeforeRender) onBeforeRender(this.el)
    }

    registerRoute(route){
        this.router.registerRoute(route)
    }

}

export default App