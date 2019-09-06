import React from 'react'

export function formatDate(dateString) {
    const date = new Date(dateString);

    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return monthNames[monthIndex] + ' ' + year;
}
  
export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug", 
    "Sep", "Oct", "Nov", "Dec"
  ];

  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return date.getDate() + ' ' + monthNames[monthIndex] + ' ' + year + ' - ' + date.getHours() + ':' + date.getMinutes();
}  

// teams {
//   name,
//   id,
//   members [{
//     usename,
//     percent,
//     role // leader|member
//   }]
// }
export function getMatchTeamIDOfUser(teams, username) {
  var ret;

  // If found any Leader role, return Most Percent
  // Other wise, return team which is Member with Most Percent
  if (teams && username) {
      let curPercent = 0;
      teams.forEach(element => {
          if (element.members) {
              element.members.forEach(mem => {
                  if (mem.username == username) {
                      if (mem.role == "leader") {
                          // Return if is Leader
                          if (mem.percent + 1000 > curPercent) {
                              curPercent = mem.percent + 1000;
                              ret = element.id;
                          }
                      }
                      if (mem.percent > curPercent) {
                          curPercent = mem.percent;
                          ret = element.id;
                      }
                  }
              })
          }
      })
  }

  return ret;
}

// teams {
//   name,
//   id,
//   members [{
//     usename,
//     percent,
//     role // leader|member
//   }]
// }
export function getMatchLeaderOfUser(teams, username) {
    var ret;
    let userIsLeader = false;
    // If found any Leader role, return Most Percent
    // Other wise, return team which is Member with Most Percent
    var tempTeamAndLeader = {}; // {"natv": "hungdv"}
    if (teams && username) {
        let curPercent = 0;
        teams.forEach(element => {
            if (element.members) {
                element.members.forEach(mem => {
                    if (mem.role == "leader") {
                        tempTeamAndLeader[element.id] = mem.username;
                    }
                    if (mem.username == username) {
                        if (mem.role == "leader") {
                            // If ROle of requester is Leader, Assigned is GL
                            ret = "sontm";
                            userIsLeader = true;
                        } else 
                        if (mem.percent > curPercent) {
                            curPercent = mem.percent;
                            ret = element.id;
                        }
                    }
                })
            }
        })
    }

    if (userIsLeader) {
        // TODO, return Group Leader Here
        return "admin";
    } else {
        // If is member, the Max Percent is the Assigned Leader
        return tempTeamAndLeader[""+ret];
    }
  }

// {id: 1, name: "Bánh Keo", desc: null, active: true, order: null, parentCategoryId:null}
// {id: 4, name: "Bánh", desc: null, active: true, order: null, parentCategoryId:1}
// Output:
// const menuData = {
//     "BanhKeo":{
//       "id": 1,
//       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
//     },
export function levelingCategory(cateList) {
    let result = {};
    // Get Level 1
    if (cateList && cateList.length > 0) {
        cateList.forEach((element, idx) => {
            if (!element.parentCategoryId) {
                // First Level Category
                result[""+element.name] = {id:element.id}
            }
        });
    }
    // Get Level 2
    for (var prop in result) {
        if (Object.prototype.hasOwnProperty.call(result, prop)) {
            let curCate = result[prop]
            // Find Level 2 Category which parent ID is equal
            if (cateList && cateList.length > 0) {
                cateList.forEach((element, idx) => {
                    if (element.parentCategoryId == curCate.id) {
                        // First Level Category
                        curCate[""+element.name] = {id:element.id, subs:[]}
                    }
                });
            }
        }
    }
    // Get Level 3
    for (var prop in result) {
        if (Object.prototype.hasOwnProperty.call(result, prop)) {
            let curCate = result[prop]
            // Loop level 2 except id
            for (var propSub in curCate) {
                if (Object.prototype.hasOwnProperty.call(curCate, propSub)) {
                    if (propSub != "id") {
                        let curSubCate = curCate[propSub]
                        if (cateList && cateList.length > 0) {
                            cateList.forEach((element, idx) => {
                                // Find Level 3 Category which parent ID is equal
                                if (element.parentCategoryId == curSubCate.id) {
                                    // First Level Category
                                    curSubCate["subs"].push({id: element.id, name:element.name})
                                }
                            });
                        }
                    }
                }
            }
            
        }
    }
    return result;
}

// If intoList is true, will break into List
export function breakLineCRLF(text, intoList) {
    if (intoList) {
        let lis = text.split('<CRLF>').map((item, i) => {
            return <li key={i}>{item}</li>;
        });
        let result = (
            <ul>
                {lis}
            </ul>
        )
        return result;
    } else {
        let result = text.split('<CRLF>').map((item, i) => {
            return <p key={i}>{item}</p>;
        });
        return result;
    }
}

class Helpers {
    constructor() {
    }

    // Get the Not Duplicate DBBrand from List Products: [{xxx, DBBrand:{id, name, countryId}}]
    // Result: {id1: {count:10, value:DBBrand}, id2:{}}
    getBrandsQuery(products) {
        let result = {};
        if (products && products.length > 0) {
            products.forEach((item, idx) => {
                if (item.DBBrand) {
                    if (result[""+item.DBBrand.id]) {
                        // Existed, increase count
                        result[""+item.DBBrand.id].count++;
                    } else {
                        result[""+item.DBBrand.id] = {count: 1, value: item.DBBrand}
                    }
                }
            })
        }
        return result;
    }

    // DBBrand: {id, name, DBCountry:{id, name, code}}
    // Input: {id1: {count:10, value:DBBrand}, id2:{}}
    // Result: {id1: {count:10, value:DBCountry}, id2:{}}
    getBrandCountriesQuery(brandQuery) {
        let result = {};
        if (brandQuery ) {
            for (var prop in brandQuery) {
                if (Object.prototype.hasOwnProperty.call(brandQuery, prop)) {
                    let curBrand = brandQuery[""+prop].value;
                    if (result[""+curBrand.DBCountry.id]) {
                        // Existed, increase count
                        result[""+curBrand.DBCountry.id].count += brandQuery[""+prop].count;
                    } else {
                        result[""+curBrand.DBCountry.id] = 
                            {count: brandQuery[""+prop].count,
                            value: curBrand.DBCountry}
                    }
                }
            }
            
        }
        return result;
    }
}
const helpers = new Helpers();
export default helpers;