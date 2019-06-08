const radiusIF = Symbol('radius');
const movableIF = Symbol('movable');

const MIN_SPEED_LIMIT = 0.5;
const SLOWING_RATE = 0.8;// how much speed is lost while a ball moves 1px

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
    this.x = x;             // how many pixes moves the ball in 10 ms
    this.y = y;
    this.rateX = x / (x + y);
    this.rateX = y / (x + y);
  }
  slowDown(time){
    this.rateX
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
class CircleP{
  static isCollusion(a, b){
    if( ! ( a[movableIF] && b[movableIF] ) ){
      throw Error('Illegal argument');
    }
    const {radius : aRad, x : aX, y:  aY} = a[movableIF];
    const {radius : bRad, x : bX, y : bY} = b[movableIF];
    return (aX - bX)**2 + (aY-bY)**2 <= (aRad + bRad)**2
  }
}

class ContainerP{
  constructor(xMin, xMax, yMin, yMax){
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
  }

  static isHitByCircle(a){
    if( ! ( a[movableIF] ) ){
      throw Error('Illegal argument');
    }
    const {radius : aRad, x : aX, y:  aY} = a[movableIF];
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

const m1 = new Moves(1, 2, 1);
const m2 = new Moves(0, 0, 0);
const m3 = new Moves(1, 3, 3);

console.log(CircleP.isCollusion( m1, m2));
console.log(CircleP.isCollusion(m1,m3));
