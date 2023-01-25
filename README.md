## Important Notes for final submission (Marketplace Application, Group 16)

Application can run using docker-compose: `docker-compose build` and `docker-compose up`. Note it may to some time to build as react is building for production

Runs on `localhost:3000` and the root shows the login page

*You should create at least two accounts and create a product for each account to see full functionality. Instructions and details on how our application works are given below.*

1. Go to the Signup page to create an account, accessible through localhost:3000/signup or by clicking the link to the signup page from the login page.

2. Create a user account, username can be anything you want (must be unique). The password must be 6 characters or longer. 

3. From the ‘Home’ page, you can access the rest of the application. First you should add a product. 

4. Create a product by clicking on ‘Add Product’ on the side navigation. Fill all the fields and click ‘CREATE’ to add your product to the marketplace.

5. In ‘Your Product’, you can view a list of all products you have posted.

6. All products being sold will appear on the ‘Home’ page.

   1. Clicking on the item will display product details 

   2. Clicking the messages icon for a specific product will redirect the user to the ‘Messages’ page where they can now message the seller. [Note: the messages icon only appears for products not listed by the current user]

   3. Products with the shopping cart icon are for sale and the gavel icon are items for bid (sale items has fixed prices, and bid items allow other users to place bids)

7. You can click on the different categories on the sidebar to find products of that category/subcategory.

8. All unrecognized urls will be redirected to the ‘Home’ page.

Things that aren’t fully functional:

1. The ‘User Profile’ page allows users to give reviews and show all that seller’s postings. (Does not display in the production build)

2. The ‘Cart’ page has only sample data, and does not handle a purchase/selling feature as of yet.

## For Developemnt

Client folder contains react (and node): run using `npm start` and go to `localhost:3000`

Server folder contains express, mongo and node: run using `npm start` or `npm run dev` (for dev, changes are applied without restarting server) and runs on `localhost:5000`

Remember to run `npm install` in both client and server folders to install dependencies