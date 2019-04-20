import React, { Component } from 'react';
import { COLORS} from './constants'
import { Stage, Layer, Rect, Circle } from 'react-konva';
import SideLine from './SideLine'
import Box from './Box'
import './BodyCanvas.css'
import Modal from 'react-responsive-modal';


export default class BodyCanvas extends Component{
    
    state = {
        width: 0,
        height: 0,

        colorBody: COLORS.bodyDefault,
        colorLine: COLORS.lineDefault,
        colorBoxes: COLORS.boxDefault,
        colorCircle: COLORS.circleDefault,
        row: 5,
        colomn: 5,
        marginWidth: 0,
        marginHeight: 0,
        coordsBoxes: [], // 
        playerMove: Math.random() < 0.5, // who should move, if layerMove = true { move player1 } else { move player2 }
        player1CounterFillBox: 0, 
        player2CounterFillBox: 0,
        reset: false,
        showModalSettings: false,
        showModalTutorial: false,
        showModalWinner: true
    };
    
    // handlers for modal windows
    handleOpenModalSettings = () => this.setState({ showModalSettings: true });
      
    handleCloseModalSettings = () => this.setState({ showModalSettings: false });

    handleOpenModalTutorial = () => this.setState({ showModalTutorial: true });
      
    handleCloseModalTutorial = () => this.setState({ showModalTutorial: false });
      
    handleCloseModalWinner = () => this.setState({ showModalWinner: false });

    // set primary states
    componentWillMount(){ 
        this.setState({
            width: window.innerHeight ,
            height: window.innerHeight - 130,
            marginWidth:window.innerHeight  / (this.state.colomn + 2),  // distance width between dots
            marginHeight: ( window.innerHeight - 130 ) / (this.state.row + 2),  // distance height between dots
        })
    } 

    componentDidMount(){
        this.boxesCoords()
       
    }

    // update states for reset and resize
    componentDidUpdate(prevProps, prevState){
        
        // if(prevState.colomn !== this.state.colomn && prevState.row !== this.state.row){
        //     this.reset()
        // }
        if(prevState.reset !== this.state.reset){
            this.reset()
            this.setState({
                marginWidth:  this.state.width  / (this.state.colomn + 2),  // distance width between dots
                marginHeight: this.state.height / (this.state.row + 2),  // distance height between dots
                reset: false
            })
        }      
    }

    gridX = (i) => this.state.marginWidth * (i + 1) 

    gridY = (j) => this.state.marginHeight  * (j + 1)
    
    circleGridCoords = () => { // calculate circle coordinates
        var circleCoords = [];
        for (let i = 0; i < this.state.row + 1; i++){
            for (let j = 0; j < this.state.colomn + 1; j++){
                circleCoords.push({x: this.gridX(j),y: this.gridY(i)});       
            }
        }
        return circleCoords
    }

    linesCoords = () => { // calculate line coordinates
        var linesCoords = [];
        for (let i = 0; i < this.state.row + 1; i++){
            for (let j = 0; j < this.state.colomn; j++){
                linesCoords.push({
                    x0: this.gridX(j), 
                    y0: this.gridY(i), 
                    x1: this.gridX(j +1 ), 
                    y1: this.gridY(i)}
                );       
            }
        }
        for (let i = 0; i < this.state.row ; i++){
            for (let j = 0; j < this.state.colomn +1; j++){
                linesCoords.push({
                    x0: this.gridX(j), 
                    y0: this.gridY(i), 
                    x1: this.gridX(j), 
                    y1: this.gridY(i + 1),
                    }
                );       
            }
        }
        return linesCoords
    }
 
    boxesCoords = () => { // calculate boxes coordinates
        var coordsBoxes = []
        for (let i = 0; i < this.state.row ; i++){
            for (let j = 0; j < this.state.colomn; j++){
                coordsBoxes.push({
                    left: this.gridX(j), 
                    top: this.gridY(i), 
                    right: this.gridX(j + 1), 
                    bottom: this.gridY(i + 1) ,
                    sides: {left: false, top: false, right: false, bottom: false}, // for check lateral sides
                    color: this.state.colorBoxes
                })
            }
        }
        this.setState({coordsBoxes: coordsBoxes})
    }

    checkAllSideWereCkicked = (boxCoords, playerMove, checkPlayerMove) =>{
        if (boxCoords.sides.top && boxCoords.sides.left && boxCoords.sides.right && boxCoords.sides.bottom){  // all sides were clicked
            boxCoords.color = this.state.playerMove ? COLORS.boxPlayer1 : COLORS.boxPlayer2 // select color for fill box
            // add counder score
            this.state.playerMove ? this.setState({ player1CounterFillBox : this.state.player1CounterFillBox +1}) : this.setState({ player2CounterFillBox : this.state.player2CounterFillBox +1})
            playerMove = (checkPlayerMove) ? !playerMove : playerMove // change player`s move
            checkPlayerMove = false // box was filled 
            return {boxCoords, playerMove, checkPlayerMove}
        }
        return {boxCoords, playerMove, checkPlayerMove}
    }

    ifLineIsBoxSide = (el, boxCoords, playerMove, checkPlayerMove, side, coord) => {
        if( el[0] === boxCoords[coord[0]] && el[1] === boxCoords[coord[1]] && el[2] === boxCoords[coord[2]] && el[3]  === boxCoords[coord[3]] ){ //  side  
            boxCoords.sides[side] = true; // side were clicked
            return ({boxCoords, playerMove, checkPlayerMove} = this.checkAllSideWereCkicked(boxCoords, playerMove, checkPlayerMove))
        }
        return ({boxCoords, playerMove, checkPlayerMove})
    }

    handleClickLine = (el) => { // 
        let playerMove = this.state.playerMove
        let checkPlayerMove = true // variable to check whether the boxes is already fill
        this.state.coordsBoxes.forEach(boxCoords =>{     
            // If you click on a line, we are looking for which boxes this is a side   
            ({boxCoords, playerMove, checkPlayerMove} = this.ifLineIsBoxSide(el, boxCoords, playerMove, checkPlayerMove, 'left', ['left', 'top', 'left', 'bottom']));
            ({boxCoords, playerMove, checkPlayerMove} = this.ifLineIsBoxSide(el, boxCoords, playerMove, checkPlayerMove, 'top', ['left', 'top', 'right', 'top']));
            ({boxCoords, playerMove, checkPlayerMove} = this.ifLineIsBoxSide(el, boxCoords, playerMove, checkPlayerMove, 'right', ['right', 'top', 'right', 'bottom']));
            ({boxCoords, playerMove, checkPlayerMove} = this.ifLineIsBoxSide(el, boxCoords, playerMove, checkPlayerMove, 'bottom', ['left', 'bottom', 'right', 'bottom']));
        })
        return this.setState({playerMove: !playerMove })
    }

    whoIsWinner = () =>{ 
        if(this.state.player1CounterFillBox + this.state.player2CounterFillBox === this.state.colomn * this.state.row){
            if(this.state.player1CounterFillBox > this.state.player2CounterFillBox){
                return(
                    <Modal open={this.state.showModalWinner} onClose={this.handleCloseModalWinner} center>
                        <h2 className='winner1'> player 1 winner </h2>
                    </Modal>
                )
            }else if (this.state.player1CounterFillBox < this.state.player2CounterFillBox){
                return(
                    <Modal open={this.state.showModalWinner} onClose={this.handleCloseModalWinner} center>
                       <h2 className='winner2'> player 2 winner </h2>
                    </Modal>
                )
            }else{
                return(
                    <Modal open={this.state.showModalWinner} onClose={this.handleCloseModalWinner} center>
                           <h2 className='draw'> draw </h2>
                    </Modal>
                    
                )
            }
        }
    }

    reset = () =>{ // back to primary state
        this.boxesCoords()
        this.setState({
            playerMove: Math.random() < 0.5, 
            player1CounterFillBox: 0, 
            player2CounterFillBox: 0,
            showModalWinner: true,
            reset: true
        })
    }

    changeSizeRowAndColomn = () => { // apply change
        this.setState({
            colomn: +this.refs.colomn.value, 
            row: +this.refs.row.value,
            marginWidth: window.innerWidth / (this.state.colomn + 2),  // distance width between dots
            marginHeight: window.innerHeight / (this.state.row + 2),  // distance height between dots
            showModalSettings: false, // close modal window
            reset: true 
        })  
    }

    addOneColomn = () => this.refs.colomn.value = (+this.refs.colomn.value < 10 ) ? +this.refs.colomn.value + 1 : 10

    subOneColomn = () => this.refs.colomn.value = (+this.refs.colomn.value > 1) ? +this.refs.colomn.value - 1 : 1

    addOneRow = () => this.refs.row.value = (+this.refs.row.value < 10 ) ? +this.refs.row.value + 1 : 10

    subOneRow = () => this.refs.row.value = (+this.refs.row.value > 1) ? +this.refs.row.value - 1 : 1
    
    render(){   
        const border = 10;
        const shadow = 10;
       
        const circles = this.circleGridCoords().map((el,index)=>{
            return <Circle key={index} x={el.x} y={el.y} radius={12} fill={this.state.colorCircle} />
        })
       
        const lines = this.linesCoords().map((el,index)=>{
            // console.log('+')
            return (
                <SideLine
                    key = {index}  
                    x0 ={el.x0}
                    y0 = {el.y0}
                    x1 = {el.x1} 
                    y1 = {el.y1}
                    color = {this.state.colorLine}
                    onClick = {this.handleClickLine}
                    playerMove = {this.state.playerMove}
                    reset = {this.state.reset}
                />
            )
        })
 
        const boxes = this.state.coordsBoxes.map((el, index) =>{
            return (
                <Box
                    key = {index}
                    left={el.left}
                    top={el.top}
                    right={el.right}
                    bottom={el.bottom}
                    color={el.color}
                />  
            )
        })
        
        const winner = this.whoIsWinner()
        return(
            <div className='app'>
                <div className='tools'>
                    <div >
                        <button onClick={this.handleOpenModalSettings} className='settings btn'>settings</button>
                        <Modal open={this.state.showModalSettings} onClose={this.handleCloseModalSettings} center>
                            <div className='settings'>
                                <h2>Settings</h2>
                                <div className='settingColomn'>
                                    <div>colomn</div>
                                    <div>
                                        <button type="button" onClick={this.subOneColomn}>-</button>
                                        <input ref='colomn' type="text" value={this.state.colomn} max="20" readOnly />
                                        <button type="button" onClick={this.addOneColomn}>+</button>
                                    </div>
                                </div>
                                <div className='settingRow'>
                                    <div>row</div>
                                    <div>
                                        <button type="button" onClick={this.subOneRow}>-</button>
                                        <input ref='row' type="text" value={this.state.row} max="20" readOnly />
                                        <button type="button" onClick={this.addOneRow}>+</button>
                                    </div>
                                </div>
                                <button className='btn' onClick={this.changeSizeRowAndColomn}>apply</button>
                            </div>
                           
                        </Modal>
                    </div>
                    <div>
                        <button onClick = {this.reset } className='reset btn'>reset</button>
                    </div>
                    <div>
                        <button onClick={this.handleOpenModalTutorial} className='tutorial btn'>tutorial</button>
                        <Modal open={this.state.showModalTutorial} onClose={this.handleCloseModalTutorial} center>
                           <h2 className='tutorial'>Tutorial</h2>
                           <p>
                                The game starts with an empty grid of dots. Two players take turns adding a single horizontal or vertical line between two unjoined adjacent dots. 
                                Each player has a color that can identify who have a move. 
                                A player who completes the fourth side of a 1×1 box earns one point and takes another turn. (A cell is filled 
                                a color that identifies the player in the box) The game ends when no more lines can be placed. The winner is the player with the most points. 
                                The board may be of any size grid from 1×1 to 10×10.
                             </p>
                        </Modal>
                    </div>
                </div>

                <div className='gameInfo'>
                    <div className='player1' > 
                        <div 
                            className='playerName' 
                            style = { this.state.playerMove ? {border: `2px solid ${COLORS.boxPlayer1}`} : {border: `2px solid rgba(0,0,0,0)`}} 
                        > 
                            player 1 
                        </div> 
                        <div className='score'>{this.state.player1CounterFillBox} </div>
                    </div>

                        <div className='player2' >  
                        <div className='score'>{this.state.player2CounterFillBox} </div> 
                        <div 
                            className='playerName' 
                            style = { this.state.playerMove ? {border: `2px solid rgba(0,0,0,0)`} : {border: `2px solid ${COLORS.boxPlayer2}`}}
                        >
                            player 2 
                        </div> 
                    </div>
                </div>
                
                {winner}
                <div className='canvas'>
                    <Stage  onMouseMove={this.highlightSide} width={this.state.width+border*2} height={this.state.height+border*2}>
                        <Layer ref= 'layer'> 
                            <Rect
                                x={border}
                                y={border}
                                width={this.state.width-border*2}
                                height={this.state.height-border*2}
                                fill={this.state.colorBody}
                                shadowBlur={shadow}
                                stroke={COLORS.borderBody} 
                                strokeWidth={border} 
                            />  
                            {boxes}
                            {lines}
                            {circles}
    
                        </Layer>
                    </Stage> 
                </div>
            </div>
        )
    }
}
