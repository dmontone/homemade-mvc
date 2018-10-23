export default class _ {

    constructor(selector){

        if(!selector){
            console.error('[G] Application not set')
        }

        this.$app = document.querySelector(selector)

        if(!this.$app){

            function NoElementForAppError(){
                this.name = '[_] App Empty'
                this.message = 'No element found for _ with selector ' + this.selector
            }
            NoElementForAppError.prototype = Object.create(NoElementForAppError.prototype)
            NoElementForAppError.prototype.constructor = NoElementForAppError

            throw new NoElementForAppError()

        }

        this.is = {
            loadingPart: false
        }

        this.getPart('./', html => {
            this.$app.innerHTML = html
        })

    }

    getPart(partPath){

        
        this.$http()

    }

    $http(url = '', callback = () => {}, options = {}){
        const req = new XMLHttpRequest()
        req.onload = function(){ callback( this.responseText ) }
        req.open( options.method || 'GET', options.url || url )
        req.send()
    }

    _resolvePath(path){
        
        if( /\/$/.exec(path) ){
            path += 'index.html'
        }

        if( !/\.(html|htm)$/.exec(path) ){
            path += '.html'
        }

        return path

    }

}