export class Player {
  public player: Phaser.GameObjects.Sprite & { id: string };
  public playerState: Map<string, boolean | number>;
  public velocity: number = 300;
  public ammo: number = 3;
  public traps: number = 1;

  constructor(private gameInstance: any, public playerInstance?: any) {
    this.createPlayer(this.gameInstance);
    this.playerState = new Map();
  }

  public createPlayer(gameInstance): void {
    this.player = gameInstance.physics.add
      .sprite(100, 100, 'idle')
      .setScale(0.2)
      .setCollideWorldBounds(true)
      .setOrigin(0.5)
      .play('idle');
    this.player.id = '1';
    this.player.name = 'Red';
  }
}
