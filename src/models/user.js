export class UserModel {
    
    constructor( user = {} ){
        
        this.uname = {
            default: '',
            value: null,
            type: String,
            required: true,
            rules: [
                {
                    test: 'value.length > 0',
                    feedback: 'Este campo é obrigatório'
                },
                {
                    test: /\w{2,}\s\w{2,}(\s+\w+)*/,
                    feedback: 'Preencha com seu nome completo'
                }
            ]
        }
        this.ucpf = {
            default: '',
            value: null,
            type: String,
            required: true,
            digits: true,
            limit: 11,
            rules: [
                {
                    test: 'value.length > 0',
                    feedback: 'Este campo é obrigatório'
                },
                {
                    test: 'value.length == 11',
                    feedback: 'Seu CPF deve ter 11 dígitos sem contar pontos e hífens, apenas números'
                }
            ]
        }
        this.uphone = {
            default: '',
            value: null,
            type: String,
            digits: true,
            required: true,
            limit: 11,
            rules: [
                {
                    test: 'value.length > 0',
                    feedback: 'Este campo é obrigatório'
                },
                {
                    test: 'value.length == 10 || value.length == 11',
                    feedback: 'O telefone deve ter 10 ou 11 dígitos'
                }
            ]
        }
        this.uemail = {
            default: '',
            value: null,
            required: true,
            type: String,
            rules: [
                {
                    test: 'value.length > 0',
                    feedback: 'Este campo é obrigatório'
                },
                {
                    test: /(\w|\.|\-)+\@(\w|\.|\-)+(\.\w+)+/,
                    feedback: 'O e-mail deve ser em formato válido'
                }
            ]
        }

        this.name = user.name
        this.cpf = user.cpf
        this.phone = user.phone
        this.email = user.email

        this.arrFields = ['name', 'cpf', 'phone', 'email']

        this.errors = false

    }

    set name(name) { this.uname.value = name || this.uname.default }
    get name(){ return this.uname.value }
    
    set cpf(cpf = ''){
        if(cpf && this.ucpf.digits){
            cpf = cpf.replace(/\D/g, '')
        }
        this.ucpf.value = (cpf ? '' + cpf : cpf) || this.ucpf.default
    }
    get cpf(){
        let cpf = this.ucpf.value
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
        cpf = cpf.replace(/(\d{3})(\d{2})/, "$1-$2")
        return cpf
    }
    
    set phone(phone) {
        if(phone && this.uphone.digits){
            phone = phone.replace(/\D/g, '')
        }
        this.uphone.value = (phone ? '' + phone : phone) || this.uphone.default
    }
    get phone(){
        let phone = this.uphone.value
        phone = phone.replace(/(\d{2})(\d)/, "($1) $2")
        if(phone.length === 13) phone = phone.replace(/(\d{4})(\d)/, "$1-$2")
        if(phone.length === 14) phone = phone.replace(/(\d{5})(\d)/, "$1-$2")
        return phone
    }
    
    set email(email) { this.uemail.value = email || this.uemail.default }
    get email(){ return this.uemail.value }

    get submitErrors(){
        const errors = {}

        this.arrFields.forEach(propName => {
            const prop = this['u' + propName]
            prop.rules.forEach(rule => {
                if(rule.error){
                    errors[propName] = errors[propName] || []
                    errors[propName].push( rule.feedback )
                }
            })
        })

        return errors
    }

    preSave(){
        
        this.errors = false
        this.arrFields.forEach(propName => {
            const prop = this['u' + propName]
            prop.rules.forEach(rule => this.performTest(prop, rule))
        })

        if(this.errors){
            return this
        } else {
            return false
        }

    }

    performTest(prop, rule){

        const test = rule.test,
              value = prop.value

        let condition;
        if( test.constructor === String ) condition = eval(test)
        if( test.constructor === RegExp ) condition = test.test(value)

        if( (rule.rev && !condition) || condition ) rule.error = false
        else this.errors = rule.error = true

    }

}