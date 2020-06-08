import { Player } from '../player/player.class';

export class GameScene extends Phaser.Scene {
  public actors = [];
  public actor: any;
  public game: Phaser.Game;
  public shotAction;
  public trapAction;
  public pointer;

  public rotationSpeed = 1 * Math.PI;
  public rotationDegrees = Phaser.Math.RadToDeg(this.rotationSpeed);
  public rotationTolerance = 0.02 * this.rotationSpeed;
  public velocityFromRotation = Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation;

  protected manageAssets(): void {}

  public preload() {
    console.log('preload');
    this.load.image('ground', '../public/assets/map/ground.png');
    this.load.spritesheet('idle', '../public/assets/sprites/idle.png', {
      frameWidth: 597,
      frameHeight: 363,
    });
    this.load.spritesheet('walk', '../public/assets/sprites/walk.png', {
      frameWidth: 586,
      frameHeight: 354,
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
    this.pointer = this.input.activePointer;
    this.shotAction = this.input.keyboard.addKey('Space');
    this.trapAction = this.input.keyboard.addKey('Shift');
  }

  public update() {
    this.pointerMove();
    this.pointer.isDown
      ? this.physics.moveTo(this.actor.player, this.pointer.worldX, this.pointer.worldY, 100)
      : this.physics.moveTo(this.actor.player, this.pointer.worldX, this.pointer.worldY, 0);
    this.shotAction.isDown ? console.log('shot') : null;
    this.trapAction.isDown ? console.log('trap') : null;
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

  protected pointerMove() {
    let angleToPointer = Phaser.Math.Angle.Between(
      this.actor.player.x,
      this.actor.player.y,
      this.pointer.worldX,
      this.pointer.worldY
    );
    let angleDelta = Phaser.Math.Angle.Wrap(angleToPointer - this.actor.player.rotation);

    if (Phaser.Math.Within(angleDelta, 0, this.rotationTolerance)) {
      this.actor.player.rotation = angleToPointer;
      this.actor.player.setAngularVelocity(0);
    } else {
      this.actor.player.setAngularVelocity(Math.sign(angleDelta) * this.rotationDegrees);
    }
  }
}
