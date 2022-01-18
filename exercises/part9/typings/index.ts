import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();

// express.json() required inorder to parse json into JS object, 
// other wise body would be undefined
app.use(express.json()) 

app.get('/bmi', (req, res) => {
  const queryParams = req.query;

  if (queryParams.height && queryParams.weight) {
    res.json({
      weight: queryParams.weight,
      height: queryParams.height,
      bmi: calculateBmi(Number(queryParams.height), Number(queryParams.weight))
    });
  } else {
    res.json({
      error: "malformated parameters"
    });
  }
});

app.post('/exercises', (req, res) => {
  console.log(req.body)
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const days: Array<number> = req.body.daily_exercises
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target: number = req.body.target
    
    console.log(days, target)

    if (days && target) {
      res.json(exerciseCalculator(days, target));
    } else {
      res.json({
        error: "parameters missing"
      });
    }
  } catch(error: unknown) {
    console.log(error)
    res.json({
      error: "malformatted parameters"
    });
  }
  console.log('executed')
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});