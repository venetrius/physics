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

  decaySlowdownDown(time){
    this.rateX -= SLOWING_RATE * this.x;
    this.rateX -= SLOWING_RATE * this.y;
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

class ContainerP{
  constructor(xMin, xMax, yMin, yMax){
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
  }

  getBounce(a, speed){
    if( ! ( a[movableIF] ) ){
      throw Error('Illegal argument');
    }
    const {radius : aRad, x : aX, y:  aY} = a[movableIF]();
    if(aX + aRad > this.xMax ){
      return {x : - speed.x, y : speed.y};
    }
    if(aX - aRad < this.xMin){
      return {x : - speed.x, y : speed.y};
    }
    if(aY + aRad > this.yMax){
      return {x : + speed.x, y : - speed.y};
    }
    if( aY - aRad < this.yMin){
      return {x : + speed.x, y : - speed.y};
    }
    return speed;
  }

  isHitByCircle(a){
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


