/*
- Calculate average time daily exercise hours
- Compares daily hours to target ammount daily hours
- Return an object includes 
    - number of days
    - number of training days
    - original target value
    - calculated average time
    - boolean value describing target reached
    - rating 1-3 how well hours are met (flexible)
    - text value explaning rating 
*/

interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDes: string;
  target: number;
  average: number;
};

const exerciseCalculator = (trainedDays: Array<number>, target: number): result => {
  const periodLength: number = trainedDays.length
  const trainingDays: number = trainedDays.map(day => day > 0).length
  const success: boolean = trainedDays.reduce((a, b) => a + b, 0) >= target * trainedDays.length

  let rating: number = 3
  trainedDays.forEach(day => day < target ? rating -= 1: null)

  let ratingDes: string
  if (rating === 3) {
    ratingDes = 'Brilliant, you have met your target'
  } else if (rating === 2) {
    ratingDes = 'You did ok this time'
  } else {
    ratingDes = 'You have not met your target'
  }

  const average: number = trainedDays.reduce((a, b) => a + b, 0) / trainedDays.length
  
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDes,
    average,
    target
  }
};

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))