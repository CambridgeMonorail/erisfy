import { setupWorker, rest } from 'msw';

export const worker = setupWorker(
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/stocks/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({ 
        id, 
        symbol: `MOCK-${id}`, 
        price: 100 + Math.random() * 50 
      })
    );
  }),

  rest.get(`${process.env.REACT_APP_API_BASE_URL}/stocks`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: '1', symbol: 'MOCK-AAPL', price: 150 },
        { id: '2', symbol: 'MOCK-MSFT', price: 280 },
      ])
    );
  })
);
