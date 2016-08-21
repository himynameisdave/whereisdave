/**
 *   Module responsible for returning the city I am currently in
 *   FYI:  this isn't a GPS thing, it's based on where I'm supposed to be on certain days
 */
"use strict";
const moment = require("moment");
const city = {
  YYZ: "Toronto",
  NYC: "New York"
};
const atHome = { isFlying: false, city: city.YYZ };
const inNYC = { isFlying: false, city: city.NYC };

const getCurrentCity = () => {
  const d = {
    year: moment().utc().year(),
    month: moment().utc().month()
  };
  //  If it's not 2016 or August, return not flying/in TO
  if (d.year !== 2016 || d.month !== 7) return atHome;
  //  Set day and hour if no early return
  d.day = moment().utc().dayOfYear();
  d.hour = moment().utc().hour();
  //  check for if it's a day between our days gone
  if (d.day >= 234 && d.day <= 240) {
    //  If it's the day we fly out
    if (d.day === 234) {
      if (d.hour < 11) return atHome;
      if (d.hour >= 11 && d.hour <= 13) {
        return { isFlying: true, city: city.NYC };
      }
      return inNYC;
    }
    if (d.day === 240 || d.day === 241) {
      if (d.day === 240) {
        if (d.hour >= 22) {
          return { isFlying: true, city: city.YYZ };
        } else {
          return inNYC;
        }
      }
      if (d.day === 241 && d.hour <= 0) {
        return { isFlying: true, city: city.YYZ };
      }
      return atHome;
    }
    return inNYC;
  } else {
    return atHome;
  }
};
module.exports = getCurrentCity;
