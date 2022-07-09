import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/bootstrap/dist/css/bootstrap.css', '../assets/styles/buttons.css']
})
export class AppComponent {
  
  game = null;
  players: string[] = ['', '', '']

  playersCountString = "";
  playersCount = 3;
  

  playersCountConvertError = false;
  gameCreated = false;
  gameStarted = false;
  buttonClicked = false;

  constWords = ['First', 'Second', 'Third', 'Fouth', 'Fifth'];

  backToStart() {
    this.playersCount = 3;
    this.gameCreated = false;
    this.players = ['', '', ''];
    this.playersCountString = "3";
    this.gameStarted = false;
    this.game = null;
  }

  trackByFn(index: any, item: any) {
    return index;
  }
  trackByFn2(index: any, item: any) {
    return index;
  }
  createGame()
  {
    this.playersCount = Number(this.playersCountString);
    if (this.playersCount == 3 || this.playersCount == 4 || this.playersCount == 5)
    {
      if (this.playersCount == 4){
        this.players.push('');
      }
      if (this.playersCount == 5){
        this.players.push('');
        this.players.push('');
      }
      this.gameCreated = true;
    }
    else {
      this.playersCountConvertError = true;
      alert("Input number 3, 4 or 5!");
      setTimeout( () => { this.playersCountConvertError = false}, 2000);
      this.playersCount = 3;
    }
  }

  startGame() {
    if (this.playersCount == 3) {
      this.gameStarted = true;
      this.game = new Game_3([new Player(this.players[0]), new Player(this.players[1]), new Player(this.players[2])]);
    }
  }

  deleteRound() {

    this.buttonClicked = true;
    setTimeout(()=>{this.buttonClicked = false;}, 1000);

    if (this.game.round > 0) {
      if (this.game.players.length == 3) {
        for (let i = 0; i < 3; i++) {
          this.game.players[i].brokeOff.pop();
          this.game.players[i].grows.pop();
          this.game.players[i].points.pop();
          this.game.players[i].order = null;
          this.game.players[i].capture = null;
        }
        this.game.round--;
      }
    }
  }

  calculateRound() {

    this.buttonClicked = true;
    setTimeout(()=>{this.buttonClicked = false;}, 1000);

    if (this.game.players.length == 3) {
       for (let i = 0; i < 3; i++) {
        let points = this.game.addPoint(this.game.rounds[this.game.round], this.game.players[i].order, this.game.players[i].capture);

        if (points > 59) {
          this.game.players[i].brokeOff.push(true);
        }
        else {
          this.game.players[i].brokeOff.push(false);
        }

        if (points > 0) {
          this.game.players[i].grows.push(true);
        }
        else {
          this.game.players[i].grows.push(false);
        }
        this.game.players[i].order = null;
        this.game.players[i].capture = null;
        this.game.players[i].points.push(points + this.game.players[i].points[this.game.round]);
       }
       this.game.round++;
       console.log(this.game);
    }
  }
  finishGame() { 
    this.calculateRound();
  }
}


class Player { 
  name = "";
  points: number[] = [0,];
  grows: boolean[] = [];
  brokeOff: boolean[] = [];
  order: number = null;
  capture: number = null;

  constructor(name: string){
    this.name = name;
  }
}

class Game_3 { 
  players: Player[] = [];
  round = 0;
  rounds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10', '10', '9', '8','7', '6', '5', '4', '3', '2', '1', 'T', 'T', 'T', 'M', 'M', 'M', 'B', 'B', 'B', 'Z', 'Z', 'Z', 'L', 'L', 'L'];
  

  constructor(players: Player[]) {
    players.forEach(player => {
      this.players.push(player);
    });
  }
  addPoint(round: string, order: number, capture: number) {
    let points: number = null;
    order = Number(order);
    capture = Number(capture);
    console.log(order, capture);
    if (round == 'M') {
      if (capture == 0) { 
        points = 5;
      }
      else {
        points = capture * (-10)
      }
    }
    else if (round == 'L') {
      if ((order == 1) && (capture == 1)) {
        points = 100;
      }
      else if ((order == 1) && (capture == 0)) {
        points = -100
      }
      else if ((order == 0) && (capture == 0)) {
        points = 50;
      }
      else if ((order == 0) && (capture == 1)) {
        points = 10;
      }
      else {
        points = 1;
      }
    }
    else {
      if ((order == capture) && (capture == 0)) {
        points = 5;
      }
      else if (order == capture) {
        points = capture * 10;
      }
      else if (order < capture) {
        points = capture;
      }
      else {
        points = (order - capture) * (-10);
      }
      if (round == 'Z') { 
        points *= 2;
      }
    }
    return points;
  }
}


