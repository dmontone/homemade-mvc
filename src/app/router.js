class Router {

    constructor(updateView){

        this.routes = []
        this.defaultRoute = null
        this.activeView = null

        this.updateView = updateView

        this.registerRoute = this.registerRoute.bind(this)
        this.updateRoute = this.updateRoute.bind(this)

        window.addEventListener('load', this.updateRoute.bind(this) );
        window.addEventListener('hashchange', this.updateRoute.bind(this) );

    }

    registerRoute(route){
        
        if(route.default) this.defaultRoute = route
        this.routes.push(route)
        return this.routes

    }

    resolveRoute(path){
        
        let route = this.routes.find(route => route.path === path)

        if(!route && this.defaultRoute)
            route = this.defaultRoute

        return route

    }

    updateRoute(){

        let hash = window.location.hash
        if(hash)
            hash = hash.substr(1)
        
        this.activeView = this.resolveRoute()
        const controller = new this.activeView.controller()
        
        controller.setTemplate( this.activeView.template )
        controller.setViewUpdateFn( this.updateView || ( () => {} ) )
        controller.parseView()
    
    }

}

export default Router