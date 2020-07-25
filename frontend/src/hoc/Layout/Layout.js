import React, { Component } from 'react';

import Aux from '../Auxillary/Auxillary';
import Logo from '../../components/Logo/Logo';
import LanguageSelector from '../../components/UI/LanguageSelector/LanguageSelector';
import VolumeSelector from '../../components/UI/VolumeSelector/VolumeSelector';

import classes from './Layout.module.css';

class Layout extends Component {

    state = {
        language : "EN",
        volume : true,
        showLanguages : false,
    };

    changeVolumeHandler = () => {
        this.setState({ volume : !this.state.volume });
    };

    showMenuHandler = () => {
        this.setState({showLanguages : !this.state.showLanguages});
    }
    changeEnLanguage = () => {
        this.setState({ 
            language : "EN",
            showLanguages : false
        });
    }
    changeRULanguage = () => {
        this.setState({
            language : "RU",
            showLanguages : false
        });
    }

    render() {
        return (
            <Aux>
                <div className={classes.Layout}>
                    <Logo />
                    <LanguageSelector 
                        language={this.state.language}
                        show={this.state.showLanguages}
                        clicked={this.showMenuHandler}
                        ENChange={this.changeEnLanguage}
                        RUChange={this.changeRULanguage}/>
                        <VolumeSelector 
                        clicked={this.changeVolumeHandler}
                        volume={this.state.volume}
                    />
                    <div className={classes.LayoutRightSide}>
                        <div className={classes.LayoutLinks}>
                            <span className="fa fa-telegram" aria-hidden="true"></span>
                            <span className="fa fa-instagram" aria-hidden="true"></span>
                            <span className="fa fa-vk" aria-hidden="true"></span>
                        </div>
                        <div className={classes.LayoutSteamButton}>
                            <span>Войти через стим</span>
                            <i className="fa fa-steam" aria-hidden="true"></i>
                        </div>
                    </div>
                </div> 
               {this.props.children}
            </Aux>
        );
    }
};

export default Layout;