function randomNumber(min:number = 100000, max:number = 999999) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

export default randomNumber;
