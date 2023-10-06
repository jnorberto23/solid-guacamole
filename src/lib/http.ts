import axios from 'axios';
const baseUrl = 'https://opentdb.com';

export async function fetchCategory() {
  const configurationObject = {
    method: 'get',
    url: `${baseUrl}/api_category.php`,
  };
  const response = await axios(configurationObject);
  return response.data.trivia_categories;
}

export async function fetchQuestions(category: number, difficulty: string) {
  const configurationObject = {
    method: 'get',
    url: `${baseUrl}/api.php?amount=10&category=${category}&difficulty=${difficulty.toLowerCase()}`,
  };
  console.log('configurationObject', configurationObject);
  const response = await axios(configurationObject);
  return response.data.results;
}
