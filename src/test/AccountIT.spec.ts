import request from "supertest";
import app from "../app/main"

describe('Account Integration Test', () => {
    it('should respond 200', async () => {
        const response = await request(app.express).post("/account");
        expect(response.status).toBe(200);
    });
});

afterAll(done => {
    app.stop();
    done();
})