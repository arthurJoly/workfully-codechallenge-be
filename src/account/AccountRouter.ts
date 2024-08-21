import { Router } from "express";

const router = Router();
router.get('/', (request, response) => {
    response.send('get account');
});

export { router }