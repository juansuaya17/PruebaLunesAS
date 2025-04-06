import express, { Express, Request, Response } from 'express';
import { QueueFactory } from '../../PipelineServer/pipeline/QueueFactory';
import { Pipeline } from '../../PipelineServer/pipeline/Pipeline';
import { firstFilter, secondFilter } from '../../PipelineServer/filters/filters';
import { CustomData } from '../../data-structure/CustomData';
import { z } from 'zod'; // importing zod for validation of request bodies

require('dotenv').config('../.env');

const app: Express = express();
const port: number = 3005;
const queueFactory = QueueFactory.getQueueFactory<CustomData>; 
const pipeline = new Pipeline<CustomData>([firstFilter, secondFilter], queueFactory);

app.use(express.json());

const CustomDataSchema = z.object({
  data: z.string(),
  // field2: z.number(),
  // field3: z.boolean(),
  // field4: z.string(),
});

app.post('/process', (req: Request, res: Response) => {

  pipeline.on('finalOutput', (output) => {
      console.log(`Salida final: ${output.data}`);
  });

  pipeline.on('errorInFilter', (error, data) => {
      console.error(`Error en el filtro: ${error}, Datos: ${data.data}`);
  });

  const parseResult = CustomDataSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).send({ error: 'Invalid data', details: parseResult.error.errors });
  }

  const customObject: CustomData = parseResult.data;

  pipeline.processInput(customObject);        
      
  res.status(201).send({ message: 'You got this far!', user: req.body });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
