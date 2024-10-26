let mic, fft;
let chicken, obstacles = [];
let score = 0;
let difficulty = 1;
let jumpStrength = 1;
let yVelocity = 1;
let gravity = 0.8;
let gameSpeed = 2;

// Images for background, chicken, and obstacle
let bgImage, chickenImage, obstacleImage;

function preload() {
  // Load images
  bgImage = loadImage('background.jpg'); // Update with your background image path
  chickenImage = loadImage('chick.png'); // Update with your chicken image path
  obstacleImage = loadImage('rock.png'); // Update with your obstacle image path
}

function setup() {
  createCanvas(800, 400);
  
  // Initialize microphone input and FFT for voice analysis
  mic = new p5.AudioIn();
  mic.start();
  
  fft = new p5.FFT(0.8, 64);
  fft.setInput(mic);
  
  // Chicken character setup
  chicken = { x: 100, y: height - 50, size: 40, onGround: true };
}

function draw() {
  // Display background
  image(bgImage, 0, 0, width, height);
  
  // Display score
  fill(0);
  textSize(20);
  text(`Score: ${score}`, 10, 20);
  
  // Voice control
  let voiceLevel = mic.getLevel();
  jumpStrength = map(voiceLevel, 0, 1, 0, 20 * difficulty);
  
  // Handle jumping and movement
  if (chicken.onGround && voiceLevel > 0.05) {
    yVelocity = -jumpStrength;
    chicken.onGround = false;
  }
  
  yVelocity += gravity;
  chicken.y += yVelocity;
  
  if (chicken.y >= height - chicken.size) {
    chicken.y = height - chicken.size;
    chicken.onGround = true;
    yVelocity = 0;
  }
  
  // Draw chicken
  image(chickenImage, chicken.x, chicken.y, chicken.size, chicken.size);
  
  // Generate obstacles
  if (frameCount % (60 - difficulty * 5) === 0) {
    obstacles.push({ x: width, y: height - 30, size: 30 });
  }
  
  // Move and draw obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].x -= gameSpeed * difficulty;
    
    // Draw obstacle
    image(obstacleImage, obstacles[i].x, obstacles[i].y, obstacles[i].size, obstacles[i].size);
    
    if (dist(chicken.x, chicken.y, obstacles[i].x + obstacles[i].size / 2, obstacles[i].y + obstacles[i].size / 2) < chicken.size / 2 + obstacles[i].size / 2) {
      textSize(32);
      fill(255, 0, 0);
      text("Game Over!", width / 2 - 70, height / 2);
      noLoop();
    }
    
    if (obstacles[i].x < -obstacles[i].size) {
      obstacles.splice(i, 1);
      score++;
      if (score % 5 === 0) {
        difficulty++;
      }
    }
  }
}
