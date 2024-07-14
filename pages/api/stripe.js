import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
  

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/product/headphones2') // replace this your actual origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  
  if (req.method === 'POST') {
    try {
       
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto', 
            shipping_options: [
                {shipping_rate: 'shr_1Pc54cRrR4bmmawkZ82j8k1O'},
                {shipping_rate: 'shr_1Pc4yrRrR4bmmawkZC51YoQd'}
            ],
            line_items: req.body.map((item) => {
                const img = item.image[0].asset._ref;
                const newImage = img.replace('image-', 'https://cdn.sanity.io/images/luaxv2ev/production/').replace('-webp', '.webp');
      
                return {
                  price_data: { 
                    currency: 'usd',
                    product_data: {  
                      name: item.name,
                      images: [newImage], 
                    },
                    unit_amount: item.price * 100,
                  },
                  adjustable_quantity: {
                    enabled:true,
                    minimum: 1,
                  }, 
                  quantity: item.quantity
                }
              }),
            
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/canceled`,
          }


      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      // res.redirect(303, session.url); 

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}