using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Services
{
    public class BankTransactionService : IBankTransactionService
    {
        private List<Transaction> _transactions = new List<Transaction>
        {
            new Transaction { Amount = 10000, PostDate = new DateTime(2018, 8, 1) }
        };

        public BankTransactionService()
        {
            _addPaydays(DateTime.Now);
        }

        private void _addPaydays(DateTime lastTransactionDate)
        {
            var fridays = _getFridaysBetweenDates(_transactions.Last().PostDate /*I know this will always have a value, not worried about null check*/, lastTransactionDate);
            foreach(var friday in fridays)
            {
                _transactions.Add(new Transaction { Amount = 1000, PostDate = friday });
            }
        }

        private List<DateTime> _getFridaysBetweenDates(DateTime startDate, DateTime endDate)
        {
            var fridays = new List<DateTime>();
            while(startDate <= endDate)
            {
                if(startDate.DayOfWeek == DayOfWeek.Friday)
                {
                    //Make sure we havent already added a payday for this date
                    if(_transactions.Where( (transaction) => transaction.Amount == 1000 && transaction.PostDate == startDate).Count() == 0)
                    {
                        fridays.Add(startDate);
                    }
                    startDate = startDate.AddDays(7);
                } 
                else
                {
                    startDate = startDate.AddDays(1);
                }
            }
            return fridays;
        }

        public List<Transaction> AddTransaction(Transaction transaction)
        {
            _addPaydays(transaction.PostDate);
            _transactions.Add(transaction);
            return _transactions;
        }

        public List<Transaction> GetTransactions()
        {
            return _transactions;
        }
    }
}
