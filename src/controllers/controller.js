import TemplateParser from '../app/templateParser'

export class Controller {

    constructor(updateView){

        this.state = {}
        this.template = ''

        this.setState = this.setState.bind(this)

        this.setTemplate = this.setTemplate.bind(this)
        this.parseView = this.parseView.bind(this)
        this.setViewUpdateFn = this.setViewUpdateFn.bind(this)

        if(this.onBeforeRender) this.onBeforeRender = this.onBeforeRender.bind(this)

    }

    setState( newState ){
        this.state = {
            ...this.state,
            ...newState
        }
        if(this.template) this.parseView()
    }

    setTemplate(template){
        this.template = template
    }

    setViewUpdateFn(fn){
        this.updateView = fn
    }

    parseView(firstPaint){
        const view = new TemplateParser( this.template, this.state ).view
        this.updateView(view, this.onBeforeRender)
    }
    
}