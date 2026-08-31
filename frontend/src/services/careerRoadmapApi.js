const API_BASE_URL = 'http://localhost:5000/api/career-roadmap'

const request = async (url, options = {}) => {
  const res = await fetch(url, {
    credentials: 'include',
    headers: options.body && !(options.body instanceof FormData)
      ? { 'Content-Type': 'application/json' }
      : undefined,
    ...options
  })
  const data = await res.json().catch(() => ({}))
  return { res, data }
}

export const getCareerRoadmap = async () => {
  try {
    const { res, data } = await request(API_BASE_URL)
    if (!res.ok) throw new Error(data.message || 'Failed to load roadmap')
    return { success: true, data: data.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const createCareerRoadmap = async () => {
  try {
    const { res, data } = await request(API_BASE_URL, {
      method: 'POST',
      body: JSON.stringify({})
    })
    if (!res.ok) throw new Error(data.message || 'Failed to create roadmap')
    return { success: true, data: data.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const sendChatMessage = async (message) => {
  try {
    const { res, data } = await request(`${API_BASE_URL}/chat`, {
      method: 'POST',
      body: JSON.stringify({ message })
    })
    if (!res.ok) throw new Error(data.message || 'Failed to send message')
    return { success: true, data: data.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateRoadmapItem = async (itemId, status = 'completed') => {
  try {
    const { res, data } = await request(`${API_BASE_URL}/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    })
    if (!res.ok) throw new Error(data.message || 'Failed to update item')
    return { success: true, data: data.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const regenerateRoadmap = async () => {
  try {
    const { res, data } = await request(`${API_BASE_URL}/regenerate`, {
      method: 'POST',
      body: JSON.stringify({})
    })
    if (!res.ok) throw new Error(data.message || 'Failed to regenerate roadmap')
    return { success: true, data: data.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export default {
  getCareerRoadmap,
  createCareerRoadmap,
  sendChatMessage,
  updateRoadmapItem,
  regenerateRoadmap
}
