﻿using System;

 namespace BackDoAPIN.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public byte[] Photo { get; set; }
        public string Description { get; set; }
        public string RetailPrice { get; set; }
        public string Brand { get; set; }
        public Boolean Gender { get; set; }
        public int Lenght { get; set; }
        public int Type { get; set; }
    }
}