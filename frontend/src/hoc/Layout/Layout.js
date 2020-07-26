import React, { Component } from 'react';

import Aux from '../Auxillary/Auxillary';
import Logo from '../../components/Logo/Logo';
import LanguageSelector from '../../components/UI/LanguageSelector/LanguageSelector';
import VolumeSelector from '../../components/UI/VolumeSelector/VolumeSelector';
import DropDownMenu from '../../components/UI/DropDownMenu/DropDownMenu';
import SocialLinks from '../../components/Navigation/SocialLinks/SocialLinks';
import SignInButton from '../../components/UI/SignInButton/SignInButton';
import SettingsButton from '../../components/UI/SettingsButton/SettingsButton';


import classes from './Layout.module.css';

class Layout extends Component {

    state = {
        language : "EN",
        volume : true,
        showLanguages : false,
        showLinks : false,

        changeAnimation: false,
        stickers: false,
        autoStickers: false,
        streaming: false,
        altCash: false,
    };

    changeVolumeHandler = () => {
        this.setState({ volume : !this.state.volume });
    };

    showLanguageMenuHandler = () => {
        this.setState({showLanguages : !this.state.showLanguages});
    };
    changeEnLanguage = () => {
        this.setState({ 
            language : "EN",
            showLanguages : false
        });
    };
    changeRULanguage = () => {
        this.setState({
            language : "RU",
            showLanguages : false
        });
    };

    showLinksMenuHandler = () => {
        this.setState({showLinks : !this.state.showLinks});
    };

    changeAnimationHandler = () => {
        this.setState({changeAnimation : !this.state.changeAnimation});
    };
    stickersHandler = () => {
        this.setState({stickers : !this.state.stickers});
    };
    autoStickersHandler = () => {
        this.setState({autoStickers : !this.state.autoStickers});
    };
    streamingHandler = () => {
        this.setState({streaming : !this.state.streaming});
    };
    altCashHandler = () => {
        this.setState({altCash : !this.state.altCash});
    };

    render() {

        const settingsHandler = new Array();
        const settingsArray = new Array();
        settingsHandler.push(this.changeAnimationHandler);
        settingsHandler.push(this.stickersHandler);
        settingsHandler.push(this.autoStickersHandler);
        settingsHandler.push(this.streamingHandler)
        settingsHandler.push(this.altCashHandler);
        console.log(settingsHandler);
        console.log(this.state.changeAnimation);

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
                    <div className={classes.LayoutRightSide}>
                        <SocialLinks />
                        <SignInButton />
                        <SettingsButton
                           settingsHandler = {settingsHandler}/>
                    </div>   
                </div>
               {this.props.children}
            </Aux>
        );
    }
};

export default Layout;