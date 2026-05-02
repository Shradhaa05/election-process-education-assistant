const API_BASE_URL = 'http://localhost:5001/api';

export const fetchTimeline = async () => {
  const res = await fetch(`${API_BASE_URL}/timeline`);
  if (!res.ok) throw new Error('Failed to fetch timeline');
  return res.json();
};

export const fetchSteps = async () => {
  const res = await fetch(`${API_BASE_URL}/steps`);
  if (!res.ok) throw new Error('Failed to fetch steps');
  return res.json();
};

export const fetchFaqs = async () => {
  const res = await fetch(`${API_BASE_URL}/faqs`);
  if (!res.ok) throw new Error('Failed to fetch faqs');
  return res.json();
};

export const postQuestion = async (questionText) => {
  const res = await fetch(`${API_BASE_URL}/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: questionText })
  });
  if (!res.ok) throw new Error('Failed to post question');
  return res.json();
};

export const postQuizResult = async (scoreData) => {
  const res = await fetch(`${API_BASE_URL}/quiz-results`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(scoreData)
  });
  if (!res.ok) throw new Error('Failed to post quiz result');
  return res.json();
};

export const fetchPollingBooths = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `${API_BASE_URL}/polling-booths?${queryString}` : `${API_BASE_URL}/polling-booths`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch polling booths');
  return res.json();
};

export const fetchAnalytics = async () => {
  const res = await fetch(`${API_BASE_URL}/analytics`);
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
};
