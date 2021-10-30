﻿using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace OnlineBookShop.API.Configuration
{
    public class AuthOptions
    {
        public string Authority { get; set; }
        public string Audience { get; set; }
    }
}
