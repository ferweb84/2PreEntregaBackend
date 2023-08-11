
export default class CurrentUserDto{
   
  constructor(user){
      console.log(user.first_name)
      this.first_name = user.first_name
      this.last_name = user.last_name
      this.email= user.email
      
  }
}