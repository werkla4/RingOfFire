import { Component, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { CustomizePlayerComponent } from '../customize-player/customize-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  gameId: string = "";
  gameOver = false;

  constructor(public dialog: MatDialog,
    private firestore: AngularFirestore,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // init game structure
    this.newGame();
    // get unique path
    this.route.params.subscribe((params) => {
      this.gameId = params.id;
      // on change event:
      this.firestore.collection('games').doc(this.gameId).valueChanges().subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.player_images = game.player_images;
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
    if (this.gameOver) { return }
    // no players = no action
    if (this.game.players.length < 1) { return }
    // pic next card
    if (!this.game.pickCardAnimation) {
      // card stack empty? -> game over
      if (this.game.stack.length == 0) {
        console.log("game over");
        this.gameOver = true;
        return;
      }
      // take next card
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer %= this.game.players.length;
      this.saveGame();
      // add to played cards
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  addPlayerDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.trim() != "") {
        this.game.players.push(name);
        this.game.player_images.push("profile-boy.png");
        this.saveGame();
      }
    });
  }

  saveGame() {
    this.firestore.collection('games').doc(this.gameId).update(this.game.toJSON());
  }

  customizePlayerDialog(id: number): void {
    const dialogRef = this.dialog.open(CustomizePlayerComponent);

    dialogRef.afterClosed().subscribe((picPath: string) => {
      if (picPath) {
        if (picPath == "deletePlayer") {
          this.game.players.splice(id, 1);
          this.game.player_images.splice(id, 1);
        }
        else {
          this.game.player_images[id] = picPath;
        }
        this.saveGame();
      }
    });
  }
}
