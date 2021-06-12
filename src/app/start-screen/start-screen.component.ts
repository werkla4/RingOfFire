import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  game!: Game;

  constructor(
    private router: Router,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  newGame(){
    // start game
    this.game = new Game();
    this.firestore.collection('games').add(this.game.toJSON()).then((gameInfo)=>{
      console.log(gameInfo.id);
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
    
  }

}
