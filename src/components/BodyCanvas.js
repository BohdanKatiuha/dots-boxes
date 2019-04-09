import React, { Component } from 'react';
import {WIDTH, HEIGHT, COLORS} from './constants'
import { Stage, Layer, Rect, Circle } from 'react-konva';
import SideLine from './SideLine'
import Box from './Box'
import './BodyCanvas.css'
// import {ReactModal} from 'react-modal'
import Modal from 'react-responsive-modal';

// const constants = {
//     WIDTH: 700,
//     HEIGHT: 600,
//     COLORS: {
//         bodyDefault: '#e6f5ff',
//         lineDefault: '#fffff6',
//         circleDefault: '#0099ff'
//     }
// }

export default class BodyCanvas extends Component{
    

    state = {
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
    

    handleOpenModalSettings = () => this.setState({ showModalSettings: true });
      
    handleCloseModalSettings = () => this.setState({ showModalSettings: false });

    handleOpenModalTutorial = () => this.setState({ showModalTutorial: true });
      
    handleCloseModalTutorial = () => this.setState({ showModalTutorial: false });
      
    handleCloseModalWinner = () => this.setState({ showModalWinner: false });

    componentWillMount(){ 
        this.setState({
            marginWidth: WIDTH / (this.state.colomn + 2),
            marginHeight: HEIGHT / (this.state.row + 2),
        })
        
    } 

    componentDidMount(){
        this.boxesCoords()
        
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.colomn !== this.state.colomn && prevState.row !== this.state.row){
            this.reset()
        }
        if(prevState.reset !== this.state.reset){
            this.setState({
                marginWidth: WIDTH / (this.state.colomn + 2),
                marginHeight: HEIGHT / (this.state.row + 2),
                reset: false,
                showModalWinner: true
            })
        }        
    }

    gridX = (i) => this.state.marginWidth * (i + 1) 

    gridY = (j) => this.state.marginHeight  * (j + 1)
    
    circleGridCoords = () => {
        var circleCoords = [];
        for (let i = 0; i < this.state.row + 1; i++){
            for (let j = 0; j < this.state.colomn + 1; j++){
                circleCoords.push({x: this.gridX(j),y: this.gridY(i)});       
            }
        }
        return circleCoords
    }

    linesCoords = () => {
        var linesCoords = [];
        for (let i = 0; i < this.state.row + 1; i++){
            for (let j = 0; j < this.state.colomn; j++){
                linesCoords.push({
                    x0: this.gridX(j), 
                    y0: this.gridY(i), 
                    x1: this.gridX(j) + this.state.marginWidth, 
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
                    y1: this.gridY(i) + this.state.marginHeight,
                    }
                );       
            }
        }
        return linesCoords
    }


    
    boxesCoords = () => {
        var coordsBoxes = []
        console.log(this.state.colomn)
        for (let i = 0; i < this.state.row ; i++){
            for (let j = 0; j < this.state.colomn; j++){
                coordsBoxes.push({
                    left: this.gridX(j), 
                    top: this.gridY(i), 
                    right: this.gridX(j) + this.state.marginWidth, 
                    bottom: this.gridY(i) + this.state.marginHeight,
                    sides: {left: false, top: false, right: false, bottom: false},
                    color: this.state.colorBoxes
                })
                      
            }
        }

        this.setState({coordsBoxes: coordsBoxes})
    }

    handleClickLine = (el) => {
        // console.log(this.state.course)
        let playerMove = this.state.playerMove
        let checkPlayerMove = true
        const coords = this.state.coordsBoxes.forEach(boxCoords =>{
            // console.log(boxCoords)
            
            if( el[0] === boxCoords.left && el[1] === boxCoords.top && el[2] === boxCoords.left && el[3]  === boxCoords.bottom ){
                boxCoords.sides.left = true
                
                if (boxCoords.sides.top && boxCoords.sides.left && boxCoords.sides.right && boxCoords.sides.bottom){ 
                    boxCoords.color = this.state.playerMove ? COLORS.boxPlayer1 : COLORS.boxPlayer2
                    !this.state.playerMove ? this.setState({ player2CounterFillBox : this.state.player2CounterFillBox +1}) : this.setState({ player1CounterFillBox : this.state.player1CounterFillBox +1})
                    playerMove = (checkPlayerMove) ? !playerMove : playerMove
                    checkPlayerMove = false

                }
            } else if(el[0] === boxCoords.left && el[1] === boxCoords.top && el[2]  === boxCoords.right && el[3]  === boxCoords.top){
                boxCoords.sides.top = true
                if (boxCoords.sides.top && boxCoords.sides.left && boxCoords.sides.right && boxCoords.sides.bottom){ 
                    boxCoords.color = this.state.playerMove ? COLORS.boxPlayer1 : COLORS.boxPlayer2
                    !this.state.playerMove ? this.setState({ player2CounterFillBox : this.state.player2CounterFillBox +1}) : this.setState({ player1CounterFillBox : this.state.player1CounterFillBox +1})
                    playerMove = (checkPlayerMove) ? !playerMove : playerMove
                    checkPlayerMove = false
                }
            } else if(el[0] === boxCoords.right && el[1] === boxCoords.top && el[2]  === boxCoords.right && el[3]  === boxCoords.bottom ){
                boxCoords.sides.right = true
                if (boxCoords.sides.top && boxCoords.sides.left && boxCoords.sides.right && boxCoords.sides.bottom){ 
                    boxCoords.color = this.state.playerMove ? COLORS.boxPlayer1 : COLORS.boxPlayer2
                    !this.state.playerMove ? this.setState({ player2CounterFillBox : this.state.player2CounterFillBox +1}) : this.setState({ player1CounterFillBox : this.state.player1CounterFillBox +1})
                    playerMove = (checkPlayerMove) ? !playerMove : playerMove
                    checkPlayerMove = false
                }
            } else if(el[0] === boxCoords.left && el[1].toFixed(5)  === boxCoords.bottom.toFixed(5) && el[2]  === boxCoords.right && el[3].toFixed(5) === boxCoords.bottom.toFixed(5) ){
                boxCoords.sides.bottom = true
                if (boxCoords.sides.top && boxCoords.sides.left && boxCoords.sides.right && boxCoords.sides.bottom){ 
                    boxCoords.color = this.state.playerMove ? COLORS.boxPlayer1 : COLORS.boxPlayer2
                    !this.state.playerMove ? this.setState({ player2CounterFillBox : this.state.player2CounterFillBox +1}) : this.setState({ player1CounterFillBox : this.state.player1CounterFillBox +1})
                    playerMove = (checkPlayerMove) ? !playerMove : playerMove
                    checkPlayerMove = false
                }
            } 
        })
        
        return this.setState({coordsBox: coords, playerMove: !playerMove })
    }

    whoIsWinner = () =>{
        if(this.state.player1CounterFillBox + this.state.player2CounterFillBox === this.state.colomn * this.state.row){
            if(this.state.player1CounterFillBox > this.state.player2CounterFillBox){
                return(
                    <Modal open={this.state.showModalWinner} onClose={this.handleCloseModalWinner} center>
                        <h2 className='winner1'> players1 wins game</h2>
                    </Modal>
                )
            }else if (this.state.player1CounterFillBox < this.state.player2CounterFillBox){
                return(
                    <Modal open={this.state.showModalWinner} onClose={this.handleCloseModalWinner} center>
                       <h2 className='winner2'> players2 wins game</h2>
                    </Modal>
                )
            }else{
                return(
                    <Modal open={this.state.showModalWinner} onClose={this.handleCloseModalWinner} center>
                           <h2 className='draw'> draw game</h2>
                    </Modal>
                    
                )
            }
        }
    }

    reset = () =>{
        // const coords = this.boxesCoords()
        this.boxesCoords()
        this.setState({
            playerMove: Math.random() < 0.5, // who should move 
            player1CounterFillBox: 0, 
            player2CounterFillBox: 0,
            reset: true
           
        })
    }

    changeSizeRowAndColomn = () => {

        this.setState({
            colomn: +this.refs.colomn.value,
            row: +this.refs.row.value,
            marginWidth: WIDTH / (+this.refs.colomn.value + 2),
            marginHeight: HEIGHT / (+this.refs.row.value + 2),
            showModalSettings: false
            
        })
        console.log(this.state.colomn)
        console.log(this.state.row)
        // this.boxesCoords()
        
    }

    addOneColomn = () => this.refs.colomn.value = +this.refs.colomn.value + 1

    subOneColomn = () => this.refs.colomn.value = (+this.refs.colomn.value > 1) ? +this.refs.colomn.value - 1 : 1

    addOneRow = () => this.refs.row.value = +this.refs.row.value + 1

    subOneRow = () => this.refs.row.value = (+this.refs.row.value > 1) ? +this.refs.row.value - 1 : 1
    
    render(){   
        const border = 10;
        const shadow = 10;
       
        const circles = this.circleGridCoords().map((el,index)=>{
            return <Circle key={index} x={el.x} y={el.y} radius={10} fill={this.state.colorCircle} />
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
        // console.log(this.state.reset)
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
                                        <input ref='colomn' type="text" value={this.state.colomn} max="20" readOnly  />
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
                           <h2>Tutorial</h2>
                        </Modal>
                    </div>
                </div>

                <div className='gameInfo'>
                    <div className='player1' > 
                        <div style = { this.state.playerMove ? {borderBottom: `2px solid ${COLORS.boxPlayer1}`} : {}} > player 1  </div> 
                        <div className='score'>{this.state.player1CounterFillBox} </div>
                    </div>

                        <div className='player2' >  
                        <div className='score'>{this.state.player2CounterFillBox} </div> 
                        <div style = { this.state.playerMove ? {} : {borderBottom: `2px solid ${COLORS.boxPlayer2}`}}> player 2 </div> 
                    </div>
                </div>
                
                 {winner}
                <div className='canvas'>
                    <Stage  onMouseMove={this.highlightSide} width={WIDTH+border*2} height={HEIGHT+border*2}>
                        <Layer ref= 'layer'> 
                            <Rect
                                x={border}
                                y={border}
                                width={WIDTH-border*2}
                                height={HEIGHT-border*2}
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
