import React, { Component } from 'react';

import classes from './BetController.module.css';

class BetController extends Component {

    state = {
        koef : [
          {
             id : 'i1',
             value : 1.1
         },
          {
            id : 'i2',
            value : 1.5
         },
         {
             id : 'i3',
             value : 2
         },
          {
             id : 'i4',
             value : 3
         },
         {
             id : 'i5',
             value : 5
         }
        ],
        changedKoef : [],
        mainKoef : 5,
        changeMod : false,
    }

    changeKoef = (index) => {
        let newMainKoef = this.state.koef[index].value;
        this.setState({ mainKoef : newMainKoef});
   }

   koefChangedHandler = (event) => {
    this.setState({ mainKoef: event.target.value });
  }

  inputChangeHandler = (event, index) => {
      let updatedKoef = [...this.state.changedKoef];
      updatedKoef[index].value = event.target.value;
      this.setState({
        changedKoef : updatedKoef
      });
  }
  
  openChangeModHandler = () => {
      this.setState({
          changeMod : true,
          changedKoef : [...this.state.koef]
        });
  }
  closeChangeModHandler = () => {
      this.setState({changeMod : false});
  }

  saveUpdatedKoef = () => {
      let updatedKoef = [...this.state.changedKoef];
      this.setState({
          koef : [...updatedKoef],
          changeMod : false
        });
  }


    render() {

        let buttonTrain;
        if (!this.state.changeMod) {
            buttonTrain = this.state.koef.map((el, index) => {
                return (
                    <button 
                        key={index}
                        className={classes.KoefButton}
                        onClick={()=>{
                            this.changeKoef(index);
                        }}>
                        {"X" + el.value}
                    </button>
                );
            });
        }
        else {
            buttonTrain = this.state.changedKoef.map((el, index) => {
                return (
                    <input 
                    key={index}
                    className={classes.ChangeInput}
                    type='number'
                    min='1'
                    value={el.value}
                    onChange={(event)=>{
                        this.inputChangeHandler(event, index);
                    }}
                    />
                );
            });
        }


        return (
                <div className={classes.BetController}>
                    <div className={classes.BetControllerHeader}>
                        <h1>CREATE BET</h1>
                        {this.state.changeMod ? 
                        (<div 
                        className={classes.CloseButton}
                        onClick={this.closeChangeModHandler}>
                            CLOSE
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </div>) 
                        : 
                        (<div 
                        className={classes.EditButton}
                        onClick={this.openChangeModHandler}>
                            EDIT
                            <i className="fa fa-list-ul" aria-hidden="true"></i>
                        </div>)}
                    </div>
                    <div className={classes.KoefInformation}>
                       {buttonTrain}
                        {this.state.changeMod ?
                        (
                            <button 
                            onClick={this.saveUpdatedKoef}
                            className={classes.SaveButton}>
                                Save
                            </button>
                        )
                        :
                        (
                            <input 
                            onChange={this.koefChangedHandler}
                            type='number' 
                            min='0' 
                            max='1000'
                            value={this.state.mainKoef}
                            className={classes.KoefInput}/>)}
                    </div>
                </div>
        );
    }
};

export default BetController;