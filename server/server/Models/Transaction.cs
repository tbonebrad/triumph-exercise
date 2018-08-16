using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Transaction
    {
        public DateTime PostDate { get; set; }
        public decimal Amount { get; set; }
    }
}
