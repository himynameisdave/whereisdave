/**
 *   Module responsible for returning the city I am currently in
 *   FYI:  this isn't a GPS thing, it's based on where I'm supposed to be on certain days
 */
"use strict";
const moment = require("moment");
const city = {
  YYZ: "Toronto",
  SFO: "San Francisco",
  LAX: "Los Angeles"
};
const getCurrentCity = () => {
  let year = moment().utc().year(),
      month = moment().utc().month();
  //  early return "Toronto" if it's not December of 2015
  if( year !== 2015 || month !== 11 ){
    return { isFlying: false, city: city.YYZ };
  }
  let d = moment().utc().dayOfYear(),
      h = moment().utc().hour();

  // it's not between the dates I'm gone, return "Toronto";
  if( d < 338 || d > 347 ) {
    return { isFlying: false, city: city.YYZ };
  }
  //  if its Friday Dec 4th, 2015
  if( d === 338 ){
    if( h < 11 ){
      return { isFlying: false, city: city.YYZ };// return YYZ if before 11am UTC/6am EST
    }
    if( h > 19 ){
      return { isFlying: false, city: city.SFO };
    }
    return { isFlying: true, city: city.SFO };
  }
  //  the whole time I'm in San Francisco
  if( d > 338 && d <= 342 ){
    return { isFlying: false, city: city.SFO };
  }
  //  if its Tuesday Dec 8th, 2015 (Actually Wednesday Dec 9th UTC)
  if( d === 343 ){
    if( h < 1 ){
      return { isFlying: false, city: city.SFO };
    }
    if( h > 3 ){
      return { isFlying: false, city: city.LAX };
    }
    return { isFlying: true, city: city.LAX };
  }
  //  the whole time I'm in Los Angeles
  if( d > 343 && d <= 347 ){
    return { isFlying: false, city: city.LAX };
  }
  //  if its Saturday Dec 12th, 2015 (Actually Sunday Dec 13th UTC)
  if( d === 347 ){
    if( h < 6 ){
      return { isFlying: false, city: city.LAX };
    }
    if( h > 11 ){
      return { isFlying: false, city: city.YYZ };
    }
    return { isFlying: true, city: city.YYZ };
  }
  //  and then on the off chance nothing was returned...
  return { isFlying: false, city: city.YYZ };
};

module.exports = getCurrentCity;
