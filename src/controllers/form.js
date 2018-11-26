import { Controller } from './controller'
import { UserModel } from '../models'
import { FormParser } from '../app/formParser'

export class ctrlForm extends Controller {
    
    constructor(){
        super()

        this.setState({
            user: new UserModel()
        })

    }

    onBeforeRender(element){
        return new FormParser( element, this.state )
    }

    onSubmit(){
        console.log('submit')
    }

}