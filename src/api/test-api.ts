import axios from 'axios'

export async function testApi() {
  try {
    const response = await axios.get('https://api.hubdash.space/test', {
      withCredentials: true,
    })
    console.log('response', response.data)
  } catch (error) {
    console.error('Error during authentication:', error)
    throw error
  }
}
