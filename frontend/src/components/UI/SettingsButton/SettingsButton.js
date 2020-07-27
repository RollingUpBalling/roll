import React, {Component} from 'react';
import { Modal } from 'react-bootstrap';

import classes from './SettingsButton.module.css';

class SettingsButton extends Component {

    state = {
        isModalOpen: false,
    };

    settingsHandler = () => {
        this.setState({isModalOpen : !this.state.isModalOpen});
    };

    render() {
        return(
            <>
                <div className={classes.SettingsButton} onClick={this.settingsHandler} >
                    <i className="fa fa-cog" aria-hidden="true"></i>
                </div>
                <Modal
                    show={this.state.isModalOpen}
                    dialogClassName={classes.ModalSettings}
                    backdrop='static'
                >
                    <Modal.Body className={classes.Content}>
                        <div style={{position: "relative"}}>
                            <div className={classes.CloseButton} onClick={this.settingsHandler}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </div>
                            <div className={classes.ContentSettings}>
                                <div className={classes.Header}>Настройки</div>
                                <div>
                                    <input type="checkbox" name="change animation" id="change animation" />
                                    <label for="change animation" onClick={this.props.settingsHandler[0]} >Анимация на сайте</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="stickers" id="stickers"/>
                                    <label for="stickers" onClick={this.props.settingsHandler[1]}>Включить стрикеры</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="auto stickers" id="auto stickers"/>
                                    <label for="auto stickers" onClick={this.props.settingsHandler[2]}>Автовоспроизвидение стикеров</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="streaming" id="streaming"/>
                                    <label for="streaming" onClick={this.props.settingsHandler[3]}>Режим стримера</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="alt cash" id="alt cash"/>
                                    <label for="alt cash" onClick={this.props.settingsHandler[4]}>Альтернативная валюта</label>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default SettingsButton;