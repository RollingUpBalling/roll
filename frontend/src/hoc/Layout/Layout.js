import React, { Component } from 'react';

import Aux from '../Auxillary/Auxillary';
import Logo from '../../components/Logo/Logo';
import LanguageSelector from '../../components/UI/LanguageSelector/LanguageSelector';
import VolumeSelector from '../../components/UI/VolumeSelector/VolumeSelector';
import DropDownMenu from '../../components/UI/DropDownMenu/DropDownMenu';

import classes from './Layout.module.css';

class Layout extends Component {

    state = {
        language : "EN",
        volume : true,
        showLanguages : false,
        showLinks : false,
    };

    changeVolumeHandler = () => {
        this.setState({ volume : !this.state.volume });
    };

    showLanguageMenuHandler = () => {
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

    showLinksMenuHandler = () => {
        this.setState({showLinks : !this.state.showLinks});
    }

    render() {
        return (
            <Aux>
                <div className={classes.Layout}>
                    <Logo />
                    <LanguageSelector 
                        language={this.state.language}
                        show={this.state.showLanguages}
                        clicked={this.showLanguageMenuHandler}
                        ENChange={this.changeEnLanguage}
                        RUChange={this.changeRULanguage}/>
                    <VolumeSelector 
                        clicked={this.changeVolumeHandler}
                        volume={this.state.volume}/>
                    <DropDownMenu 
                        clicked={this.showLinksMenuHandler}
                        show={this.state.showLinks}/>
                </div> 
               {this.props.children}
            </Aux>
        );
    }
};

export default Layout;