import Phaser from "phaser";
import dudeImage from './assets/dude.png';
import errorMsgImage from './assets/error_msg.jpeg';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 700,
  backgroundColor: '#efefef',
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

let dude = null;
let ticketText = null;
let ticketsPerSecondText = null;

let ticketCount = 0;
let ticketsPerSecond = 0;
var clock;

let game = new Phaser.Game(config);

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function preload ()
{
  this.load.image('dude', dudeImage);
}

function create ()
{

  clock = game.getTime();

  // The player and its settings
  dude = this.add.sprite(400, 400, 'dude').setInteractive({pixelPerfect: true});

  //  The score
  ticketText = this.add.text(
    60, 20, 'Tickets: ' + numberWithCommas(ticketCount), 
    { fontSize: '16px', fill: '#000' }
    );

  ticketsPerSecondText = this.add.text(
    60, 40, 'Tickets Per Second: ' + numberWithCommas(ticketsPerSecond), 
    {fontSize: '14px', fill: '#000' }
    );
  
  dude.on('pointerdown', clicked);
}

function update ()
{
  let now = game.getTime();
  let dt = (now - clock) / 1000;
  ticketCount += dt * ticketsPerSecond;
  ticketText.setText('Tickets: ' + numberWithCommas(Math.round(ticketCount)));
  clock = now;
}

function clicked (amount = 1)  {
  ticketCount += 1;
}