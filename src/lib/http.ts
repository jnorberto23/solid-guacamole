import axios from 'axios';
const baseUrl = 'https://opentdb.com';

export async function fetchCategory () {
  const configurationObject = {
    method: 'get',
    url: `${baseUrl}/api_category.php`,
  };
  const response = await axios(configurationObject);
  return response.data.trivia_categories
};
