let logoutFunction = null;

export function setLogout(fn){
  logoutFunction = fn;
};

export function getLogout(){
  return logoutFunction;
}