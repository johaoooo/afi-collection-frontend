// Configuration API - Fonctionne automatiquement en local et en production
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default API_URL;
