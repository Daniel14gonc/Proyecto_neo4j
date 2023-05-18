/* eslint-disable */
import './titleBar.css';
import avatar from '../../assets/avatar.png';
import logo from '../../assets/logo.png';

export default function TitleBar({name, subscription, setModal, profileModal, setProfileModal}){

    return (
        <div className="title-bar">
           
           <img src={avatar} width={'100'} height={'100'} />


           <div className= "right-items">

           <img src ={avatar}/>

            <div className = 'user-info'>
                <p>{subscription}</p>
                <h1>{name}</h1>
            </div>

           </div>
           
        </div>
    )
}