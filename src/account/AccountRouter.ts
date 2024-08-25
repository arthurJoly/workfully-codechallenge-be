import { Router } from "express";
import { AccountService } from "./AccountService";
import { MissingAccountError } from "./MissingAccountError";

const accountService = new AccountService();
const router = Router();

router.get('/:id', (request, response) => {
    response.send(`get account ${JSON.stringify(accountService.getAccount(request.params.id))}`);
});

router.post('/', (request, response) => {
    response.send(accountService.createAccount());
});

router.put('/deposit', (request, response) => {
    try {
        var id = request.body.id;
        var amount = request.body.amount;
        if(id && amount) {
            response.send(`deposit account ${JSON.stringify(accountService.deposit(id, Number(amount)))}`);
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

router.put('/withdraw/:id/:amount', (request, response) => {
    try {
        var id = request.params.id;
        var amount = request.params.amount;
        if(id && amount) {
            response.send(`withdraw account ${JSON.stringify(accountService.withdraw(id, Number(amount)))}`);
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

router.put('/transfer/:idFrom/:idTo/:amount', (request, response) => {
    var idFrom = request.params.idFrom;
    var idTo = request.params.idTo;
    var amount = request.params.amount;
    if(idFrom && idTo && amount) {
        response.send(`withdraw account ${JSON.stringify(accountService.transfer(idFrom, idTo, Number(amount)))}`);
    } else {
        response.status(400).send("Missing Parameters")
    }
});;

export { router }