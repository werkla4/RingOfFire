import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  gameId: string = "";

  constructor(public dialog: MatDialog,
    private firestore: AngularFirestore,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // init game structure
    this.newGame();
    // get unique path
    this.route.params.subscribe((params)=>{
      this.gameId = params.id;
      // on change event:
      this.firestore.collection('games').doc(this.gameId).valueChanges().subscribe((game: any)=>{
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;   
      this.game.currentPlayer++;
      this.game.currentPlayer %= this.game.players.length;
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.trim() != "") {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame(){
    this.firestore.collection('games').doc(this.gameId).update(this.game.toJSON());
  }
}
