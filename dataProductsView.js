import bcrypt from 'bcryptjs';

const dataProductsView = {
    users: [
        {
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8)
            
        },
        {
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8)
        },
    ],
  products: [
      {
          
          name: 'Vegetables Bowl',
          category: 'Bowls',
          image: '/src/images/product-2.jpg',
          price: 6,
          rating: 4.5,
          numReviews:10,
          description: 'high quality food',
      },
      {
         
          name: 'Vegetables Bowl',
          category: 'Bowls',
          image: '/src/images/product-1.jpg',
          price: 8,
          rating: 4.0,
          numReviews:10,
          description: 'high quality food',
      },
      {
          
          name: 'Meat Bowl',
          category: 'Bowls',
          image: '/src/images/product-2.jpg',
          price: 7,
          rating: 4.2,
          numReviews:10,
          description: 'high quality food',
      },
      {
          
          name: 'Another Bowl',
          category: 'Bowls',
          image: '/src/images/product-3.jpg',
          price: 6,
          rating: 4.5,
          numReviews:10,
          description: 'high quality food',
      },
      {
          
          name: 'Vegetables II Bowl',
          category: 'Bowls',
          image: '/src/images/product-1.jpg',
          price: 6,
          rating: 4.5,
          numReviews:10,
          description: 'high quality food',
      },
      {
          
          name: 'Vegetables III Bowl',
          category: 'Bowls',
          image: '/src/images/product-1.jpg',
          price: 6,
          rating: 4.5,
          numReviews:10,
          description: 'high quality food',
      }
  ]
}

export default dataProductsView;