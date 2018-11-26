import { Controller } from '../controllers'
import { UserModel } from '../models'

export class ctrlList extends Controller {
    
    constructor(){
        super()

        this.setState({
            users: []
        })

        if(!this.checkStorage()) this.getInitalData()

        this.getInitalData = this.getInitalData.bind(this)
        
        this.parseUsers = this.parseUsers.bind(this)
        this.parseUsersBatch = this.parseUsersBatch.bind(this)

    }

    checkStorage(){
        let storedItems = sessionStorage.getItem('users')
        if(storedItems){
            storedItems = JSON.parse(storedItems)
            storedItems = storedItems.map(item => new UserModel(item))
            this.setState({ users: storedItems || [] })
            return true
        } else {
            return false
        }
    }

    async getInitalData(){
        const request = await fetch('https://private-21e8de-rafaellucio.apiary-mock.com/users', {
            method: 'GET'
        })
        const users = await request.json()
        if(users && users.length) this.parseUsersBatch(users)
    }

    parseUsers(user){
        this.setState({
            users: [ ...this.state.users, new UserModel(user) ]
        })
    }

    parseUsersBatch(users){
        users.forEach( user => this.parseUsers(user) )
        sessionStorage.setItem('users', JSON.stringify(users))
    }

}