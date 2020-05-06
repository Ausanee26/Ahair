import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios'
import shopIcon from './pic/1.jpg';
import ShopImgItem from './ShopImgItem'
import shopcreate from './pic/shop_icon.png';
import Sidebar from './Sidebar';
import Hairdresser from './HairdresserItem';
import NavBar from './NavBarShop'
import { connect } from 'react-redux';
import { Shop_2 } from '../redux/index'
import HairdresserItem from './HairdresserItem';

class Shop extends Component {
    constructor(props) {
        super(props)

        this.state = {
            barberName: "",
            barberId: "",
            shopdata: [],
            barberdata: [],
            hadData :false
        }
    }

    componentDidMount() {
        this.getShopData(this.props.shopStore.shopName)
    }

    getShopData = (keyword) => {
        let currentState = this
        var dataArray = []
        var barberurl = "https://us-central1-g10ahair.cloudfunctions.net/api/barber/" + localStorage.getItem('shopname');
        Axios.get(barberurl).then(result => {
            this.setState({ shopdata: result.data });
            result.data.barber.forEach(item => {
                dataArray.push(item)
            })
            this.setState({ barberdata: dataArray});
            if(result.data.barberArray) this.setState({hadData: true})
        })
        .catch(function(error) {
            console.log(error)
            currentState.setState({hadData: false})
        })
    }

    handleOnClick = (item) => {
        console.log("barber: ", this.state.barberdata)
        this.setState({
            barberName: item.barberName,
            barberId: item.barberId
        }, () => {
            this.submit()
        }
        );
    };

    submit = () =>{
        console.log("submitSstate: ",this.state)
        this.props.shop(this.state)
        this.props.history.push('/selecthairstyle')
    }

    render() {
        // const { shopId, shopName, address, phoneNum, vote_average, email, imgUrl } = this.state.rows[0]
        return (
            <body class="is-preload">

                <NavBar />

                {/* <!-- Wrapper --> */}
                <div id="wrapper">

                    {/* Sidebar */}
                    {/* <Sidebar /> */}

                    {/* <!-- Main --> */}
                    <div id="main">

                        {/* <!-- Content --> */}
                        <div class="inner">
                            <section>

                                {/* Topic */}
                                <div className = "title">
                                    <h1 style={{color:"#CB2D6F",fontSize:"30px"}}>
                                        <img class="shop_logo" src={shopIcon} alt="" />
                                        {localStorage.getItem('shopname')}
                                    </h1>
                                </div>

                                {/* Edit Button for admin */}
                                {/* <Link className="link" to="/shop">
                                    <button class="Back">Edit</button>
                                </Link> */}
                                <div style={{display : this.state.hadData ? "block":"none"}}>
                                    {/* image */}
                                    <div style={{display: this.state.shopdata.imgUrl === [] ? "flex":"none"}}>
                                        <ShopImgItem item={this.state.shopdata.imgUrl} />
                                    </div>

                                    {/* information */}
                                    <div class="box_item2" style={{ border: '0' }}>
                                        <div class="sub_box_item">
                                            <h2 style={{ color: '#cb2c6f' }}>Description</h2>
                                            <p style={{ color: '#14a098' }}>Tel. {this.state.shopdata.phoneNum}</p>
                                            <p style={{ color: '#14a098' }}>Email.{this.state.shopdata.email}</p>
                                        </div>
                                        <div class="sub_box_item">
                                            <a href="/shopreview"><h2 style={{ color: '#cb2c6f' }}>Rate</h2></a>
                                            <p style={{ color: 'goldenrod' }}>Something</p>
                                        </div>
                                        <div class="sub_box_item">
                                            <h2 style={{ color: '#cb2c6f' }}>Location</h2>
                                            <p style={{ color: '#14a098' }}>{this.state.shopdata.address}</p>
                                        </div>
                                    </div>

                                    <h2 style={{ color: '#cb2c6f', marginLeft: '0.8em' }}>Barber</h2>

                                    {this.state.barberdata.map(item => (
                                        <a key={item.barberId} onClick={() => this.handleOnClick(item)}>
                                            <HairdresserItem barber_item={item} />
                                        </a>
                                    ))}
                                </div>
                                <div style={{display : this.state.hadData ? "none":"flex",textAlign:"center",flexDirection:"column" ,flexWrap:"wrap",justifyContent:"center",alignItems:"center",width:"100%"}}>
                                    
                                    <div style={{color:"white",textAlign:"center",width:"100%,", justifyContent:"center", alignItems:"center"}}>
                                        <img src={shopcreate} alt="" width="250px"style={{ alignItems:"center"}}/>
                                        <p style={{marginBottom:"30px",fontSize:"20px"}}>Shop Information Did Not Create</p>
                                    </div>
                                    <div style={{color:"white",textAlign:"center",width:"100%,", justifyContent:"center", alignItems:"center"}}>
                                        <Link className="link" to="/information">
                                            <div style={{justifyContent:"center", alignItems:"center"}}>
                                                <button className="login_button" type="submit">
                                                    Create Shop Information
                                                </button>
                                            </div>
                                        </Link>
                                    </div>
                                    
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </body >
        );
    }
}

const mapStateToProps = (state) => { //subscribe
    return {
        shopStore: state.ShopReducer.shop
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        shop: (data) => dispatch(Shop_2(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);