import { Player } from '../player/player.class';

export class GameScene extends Phaser.Scene {
  public actors = [];
  public actor: any;
  public game: Phaser.Game;
  public cursors;
  protected manageAssets(): void {}
  protected gameUpdate(): void {
    if (this.actor && this.actor.controls) {
      this.actor.view();
    }
  }

  public preload() {
    console.log('preload');
    this.load.image('ground', '../public/assets/map/ground.png');
    this.load.spritesheet('idle', '../public/assets/sprites/idle.png', {
      frameWidth: 363,
      frameHeight: 597,
    });
    this.load.spritesheet('walk', '../public/assets/sprites/walk.png', {
      frameWidth: 354,
      frameHeight: 586,
    });
  }

  public create() {
    console.log('create');
    this.physics.world.setBounds(0, 0, 800, 600);
    this.add.image(400, 300, 'ground');

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('idle', {
        start: 0,
        end: 7,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('walk', {
        start: 0,
        end: 5,
      }),
      frameRate: 7,
      repeat: -1,
    });

    this.actor = new Player(this);
    this.actors.push[this.actor];
    this.cameras.main.fadeIn(4000, 247, 208, 36);
    this.cameras.main.startFollow(this.actor.player);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  public update() {
    if (this.cursors.down.isDown) {
      this.actor.player.setVelocityY(100);
    } else if (this.cursors.up.isDown) {
      this.actor.player.setVelocityY(-100);
    } else if (this.cursors.left.isDown) {
      this.actor.player.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
      this.actor.player.setVelocityX(100);
    } else {
      this.actor.player.setVelocity(0);
    }

  }

  protected properties(): void {
    this.game.events.on(
      'hidden',
      function () {
        console.log('hidden');
      },
      this
    );

    this.game.events.on(
      'visible',
      function () {
        console.log('visible');
      },
      this
    );
  }
}
