export class FormParser {
    constructor( el, state ){
        this.el = el
        this.state = state
        this.form = this.findForm(this.el)

        this.bindForm = this.bindForm.bind(this)
        this.bindForm(this.form)

    }

    findForm(el){
        const form = el.querySelector('form[m]')
        if(form){
            form.model = form.getAttribute('m')
            form.removeAttribute('m')
        }
        return form
    }

    bindForm(form){
        if(!form) return false
        const model = this.state[form.model],
              fields = form.querySelectorAll('[mProp]')
        fields.forEach(field => {
            const prop = field.getAttribute('mProp')
            field.removeAttribute('prop')
            field.prop = prop
            field.errorDisplay = document.createElement('ul')
            field.errorDisplay.classList.add('errors')
            field.parentNode.appendChild( field.errorDisplay )

            field.onkeyup = evt => {
                
            }
            field.addEventListener('keyup', this.fieldKeyup.bind(this))
            field.addEventListener('blur', this.parseErrors.bind(this))

        })
        form.onsubmit = evt => {
            evt.preventDefault()
            form.classList.remove('error')
            form.errors = false
            fields.forEach( field => field.parentNode.classList.remove('error') )

            model.preSave()
            this.parseErrors()
            if(!model.errors) {
                const currentUsers = JSON.parse(sessionStorage.getItem('users'))
                currentUsers.push({
                    name: model.name,
                    cpf: model.cpf,
                    phone: model.phone,
                    email: model.email
                })
                sessionStorage.setItem('users', JSON.stringify( currentUsers ))
                window.location.href = window.location.href.split('#')[0] + '#/'
            }
        }
    }

    parseErrors(evt){
        this.state[this.form.model].preSave()
        let fields = [ ...this.form.querySelectorAll('[mProp]') ]
        if(evt) fields = [ evt.target ]
        this.form.classList.remove('error')
        fields.forEach(field => {
            field.errorDisplay.innerHTML = ''
            const errors = this.state[this.form.model].submitErrors[field.prop] || []
            field.errorDisplay.innerHTML = ''
            field.parentNode.classList.remove('error')
            errors.every(error => {
                let errorEl = document.createElement('li')
                errorEl.innerHTML = error
                field.errorDisplay.appendChild(errorEl)
                field.parentNode.classList.add('error')
                this.form.classList.add('error')
                this.form.errors = true
                return false
            })
        })
    }

    fieldKeyup(evt){
        const model = this.state[this.form.model],
              field = evt.target,
              prop = field.prop
        if(typeof model[prop] === 'string'){
            model[prop] = evt.target.value
            field.value = model[prop]
        }
        evt.target.parentNode.classList.add('touched')
        if( evt.target.value ){
            evt.target.parentNode.classList.add('dirty')
            evt.target.parentNode.classList.remove('clean')
        } else {
            evt.target.parentNode.classList.add('clean')
            evt.target.parentNode.classList.remove('dirty')
        }
    }

}   