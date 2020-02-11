import React, { Component } from 'react'

 class Subscription extends Component {

    constructor(props)
    {
        super(props);
        this.state=
        {
            email:'',
            error:false,
            success:false
        }
    }

    onChangeInput=(event)=>
    {
       this.setState({email:event.target.value})
    } 

  //Fucntion for saving email data into Database
    saveSubscription=(email)=>
    {

        const URL_EMAIL='http://localhost:3004/subcriptions';

        fetch(URL_EMAIL,
            {
             method:'Post',
             headers:{
                 'Accept':'application/json',
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({email})
            })
            .then(res=>res.json())
            .then(()=>
            {
                this.setState({email:'',success:true});
            })

    }

    changeMessages=()=>
    {
       setTimeout(()=>{
       this.setState({error:false,success:false})
       },3000)
    }

    // function for handling event by applying Regular expressions
    handleSubmit=(event)=>
    {
      event.preventDefault();
      let email= this.state.email;
      let regex= /\S+@\S+\.\S+/;

      if(regex.test(email))
      {
        this.saveSubscription(email);
      }
      else
      {
          this.setState({error:true});
      }

     this.changeMessages();
    }



    render() {
        return (
            <div>
               <div className="subscribe_panel">
                   <h3> Subscribe to Us    </h3>
                   <div>
                       <form  onSubmit={this.handleSubmit}>
                           <input placeholder="Enter your email address" value={this.state.email} 
                           onChange={this.onChangeInput } type="text"/>
                       </form>
                   </div>
                   <div className={this.state.error ? "error show":"error"}> Check your Email</div>
                   <div className={ this.state.success ? "success show":"success"}> Thank you </div>
                       
                   <small>

                   Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have
                   </small>
               </div>
            </div>
        )
    }
}
export default Subscription;