import { Router, Response } from "express";
import { AccountService } from "./AccountService";
import { MissingAccountError } from "./MissingAccountError";
import { ValidationError } from "sequelize";

const accountService = new AccountService();
const router = Router();

router.get('/:id', async (request, response) => {
    var account = await accountService.getAccount(parseInt(request.params.id));
    if(account) {
        response.send(account);
    } else {
        response.sendStatus(404);
    }
});

router.post('/', async (request, response) => {
    const promise = accountService.createAccount()
    promise.then((accountId) => {
        response.send({ id: accountId });
    }).catch((erx) => {
        response.sendStatus(500);
    }) 
    
});

router.put('/deposit', async (request, response) => {
    try {
        var id = request.body.id;
        var amount = request.body.amount;
        if(id && amount) {
            accountService.deposit(Number(id), Number(amount)).then((account) => {
                response.send(account);
            }).catch((e) => {
                handleError(e, response);
            })  
        } else {
            response.status(400).send("Missing Parameters")
        }
    } catch(e){
        handleError(e, response);    
    }   
})

router.put('/withdraw', async (request, response) => {
    var id = request.body.id;
    var amount = request.body.amount;
    if(id  && amount) {
        accountService.withdraw(Number(id), Number(amount)).then((account) => {
            response.send(account);
        }).catch((e) => {
            handleError(e, response);
        })  
    } else {
        response.status(400).send("Missing Parameters")
    }
});

router.put('/transfer', async (request, response) => {
    var idFrom = request.body.idFrom;
    var idTo = request.body.idTo;
    var amount = request.body.amount;
    if(idFrom && idTo && amount) {
        accountService.transfer(Number(idFrom), Number(idTo), Number(amount)).then((account) => {
            response.send(account);
        }).catch((e) => {
            handleError(e, response);
        })  
    } else {
        response.status(400).send("Missing Parameters")
    }    
});

function handleError(e: any, response: Response) {
    if (e instanceof MissingAccountError) {
        response.status(404).send("Account does not exist");
    } else if (e instanceof ValidationError) {
        response.status(400).send("Can not have negative amount");
    }
    else {
        response.status(500).send();
    }
}

export { router }
