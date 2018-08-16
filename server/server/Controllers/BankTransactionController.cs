using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Services;
using server.Models;

namespace server.Controllers
{
    [Produces("application/json")]
    [Route("api/BankTransaction")]
    public class BankTransactionController : Controller
    {
        private IBankTransactionService _bankTransactionService;

        public BankTransactionController(IBankTransactionService bankTransactionService)
        {
            _bankTransactionService = bankTransactionService;
        }

        [HttpGet]
        public IEnumerable<Transaction> Get()
        {
            return _bankTransactionService.GetTransactions();
        }
        
        [HttpPost]
        public IActionResult Post([FromBody]Transaction transaction)
        {
            if (transaction.PostDate == DateTime.MinValue)
            {
                return BadRequest("Invalid postDate");
            }
            if(transaction.Amount == 0)
            {
                return BadRequest("Invalid amount");
            }
            return Ok(_bankTransactionService.AddTransaction(transaction));
        }
    }
}