import React, { Component } from 'react';
import {WIDTH, HEIGHT} from './constants'
import { Stage, Layer, Rect, Circle } from 'react-konva';
import SideLine from './SideLine'
import Box from './Box'
import './BodyCanvas.css'


export default class BoxCanvas extends Component{
    
    state = {
        colorBody: '#e6f5ff',
        colorLine: '#fffff6',
        colorBoxes: '#e6f5ff',
        colorCircle: '#0099ff',
        row: 5,
        colomn: 6,
        marginWidth: 0,
        marginHeight: 0,
        coordsBoxes: [], // 
        playerMove: '', // who should move 
        player1CounterFillBox: 0, 
        player2CounterFillBox: 0,
        reset : false
    };

    componentWillMount(){ 
        this.setState({
            marginWidth: WIDTH / (this.state.colomn + 2),
            marginHeight: HEIGHT / (this.state.row + 2),
            playerMove:  Math.random() < 0.5
        })
        
    } 

    componentDidMount(){
        this.boxesCoords()
        
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.reset !== this.state.reset){
            this.setState({
                reset: false
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

    lineVerticalCoords = () => {
        var verticalLineCoords = [];
        for (let i = 0; i < this.state.row + 1; i++){
            for (let j = 0; j < this.state.colomn; j++){
                verticalLineCoords.push({
                    x0: this.gridX(j), 
                    y0: this.gridY(i), 
                    x1: this.gridX(j) + this.state.marginWidth, 
                    y1: this.gridY(i)}
                );       
            }
        }
        return verticalLineCoords
    }

    lineHorizontalCoords = () => {
        var horizontalLineCoords = [];
        for (let i = 0; i < this.state.row ; i++){
            for (let j = 0; j < this.state.colomn +1; j++){
                horizontalLineCoords.push({
                    x0: this.gridX(j), 
                    y0: this.gridY(i), 
                    x1: this.gridX(j), 
                    y1: this.gridY(i) + this.state.marginHeight,
                    }
                );       
            }
        }
        return horizontalLineCoords
    }

    
    boxesCoords = () => {
        var coordsBoxes = []
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
                    boxCoords.color = this.state.playerMove ? '#33ff33' : '#ff33ff'
                    !this.state.playerMove ? this.setState({ player2CounterFillBox : this.state.player2CounterFillBox +1}) : this.setState({ player1CounterFillBox : this.state.player1CounterFillBox +1})
                    playerMove = (checkPlayerMove) ? !playerMove : playerMove
                    checkPlayerMove = false

                }
            } else if(el[0] === boxCoords.left && el[1] === boxCoords.top && el[2]  === boxCoords.right && el[3]  === boxCoords.top){
                boxCoords.sides.top = true
                if (boxCoords.sides.top && boxCoords.sides.left && boxCoords.sides.right && boxCoords.sides.bottom){ 
                    boxCoords.color = this.state.playerMove ? '#33ff33' : '#ff33ff'
                    !this.state.playerMove ? this.setState({ player2CounterFillBox : this.state.player2CounterFillBox +1}) : this.setState({ player1CounterFillBox : this.state.player1CounterFillBox +1})
                    playerMove = (checkPlayerMove) ? !playerMove : playerMove
                    checkPlayerMove = false
                }
            } else if(el[0] === boxCoords.right && el[1] === boxCoords.top && el[2]  === boxCoords.right && el[3]  === boxCoords.bottom ){
                boxCoords.sides.right = true
                if (boxCoords.sides.top && boxCoords.sides.left && boxCoords.sides.right && boxCoords.sides.bottom){ 
                    boxCoords.color = this.state.playerMove ? '#33ff33' : '#ff33ff'
                    !this.state.playerMove ? this.setState({ player2CounterFillBox : this.state.player2CounterFillBox +1}) : this.setState({ player1CounterFillBox : this.state.player1CounterFillBox +1})
                    playerMove = (checkPlayerMove) ? !playerMove : playerMove
                    checkPlayerMove = false
                }
            } else if(el[0] === boxCoords.left && el[1].toFixed(5)  === boxCoords.bottom.toFixed(5) && el[2]  === boxCoords.right && el[3].toFixed(5) === boxCoords.bottom.toFixed(5) ){
                boxCoords.sides.bottom = true
                if (boxCoords.sides.top && boxCoords.sides.left && boxCoords.sides.right && boxCoords.sides.bottom){ 
                    boxCoords.color = this.state.playerMove ? '#33ff33' : '#ff33ff'
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
                    <div className='winner1'> playes1 wins game</div>
                )
            }else if (this.state.player1CounterFillBox < this.state.player2CounterFillBox){
                return(
                    <div className='winner2'> playes2 wins game</div>
                )
            }else{
                return(
                    <div className='draw'> draw game</div>
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

    // resetColor = () => {
    //     this.state.color = '#0099ff'
    // }
    
    render(){   
        const border = 10;
        const shadow = 10;
       
        const circles = this.circleGridCoords().map((el,index)=>{
            return <Circle key={index} x={el.x} y={el.y} radius={10} fill={this.state.colorCircle} />
        })
       
        const linesVertical = this.lineVerticalCoords().map((el,index)=>{
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

        const linesHorizontal = this.lineHorizontalCoords().map((el,index)=>{
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
        // console.log(this.state.coordsBoxes)
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
                 <div className='gameInfo'>
                    <div className='player1' > 
                        <div style = { this.state.playerMove ? {borderBottom: '2px solid #33ff33'} : {}} > player 1  </div> 
                        <div className='score'>{this.state.player1CounterFillBox} </div>
                    </div>

                     <div>
                         <button onClick = {this.reset } className='reset'>reset</button>
                     </div>

                     <div className='player2' >  
                        <div className='score'>{this.state.player2CounterFillBox} </div> 
                        <div style = { this.state.playerMove ? {} : {borderBottom: '2px solid #ff33ff'}}> player 2 </div> 
                    </div>
                 </div>
                 {winner}
                <div className='canvas'>
                    <Stage  onMouseMove={this.highlightSide} width={WIDTH+border*2+shadow} height={HEIGHT+border*2+shadow}>
                        <Layer ref= 'layer'> 
                            <Rect
                                x={border}
                                y={border}
                                width={WIDTH+border}
                                height={HEIGHT+border}
                                fill={this.state.colorBody}
                                shadowBlur={shadow}
                                stroke={'#0099ff'} 
                                strokeWidth={border} 
                            />  
                            {boxes}
                            {linesVertical}
                            {linesHorizontal}
                            {circles}
    
                        </Layer>
                    </Stage> 
                </div>
            </div>
        )
    }
}
