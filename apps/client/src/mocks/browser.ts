import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'

const handlers = [
  http.get(`${process.env.REACT_APP_API_BASE_URL}/stocks/:id`, ({ params }) => {
    const { id } = params
    return HttpResponse.json({ 
      id, 
      symbol: `MOCK-${id}`, 
      price: 100 + Math.random() * 50 
    })
  }),

  http.get(`${process.env.REACT_APP_API_BASE_URL}/stocks`, () => {
    return HttpResponse.json([
      { id: '1', symbol: 'MOCK-AAPL', price: 150 },
      { id: '2', symbol: 'MOCK-MSFT', price: 280 },
    ])
  })
]

export const worker = setupWorker(...handlers)
