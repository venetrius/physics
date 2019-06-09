const radiusIF = Symbol('radius');
const movableIF = Symbol('movable');

const MIN_SPEED_LIMIT = 0.5;
const SLOWING_RATE = 0.08;// how much speed is lost while a ball moves 1px

const {calcHypotenus, calcLeg} = function() {
  const calcHypotenus = function(a, b){myInterface
    return Math.sqrt(a*a + b*b);

  }
  const calcLeg = function(hypotenus, leg){
    return Math.sqrt(hypotenus * hypotenus - leg * leg);
  }
  return {calcHypotenus, calcLeg};
}();

class Momentum{
  constructor(x, y){
    this.x = x ? x : 0;             // how many pixes moves the ball in 10 ms
    this.y = y ? y : 0;
    this.rateX = x / (Math.abs(x) + Math.abs(y));
    this.rateY = y / (Math.abs(x) + Math.abs(y));
  }

  decaySlowdownDown(time){
    let x = this.x;
    let y = this.y;
    let newX = x > 0 ? x - SLOWING_RATE * this.rateX : x + SLOWING_RATE * this.rateX;
    let newY = y > 0 ? y - SLOWING_RATE * this.rateY : y + SLOWING_RATE * this.rateY;
    this.x = (this.x * newX > 0) ? newX : 0;
    this.y = (this.y * newY > 0) ? newY : 0;
  }
}

class Coordinate{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  copy(){
    return new Coordinate(this.x, this.y);
  }
}

class Circle{
  constructor(coord, radius){
    this.coordinate = coord;
    this.radius = radius;
  }

  static createWORad(coord){
    let newCircle = new Circle(coord);
    delete newCircle.radius;
    return newCircle;
  }
  isCollusion(b){
    if( !  b[movableIF] ){
      throw Error('Illegal argument');
    }
    const {radius : aRad, x : aX, y:  aY} = this[movableIF];
    const {radius : bRad, x : bX, y : bY} = b[movableIF];
    return (aX - bX)**2 + (aY-bY)**2 <= (aRad + bRad)**2
  }
}

class Hole extends Circle {
  constructor(coord, radius){
    super(coord, radius);
  }
}

class Ball extends Circle {
  constructor(coord, radius, speedx, speedy){
    super(coord, radius);
    this.momentum = new Momentum(speedx, speedy);
  }

  static createFromNums(x, y, radius, speedX, speedY){
    let newBall = new Ball(new Coordinate(x,y), radius, speedX, speedY);
    return newBall;
  }
}

Ball.prototype[movableIF] = function() {
  return {
      x : this.coordinate.x,
      y : this.coordinate.y,
      radius : this.radius,
      momentum : this.momentum
  };
}

// represents a box with a rectangle shape

class ContainerP{
  constructor(xMin, xMax, yMin, yMax){
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.balls = [];
    this.holes = [];
  }

  addBall(ball){
    if( ! ( ball[movableIF] ) ){
      throw Error('Illegal argument');
    }
    this.balls.push(ball);
  }

  // param is a ball
  getBounce(a){
    if( ! ( a[movableIF] ) ){
      throw Error('Illegal argument');
    }
    const {radius : aRad, x : aX, y:  aY, momentum : speed} = a[movableIF]();
    if(aX + aRad > this.xMax ){
      speed.x = - speed.x;
      speed.y = + speed.y;
    }else if(aX - aRad < this.xMin){
      speed.x = - speed.x;
      speed.y = + speed.y;
    }else if(aY + aRad > this.yMax){
      speed.x = speed.x;
      speed.y = - speed.y;
    }else if( aY - aRad < this.yMin){
      speed.x = + speed.x;
      speed.y = - speed.y;
    }
    speed.decaySlowdownDown(0);
  }

  isHitByBall(a){
    if( ! ( a[movableIF] ) ){
      throw Error('Illegal argument');
    }
    const {radius : aRad, x : aX, y:  aY} = a[movableIF]();

  //  console.log(this)
   // console.log(a[movableIF]())
    return (aX + aRad > this.xMax || aX - aRad < this.xMin || aY + aRad > this.yMax || aY - aRad < this.yMin);
  }
}

class Moves{
  constructor(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  get [movableIF]() {
    return {
        x : this.x,
        y : this.y,
        radius : this.radius
    };
  }
}


