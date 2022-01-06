const calculateBmi = (height: number, weight: number) => {
  const heightInMeter: number = height / 100
  const bmi: number = weight / (heightInMeter * heightInMeter)

  if (bmi <= 18.5) {
    return 'Under weight'
  } else if (bmi >= 18.5 && bmi <= 25) {
    return 'Normal weight'
  } else if (bmi >= 25) {
    return 'Over weight'
  }
}

console.log(calculateBmi(182, 82))