// add the player class to the imports
import { Player } from "../player/player.class";
// import { Controls } from "./keyboard.model";

export class KeyBoardControl {
  public gameControls;

  constructor(private gameInstance: any, private playerInstance: Player) {

    this.gameControls = {
      cursors: this.gameInstance.input.keyboard.createCursorKeys(),
      fireWeapon: this.gameInstance.input.on('pointerdown')
    };
  }


  public update(): void {
    if(this.gameControls.cursors.left.isDown){
      console.log('lewko')
    }
  }
}
