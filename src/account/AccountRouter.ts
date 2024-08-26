import { Router } from "express";
import { AccountService } from "./AccountService";
import { MissingAccountError } from "./MissingAccountError";

const accountService = new AccountService();
const router = Router();

router.get('/:id', async (request, response) => {
    response.send(await accountService.getAccount(parseInt(request.params.id)));
});

router.post('/', async (request, response) => {
    response.send(await accountService.createAccount());
});

router.put('/deposit', async (request, response) => {
    try {
        var id = request.body.id;
        var amount = request.body.amount;
        if(id && amount) {
            response.send(await accountService.deposit(id, Number(amount)));
        } else {
            response.status(400).send("Missing Parameters")
        }
    //TODO: exception handler?
    } catch(e){
        if (e instanceof MissingAccountError) {
            response.status(404).send("Account does not exist");
        } else {
            response.status(500).send();
        }    
    }  
})

router.put('/withdraw/:id/:amount', async (request, response) => {
    try {
        var id = request.params.id;
        var amount = request.params.amount;
        if(id && amount) {
            response.send(await accountService.withdraw(id, Number(amount)));
        } else {
            response.status(400).send("Missing Parameters");
        }
    } catch(e){
        if (e instanceof MissingAccountError) {
            response.status(404).send("Account does not exist");
        } else {
            response.status(500).send();
        }    
    }    
});

router.put('/transfer/:idFrom/:idTo/:amount', async (request, response) => {
    var idFrom = request.params.idFrom;
    var idTo = request.params.idTo;
    var amount = request.params.amount;
    if(idFrom && idTo && amount) {
        response.send(await accountService.transfer(idFrom, idTo, Number(amount)));
    } else {
        response.status(400).send("Missing Parameters")
    }
});;

export { router }