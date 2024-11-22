import app from './src/app';

const PORT: number = 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});