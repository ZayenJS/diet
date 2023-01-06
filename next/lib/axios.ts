import axios from 'axios';
import { Config } from '../config';

export default axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
