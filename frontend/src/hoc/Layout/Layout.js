import React, { Component } from 'react';

import Aux from '../Auxillary/Auxillary';
import Logo from '../../components/Logo/Logo';
import LanguageSelector from '../../UI/LanguageSelector/LanguageSelector';
import VolumeSelector from '../../UI/VolumeSelector/VolumeSelector';

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
                    volume={this.state.volume}/>
                </div> 
               {this.props.children}
            </Aux>
        );
    }
};

export default Layout;