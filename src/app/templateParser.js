const BRACKET_REGEX = /{{\s*([\w\.])+\s*}}/g

export default class TemplateParser {

    constructor( template, state ){
        
        this.template = template
        this.state = state
        
        const tempHolder = document.createElement('div')
        tempHolder.innerHTML = this.template
        this.el = tempHolder.firstChild

        this.parseLoops = this.parseLoops.bind(this)
        this.parseLoops()
        
        this.parseBinds = this.parseBinds.bind(this)
        this.parseBinds()

    }

    get view(){ return this.el.outerHTML }

    parseLoops(){
        const els = this.el.querySelectorAll('[each]')
        if(els.length <= 0) return false
        
        els.forEach(el => {
            const stateProp = el.getAttribute('each'),
                  stateAlias = el.getAttribute('eachAs')
            if( !this.state[stateProp] || this.state[stateProp].length <= 0 ) return el.parentNode.removeChild(el)
            const stateData = this.state[stateProp]
            stateData.forEach((data, index) => {
                const dollyNode = el.cloneNode(true)
                dollyNode.removeAttribute('each')
                dollyNode.removeAttribute('eachAs')
                el.parentNode.insertBefore( dollyNode, el )

                let html = dollyNode.outerHTML
                html = html.replace(BRACKET_REGEX, (match, capture) => {
                    const aliasRegex = new RegExp('^(' + stateAlias + ')')
                    let replace = capture.replace(aliasRegex, stateProp + '[' + index + ']')
                    return '{{ ' + replace + ' }}'
                })
                dollyNode.outerHTML = html

            })
            el.parentNode.removeChild(el)
        })

    }

    parseBinds(){
        let html = this.el.outerHTML,
            state = this.state
        html = html.replace(BRACKET_REGEX, (match, capture) => {
            let result;
            try{ result = eval( 'state.' + match.replace(/{{\s*/, '').replace(/\s*}}/, '') ) }
            catch(e) { }
            return result
        })
        const tempHolder = document.createElement('div')
        tempHolder.innerHTML = html
        this.el.innerHTML = tempHolder.firstChild.innerHTML
    }

}