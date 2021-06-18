import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customize-player',
  templateUrl: './customize-player.component.html',
  styleUrls: ['./customize-player.component.scss']
})
export class CustomizePlayerComponent implements OnInit {
  picPaths: string[] = [  "profile-boy.png", "profile-girl.png", "baby-girl.png", "laughing-line.png", "jump.png", "family-parents.png",
                          "freedom.png", "durable.png", "businessman.png", "witch.png",  "like-button-line.png",  "criminal-custody.png",
                          "angry.png", "surprised.png", "bright.png", "emoji-tongue.png"];
  picId: number = -1;

  constructor(
    public dialogRef: MatDialogRef<CustomizePlayerComponent>
    ) { }

  ngOnInit(): void {
  }

  setPicId(id: number){
    this.picId = id;
  }
}
