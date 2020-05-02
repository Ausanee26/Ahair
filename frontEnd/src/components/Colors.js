import React from "react";
import { connect } from 'react-redux';
import {Colorstock} from '../redux/index'
import { Link } from 'react-router-dom';
import NavBarShop from "./NavBarShop";
import axios from 'axios'

export const AddColorCheckBox = props => {
    return (
        <div className = "checkbox_info">
            <input 
                key = {props.id}  
                onClick = {props.addcolorChecked} 
                type = "checkbox" 
                checked = {props.isChecked} 
                value = {props.value} 
                onChange={()=>{}}
            /> 
            <div style={{backgroundColor:props.value, width:"90%", textAlign:"center", padding:"20px 0px 20px 0px", marginLeft:"5px", borderColor:"white", borderWidth:"1px", borderStyle:"solid"}}>
                {props.value}
            </div>
        </div>
    )
}

export const ColorCheckBox = props => {
    return (
        <div className = "checkbox_info" style={{display:"inline-flex",flexWrap:"wrap"}}>
            <input 
                key = {props.id} 
                onClick = {props.colorChecked} 
                type = "checkbox" 
                checked = {props.isChecked} 
                value = {props.value} 
                onChange={()=>{}}
            /> 
            <div style={{backgroundColor:props.value, width:"90%", textAlign:"center", padding:"20px 0px 20px 0px", marginLeft:"5px", borderColor:"white", borderWidth:"1px", borderStyle:"solid"}}>
                {props.value}
            </div>
        </div>
    )
}

class Colors extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: this.props.shopColorStore || [], 
            add: "",
            addcolor: [],
            shopColorstock : []
        }
    }
    
    colorChecked = event => {
        this.props.shopColorStore.forEach(color => {
        if (color.value === event.target.value)
            color.isChecked =  event.target.checked
        })
        this.setState({color: this.props.shopColorStore})
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({shopColorstock:[]})
        // console.log(this.state.color)
        this.props.shopColorStore.forEach(color => {
            if(color.isChecked){
                this.state.shopColorstock.push({id:this.state.shopColorstock.length, value: color.value, key: this.state.shopColorstock.length, isChecked:color.isChecked})
            }
        })
        if(this.state.addcolor) {
            this.state.addcolor.forEach(addcolor => {
                if(addcolor.isChecked){
                    this.state.shopColorstock.push({id:this.state.shopColorstock.length, value: addcolor.value, key: this.state.shopColorstock.length, isChecked:addcolor.isChecked})
                    this.props.shopColorStore.push({id:this.props.shopColorStore.length, value: addcolor.value, key: this.props.shopColorStore.length, isChecked:addcolor.isChecked})
                }
            })
        }
        
        console.log(this.state.shopColorstock)
        this.props.stock(this.state.color)
        
        const shopInformation = {
            address : this.props.shopInfoStore.address,
            openTime : this.props.shopInfoStore.openhours,
            closeTime : this.props.shopInfoStore.closehours,
            // shopImg : this.props.shopInfoStore.imageUrl,
            colors : this.state.shopColorstock
        }
        axios.post('https://us-central1-g10ahair.cloudfunctions.net/api/shop',shopInformation ,{headers: {'Authorization':'Bearer ' + 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVlOWVlOTdjODQwZjk3ZTAyNTM2ODhhM2I3ZTk0NDczZTUyOGE3YjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZzEwYWhhaXIiLCJhdWQiOiJnMTBhaGFpciIsImF1dGhfdGltZSI6MTU4ODA5NTYyOCwidXNlcl9pZCI6ImxZaDJ6djJ0M1dYQUdiWVVkN2syeXRreDllWTIiLCJzdWIiOiJsWWgyenYydDNXWEFHYllVZDdrMnl0a3g5ZVkyIiwiaWF0IjoxNTg4MDk1NjI4LCJleHAiOjE1ODgwOTkyMjgsImVtYWlsIjoibmV3MkBlbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibmV3MkBlbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.HmF4xbkd8X8LczNbVfKJgWOFYpvJGmvmkmQ2-79Mm-a5bTKOmHqWzg2Ofo4ChIV5gsY7IKKsTRtRtePjC5Z-fJOoXkdc7iLEXELGuNn0LTs1-hLdMUYeqyavNsKOCZ_w-6M3KXY0VeYIusDMlXUDZAhGMZstmJgE7_bAo9e7C7eeCZRQzba0C-BShzcoNhT627PXC0C-MYl3fsU05NJ0djHuV7mPiZfTi0zh_7VzHa8bT4AGavgDJfPcRn6cd__KT65EVQ4nvYXsl-lqDGeaFKaUnGUOHcQQe17ExYHGZ5-lPOqVkRxPosK8KatLXCOkv7yCvE5gMcEtbyrxjK6wCA'}})
            .then(function(response){
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            }
        )
        this.props.history.push('/hairstyles')
    }

    typeAddcolor = event => {
        this.setState({[event.target.id]: event.target.value});
        this.setState({add: event.target.value})
    };
    addlist_color = () => {
        this.state.addcolor.push({id: this.state.addcolor.length, value: this.state.add, key: this.state.addcolor.length, isChecked: true})
        this.setState({add:""})
    }

    addcolorChecked = event => {
        this.state.addcolor.forEach(addcolor => {
        if (addcolor.value === event.target.value)
            addcolor.isChecked =  event.target.checked
        })
        this.setState({addcolor: this.state.addcolor})
    }

    render() {
        return (
            <div className="big_container">
                <NavBarShop />
                <div className="wrap_info">

                    <div className = "title">
                        <h1 style={{color:"#CB2D6F",fontSize:"30px"}}>
                            Hair Dye Stock
                        </h1>
                    </div>
                    
                    <div className="signup_form">

                        <div className = "bigcontainer_info">
                            <div className="line_info">
                                <div className = "wrap_checkbox">
                                    
                                    <div className = "wrap_input_add">
                                        <input
                                            className = "input_add" 
                                            type ="text"
                                            value = {this.state.add}
                                            placeholder = "Type what you want..."
                                            onChange = {this.typeAddcolor}
                                        />
                                        <button type="reset" className="login_button" onClick={this.addlist_color}>
                                            Add
                                        </button>
                                    </div>
                                    { 
                                        this.props.shopColorStore.map((color) => {
                                            return (<ColorCheckBox colorChecked={this.colorChecked}  {...color} />)
                                        })
                                    }
                                    { 
                                        this.state.addcolor.map((addcolor) => {
                                            return (<AddColorCheckBox addcolorChecked={this.addcolorChecked}  {...addcolor} />)
                                        })
                                    }

                                </div>
                            </div>
      
                        </div>
                        <div className="container_next_bt">
                            <Link className="link" to="/information">
                                <div>
                                    <button className="login_button" type="reset">
                                        Back
                                    </button>
                                </div>
                            </Link>
                            <form onSubmit={this.handleSubmit} >
                                <button className="login_button" type="submit" onClick={this.handleSubmit}>
                                    Next
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => { //subscribe
    return {
        shopColorStore: state.ShopInformationReducer.colorstock,
        shopInfoStore: state.ShopInformationReducer.shopinfo
    }       
}
const mapDispatchToProps =(dispatch) => {
    return {
        stock: (data) => dispatch(Colorstock(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Colors);