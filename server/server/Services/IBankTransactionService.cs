using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Services
{
    public interface IBankTransactionService
    {
        List<Transaction> GetTransactions();
        List<Transaction> AddTransaction(Transaction transaction);
    }
}
