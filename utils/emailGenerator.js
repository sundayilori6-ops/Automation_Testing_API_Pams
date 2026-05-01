function generateRandomEmail() {
  const randomInt = Math.floor(Math.random() * 1000000);
  return `pams${randomInt}@gmail.com`;
}

export { generateRandomEmail };