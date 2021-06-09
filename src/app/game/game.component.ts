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
  game!: Game
  pickCardAnimation = false;
  public currentCard: string = '';

  constructor(public dialog: MatDialog,
    private firestore: AngularFirestore,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.newGame();

    this.route.params.subscribe((params)=>{
      console.log(params);
      console.log(params.id);

      this.firestore.collection('games').doc(params.id).valueChanges().subscribe((game: any)=>{
        console.log('current game: ', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
      });
    });
  }

  newGame() {
    this.game = new Game();
    // this.firestore.collection('games').add(this.game.toJSON());
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer %= this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.trim() != "") {
        this.game.players.push(name);
      }
    });
  }
}
