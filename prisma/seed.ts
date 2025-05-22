import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const prints = [
  { title: "Village School Headquarters 1925", description: "Village School Headquarters 1925", category: "VILLAGE", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Sheffield Town Hall 1890", description: "Sheffield Town Hall 1890", category: "VILLAGE", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Magnolia Manor 1905", description: "Magnolia Manor 1905", category: "VILLAGE", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Old Post Office 1912", description: "Old Post Office 1912", category: "VILLAGE", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Riverside Church 1887", description: "Riverside Church 1887", category: "VILLAGE", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Sheffield General Store 1901", description: "Sheffield General Store 1901", category: "VILLAGE", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Oakwood Plantation 1876", description: "Oakwood Plantation 1876", category: "VILLAGE", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Willow Creek Cottage 1910", description: "Willow Creek Cottage 1910", category: "VILLAGE", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Sheffield Train Depot 1895", description: "Sheffield Train Depot 1895", category: "VILLAGE", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Elmwood Library 1903", description: "Elmwood Library 1903", category: "VILLAGE", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Sheffield Arts Center 2005", description: "Sheffield Arts Center 2005", category: "CONTEMPORARY", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Riverside Modern Home 2010", description: "Riverside Modern Home 2010", category: "CONTEMPORARY", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Sheffield Community Center 2008", description: "Sheffield Community Center 2008", category: "CONTEMPORARY", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Magnolia Park Pavilion 2012", description: "Magnolia Park Pavilion 2012", category: "CONTEMPORARY", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Sheffield Modern Library 2015", description: "Sheffield Modern Library 2015", category: "CONTEMPORARY", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Riverside Apartments 2018", description: "Riverside Apartments 2018", category: "CONTEMPORARY", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Sheffield Tech Hub 2019", description: "Sheffield Tech Hub 2019", category: "CONTEMPORARY", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Oakwood Modern Estate 2017", description: "Oakwood Modern Estate 2017", category: "CONTEMPORARY", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Sheffield Botanical Gardens 2014", description: "Sheffield Botanical Gardens 2014", category: "CONTEMPORARY", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
  { title: "Willow Creek Modern Church 2016", description: "Willow Creek Modern Church 2016", category: "CONTEMPORARY", imageURL: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", price: 12.00 },
]

async function main() {
  for (const print of prints) {
    await prisma.product.upsert({
      where: { title: print.title },
      update: {},
      create: print,
    })
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
